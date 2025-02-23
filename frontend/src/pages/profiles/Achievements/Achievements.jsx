import React, { useState, useEffect } from 'react';
import AddAchievementModal from '../Edit/Add/AddAchievementModal';
import AchievementCard from './AchievementsCard';
import Filters from './Filters';
import './Achievements.css';
import profileService from '../../../services/profile.service';
import { message } from 'antd';
import runningRecordService from '../../../services/runningRecord.service';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAchievements();
    }, []);

    const loadAchievements = async () => {
        try {
            setLoading(true);
            const response = await profileService.getProfile();

            if (response.success) {
                // Giả sử response.data.achievements chứa danh sách thành tích
                const formattedAchievements = response.data.achievements.map(achievement => ({
                    id: achievement.record_id,
                    title: achievement.race_name,
                    type: achievement.surface_type,
                    date: achievement.run_date,
                    time: formatTime(achievement.duration),
                    pace: calculatePace(achievement.duration, achievement.distance),
                    distance: `${achievement.distance} km`,
                    imageId: achievement.image_id,
                    imageSrc: achievement.image_url
                }));
                console.log(formattedAchievements);
                setAchievements(formattedAchievements);
            }
        } catch (error) {
            message.error('Không thể tải thành tích');
        } finally {
            setLoading(false);
        }
    };

    // Hàm chuyển đổi seconds thành format HH:mm:ss
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    // Hàm tính pace (phút/km)
    const calculatePace = (duration, distance) => {
        const paceInSeconds = duration / distance;
        const paceMinutes = Math.floor(paceInSeconds / 60);
        const paceSeconds = Math.round(paceInSeconds % 60);
        return `${paceMinutes}:${String(paceSeconds).padStart(2, '0')} min/km`;
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddSuccess = async (newAchievement) => {
        await loadAchievements(); // Tải lại danh sách thành tích sau khi thêm mới
    };

    const handleSearch = (sortType, distance) => {
        let filteredAchievements = [...achievements];

        if (sortType === 'newest') {
            filteredAchievements.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortType === 'oldest') {
            filteredAchievements.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        if (distance) {
            filteredAchievements = filteredAchievements.filter(achievement => {
                const achievementDistance = parseInt(achievement.distance);
                return achievementDistance === parseInt(distance);
            });
        }

        setAchievements(filteredAchievements);
    };

    const handleDeleteAchievement = async (id) => {
        try {
            const response = await runningRecordService.deleteRecord(id);
            if (response.success) {
                await loadAchievements(); // Tải lại danh sách sau khi xóa
                message.success('Xóa thành tích thành công');
            }
        } catch (error) {
            message.error('Không thể xóa thành tích');
        }
    };

    return (
        <div className="achievements">
            <div className="achievement-header">
                <h1 className="section-title">Thành tích</h1>
                <div className="header-filters">
                    <Filters onSearch={handleSearch} />
                    <button onClick={handleOpenModal} className="add-achievement-button">
                        <i className="fas fa-plus"></i>
                        Thêm thành tích
                    </button>
                </div>
                <AddAchievementModal 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSuccess={handleAddSuccess}
                />
            </div>

            <div className="achievement-list">
                {achievements.map(achievement => (
                    <AchievementCard 
                        key={achievement.id}
                        achievement={achievement}
                        onDelete={handleDeleteAchievement} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Achievements;