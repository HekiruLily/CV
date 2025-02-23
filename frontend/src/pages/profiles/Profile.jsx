import React, { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import ProfileCard from './ProfileCard/ProfileCard';
import StatsGrid from './StatsGrid/StatsGrid';
import Achievements from './Achievements/Achievements';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import profileService from '../../services/profile.service';
import { useGlobal } from '../../contexts/GlobalContext';
import './Profile.css';

const Profile = () => {
    const { showLoading, hideLoading } = useGlobal();
    const [profileData, setProfileData] = useState(null);

    /**
     * 📌 Hàm lấy dữ liệu profile, sử dụng useCallback để tránh render lại không cần thiết.
     */
    const fetchProfileData = useCallback(async () => {
        try {
            showLoading('Đang tải thông tin...');
            const response = await profileService.getProfile();
            if (response.success) {
                setProfileData(response.data);
            }
        } catch (error) {
            message.error(error.message || 'Không thể tải thông tin người dùng');
        } finally {
            hideLoading();
        }
    }, [showLoading, hideLoading]);

    /**
     * 🎯 useEffect sẽ chỉ gọi lại fetchProfileData khi nó thay đổi, tránh cảnh báo ESLint.
     */
    useEffect(() => {
        fetchProfileData();
    }, [fetchProfileData]);

    if (!profileData) return null;

    return (
        <MainLayout>
            <div className="layout">
                <div className="main-content">
                    <div className="content-wrapper">
                        <ProfileCard
                            basicInfo={profileData.basic_info}
                            clubs={profileData.clubs}
                            onProfileUpdate={fetchProfileData} // ✅ Tự động cập nhật avatar mà không cần reload
                        />
                        <div className="container">
                            <StatsGrid
                                achievements={profileData.achievements_stats}
                                recentRuns={profileData.achievements}
                            />
                            <Achievements
                                achievements={profileData.achievements_stats}
                                recentRuns={profileData.achievements}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Profile;
