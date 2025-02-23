import React, { useState } from 'react';
import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
    TeamOutlined,
    EditOutlined
} from '@ant-design/icons';
import EditProfileModal from '../Edit/Info/EditProfileModal';
import defaultAvatar from '../avata.png';
import './ProfileCard.css';
import { message } from 'antd';
import ProfileService from '../../../services/profile.service';

const ProfileCard = ({ basicInfo, clubs, onProfileUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const latestClub = clubs?.[0];

    const profileInfo = [
        {
            icon: <EnvironmentOutlined />,
            color: '#ef4444',
            text: basicInfo.address || 'Chưa cập nhật địa chỉ'
        },
        {
            icon: <MailOutlined />,
            color: '#3b82f6',
            text: basicInfo.email
        },
        {
            icon: <PhoneOutlined />,
            color: '#10b981',
            text: basicInfo.phone || 'Chưa cập nhật số điện thoại'
        },
        {
            icon: <TeamOutlined />,
            color: '#f59e0b',
            text: latestClub ? `${latestClub.name} (${latestClub.role})` : 'Chưa tham gia CLB'
        }
    ];

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveProfile = async (updatedData) => {
        try {
            // Xử lý cập nhật profile
            await ProfileService.updateProfile(updatedData);
            onProfileUpdate();
            setIsModalOpen(false);
            message.success('Cập nhật thông tin thành công');
        } catch (error) {
            message.error(error.message || 'Không thể cập nhật thông tin');
        }
    };

    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="avatar-wrapper">
                    <img
                        src={basicInfo.avatar || defaultAvatar}
                        alt="avatar"
                        className="avatar"
                    />
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
                        <span
                            className="info-icon"
                            style={{ color: info.color }}
                        >
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