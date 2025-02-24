import React, { useState, useMemo } from 'react';
import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
    TeamOutlined,
    EditOutlined,
    CameraOutlined,
} from '@ant-design/icons';
import { message, Upload } from 'antd';
import EditProfileModal from '../Edit/Info/EditProfileModal';
import defaultAvatar from '../avata.png';
import ProfileService from '../../../services/profile.service';
import './ProfileCard.css';

const ProfileCard = ({ basicInfo, clubs, onProfileUpdate, onInfoUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const avatarUrl = useMemo(() => {
        if (!basicInfo?.avatar) return defaultAvatar;
        return `http://localhost:5000${basicInfo.avatar}`;
    }, [basicInfo?.avatar]);

    const latestClub = clubs?.[0];

    const profileInfo = useMemo(() => [
        {
            icon: <EnvironmentOutlined />,
            color: '#ef4444',
            text: basicInfo?.address || 'Chưa cập nhật địa chỉ',
        },
        {
            icon: <MailOutlined />,
            color: '#3b82f6',
            text: basicInfo?.email,
        },
        {
            icon: <PhoneOutlined />,
            color: '#10b981',
            text: basicInfo?.phone || 'Chưa cập nhật số điện thoại',
        },
        {
            icon: <TeamOutlined />,
            color: '#f59e0b',
            text: latestClub ? `${latestClub.name} (${latestClub.role})` : 'Chưa tham gia CLB',
        },
    ], [basicInfo, latestClub]);

    const handleEditClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSaveProfile = async (updatedData) => {
        try {
            const response = await ProfileService.updateProfile(updatedData);
            if (response.success) {
                onInfoUpdate();
                setIsModalOpen(false);
                message.success('🎉 Cập nhật thông tin thành công');
            }
        } catch (error) {
            message.error(error.message || '❌ Không thể cập nhật thông tin');
        }
    };

    const handleAvatarChange = async ({ file }) => {
        if (file.status !== 'done' && !file.originFileObj) return;

        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJpgOrPng) {
            message.error('❌ Chỉ hỗ trợ định dạng JPG/PNG!');
            return;
        }

        if (!isLt2M) {
            message.error('❌ Ảnh phải nhỏ hơn 2MB!');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', file.originFileObj);

        try {
            const response = await ProfileService.updateAvatar(formData);
            if (response.success) {
                onProfileUpdate(response.avatarUrl);
                message.success('🎉 Cập nhật ảnh đại diện thành công');
            }
        } catch (error) {
            message.error(error.message || '❌ Lỗi khi cập nhật ảnh đại diện');
        }
    };

    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="avatar-wrapper">
                    <img
                        src={avatarUrl}
                        alt="avatar"
                        className="avatar"
                        onError={(e) => (e.target.src = defaultAvatar)}
                    />
                    <Upload
                        showUploadList={false}
                        customRequest={async ({ file, onSuccess, onError }) => {
                            const formData = new FormData();
                            formData.append('avatar', file);

                            try {
                                const response = await ProfileService.updateAvatar(formData);
                                if (response.success) {
                                    onProfileUpdate(response.avatarUrl);
                                    message.success('🎉 Cập nhật ảnh đại diện thành công');
                                    onSuccess('ok');
                                } else {
                                    onError(new Error(response.message));
                                }
                            } catch (error) {
                                message.error(error.message || '❌ Lỗi khi cập nhật ảnh đại diện');
                                onError(error);
                            }
                        }}
                    >

                        <div className="camera-overlay">
                            <CameraOutlined className="camera-icon" />
                        </div>
                    </Upload>
                </div>
                <div className="profile-info">
                    <h2 className="name">{basicInfo.full_name}</h2>
                    <button className="edit-button" onClick={handleEditClick}>
                        <EditOutlined /> Chỉnh sửa
                    </button>
                </div>
            </div>

            <div className="info-grid">
                {profileInfo.map((info, index) => (
                    <div key={index} className="info-item">
                        <span className="info-icon" style={{ color: info.color }}>
                            {info.icon}
                        </span>
                        <span className="info-text">{info.text}</span>
                    </div>
                ))}
            </div>

            <EditProfileModal
                visible={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveProfile}
                initialData={basicInfo}
            />
        </div>
    );
};

export default ProfileCard;
