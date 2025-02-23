import React, { useState, useEffect } from 'react';
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

const ProfileCard = ({ basicInfo, clubs, onProfileUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(
        basicInfo.avatar ? `http://localhost:5000${basicInfo.avatar}` : defaultAvatar
    );

    useEffect(() => {
        // Cập nhật URL avatar nếu dữ liệu thay đổi
        setAvatarUrl(basicInfo.avatar ? `http://localhost:5000${basicInfo.avatar}` : defaultAvatar);
    }, [basicInfo.avatar]);

    const latestClub = clubs?.[0];

    const profileInfo = [
        {
            icon: <EnvironmentOutlined />,
            color: '#ef4444',
            text: basicInfo.address || 'Chưa cập nhật địa chỉ',
        },
        {
            icon: <MailOutlined />,
            color: '#3b82f6',
            text: basicInfo.email,
        },
        {
            icon: <PhoneOutlined />,
            color: '#10b981',
            text: basicInfo.phone || 'Chưa cập nhật số điện thoại',
        },
        {
            icon: <TeamOutlined />,
            color: '#f59e0b',
            text: latestClub ? `${latestClub.name} (${latestClub.role})` : 'Chưa tham gia CLB',
        },
    ];

    const handleEditClick = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSaveProfile = async (updatedData) => {
        try {
            await ProfileService.updateProfile(updatedData);
            onProfileUpdate();
            setIsModalOpen(false);
            message.success('🎉 Cập nhật thông tin thành công');
        } catch (error) {
            message.error(error.message || '❌ Không thể cập nhật thông tin');
        }
    };

    // ✅ Xử lý cập nhật avatar
    const handleAvatarChange = async ({ file }) => {
        if (file.status === 'uploading') return;

        if (file.status === 'done' || file.originFileObj) {
            const formData = new FormData();
            formData.append('avatar', file.originFileObj);

            try {
                const updatedProfile = await ProfileService.updateAvatar(formData);
                // 🕒 Cập nhật avatar ngay lập tức với timestamp để tránh cache
                setAvatarUrl(`http://localhost:5000${updatedProfile.avatar}?t=${Date.now()}`);
                message.success('🎉 Cập nhật ảnh đại diện thành công');
                onProfileUpdate(); // Gọi callback để cập nhật thông tin
            } catch (error) {
                message.error(error.message || '❌ Lỗi khi cập nhật ảnh đại diện');
            }
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
                        onError={(e) => (e.target.src = defaultAvatar)} // 🛡 Nếu ảnh lỗi, fallback về mặc định
                    />
                    <Upload
                        showUploadList={false}
                        customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess('ok'), 0)}
                        beforeUpload={(file) => {
                            const isJpgOrPng =
                                file.type === 'image/jpeg' || file.type === 'image/png';
                            if (!isJpgOrPng) message.error('❌ Chỉ hỗ trợ định dạng JPG/PNG!');
                            const isLt2M = file.size / 1024 / 1024 < 2;
                            if (!isLt2M) message.error('❌ Ảnh phải nhỏ hơn 2MB!');
                            return isJpgOrPng && isLt2M;
                        }}
                        onChange={handleAvatarChange}
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
