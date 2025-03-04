import React, { useState, useEffect, useCallback } from 'react';
import { App } from 'antd';
import ProfileCard from './ProfileCard/ProfileCard';
import StatsGrid from './StatsGrid/StatsGrid';
import Achievements from './Achievements/Achievements';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import profileService from '../../services/profile.service';
import { useGlobal } from '../../contexts/GlobalContext';
import './Profile.css';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
    const { showLoading, hideLoading } = useGlobal();
    const [profileData, setProfileData] = useState(null);
    const { message } = App.useApp();

    // Yêu cầu đăng nhập để truy cập trang profile
    useAuth(true);

    // Tối ưu hàm cập nhật avatar
    const handleAvatarUpdate = useCallback((newAvatarUrl) => {
        setProfileData(prev => prev && ({
            ...prev,
            basic_info: {
                ...prev.basic_info,
                avatar: newAvatarUrl
            }
        }));
    }, []);

    // Tối ưu hàm fetch data
    const fetchProfileData = useCallback(async (showLoadingIndicator = true) => {
        try {
            if (showLoadingIndicator) {
                showLoading('Đang tải thông tin...');
            }
            const response = await profileService.getProfile();
            if (response.success) {
                setProfileData(response.data);
            }
        } catch (error) {
            message.error(error.message || 'Không thể tải thông tin người dùng');
        } finally {
            if (showLoadingIndicator) {
                hideLoading();
            }
        }
    }, [showLoading, hideLoading]);

    // Chỉ gọi API một lần khi component mount
    useEffect(() => {
        fetchProfileData();
    }, []); // Bỏ fetchProfileData khỏi dependencies

    if (!profileData) return null;

    return (
        <MainLayout>
            <div className="layout">
                <div className="main-content">
                    <div className="content-wrapper">
                        <ProfileCard
                            basicInfo={profileData.basic_info}
                            clubs={profileData.clubs}
                            onProfileUpdate={handleAvatarUpdate}
                            onInfoUpdate={() => fetchProfileData(false)}
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
