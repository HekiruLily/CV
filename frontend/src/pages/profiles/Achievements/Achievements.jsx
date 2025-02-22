import React, { useState } from 'react';
import AddAchievementModal from '../Edit/Add/AddAchievementModal';
import AchievementCard from './AchievementsCard';
import Filters from './Filters';
import './Achievements.css';
import certification1 from '../certification1.jpg';

const Achievements = () => {
    const [achievements, setAchievements] = useState([
        {
            id: 1,
            title: 'Marathon Long Biên',
            type: 'Full Marathon',
            date: '2024-03-15',
            time: '4:30:00',
            pace: '6:23 min/km',
            distance: '42 km',
            imageId: 'image1',
            imageSrc: certification1
        },
        {
            id: 2,
            title: 'VM Hanoi Midnight',
            type: 'Half Marathon',
            date: '2024-02-20',
            time: '4:30:00',
            pace: '6:23 min/km',
            distance: '42 km',
            imageId: 'image2',
            imageSrc: certification1
        } 
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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

    const handleDeleteAchievement = (id) => {
        const updatedAchievements = achievements.filter(achievement => achievement.id !== id);
        setAchievements(updatedAchievements);
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