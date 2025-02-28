import React, { useState, useMemo } from 'react';
import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
    TeamOutlined,
    EditOutlined,
    CameraOutlined,
    ScheduleOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { message, Upload } from 'antd';
import EditProfileModal from '../Edit/Info/EditProfileModal';
import ProfileService from '../../../services/profile.service';
import Avatar from '../../../components/Avatar/Avatar';
import './ProfileCard.css';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../../../redux/slices/userSlice';
import moment from 'moment';

const ProfileCard = ({ basicInfo, clubs, onProfileUpdate, onInfoUpdate }) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const latestClub = clubs?.[0];

    const formatDate = (dateString) => {
        if (!dateString) return 'Chưa cập nhật ngày sinh';
        const date = moment(dateString, 'YYYY-MM-DD');
        return date.isValid() ? date.format('DD/MM/YYYY') : 'Chưa cập nhật ngày sinh';
    };

    const formatGender = (gender) => {
        const genderMap = {
            'male': 'Nam',
            'female': 'Nữ',
            'other': 'Khác'
        };
        return genderMap[gender] || 'Chưa cập nhật giới tính';
    };

    const profileInfo = useMemo(() => [
        {
            icon: <MailOutlined />,
            color: '#3b82f6',
            text: basicInfo?.email || 'Chưa cập nhật email',
        },
        {
            icon: <PhoneOutlined />,
            color: '#10b981',
            text: basicInfo?.phone || 'Chưa cập nhật số điện thoại',
        },
        {
            icon: <UserOutlined />,
            color: '#10b981',
            text: formatGender(basicInfo?.gender),
        },
        {
            icon: <ScheduleOutlined />,
            color: '#3b82f6',
            text: formatDate(basicInfo?.birth_date),
        },
        {
            icon: <EnvironmentOutlined />,
            color: '#ef4444',
            text: basicInfo?.address || 'Chưa cập nhật địa chỉ',
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

    const handleAvatarChange = async (info) => {
        const file = info.file;
        
        // Chỉ xử lý khi file được chọn và không đang trong quá trình upload
        if (info.file.status !== 'uploading' || uploading) return;
        
        setUploading(true);
        
        // Kiểm tra định dạng và kích thước file
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        
        if (!isJpgOrPng) {
            message.error('❌ Chỉ hỗ trợ định dạng JPG/PNG!');
            setUploading(false);
            return;
        }
        
        if (!isLt2M) {
            message.error('❌ Ảnh phải nhỏ hơn 2MB!');
            setUploading(false);
            return;
        }
        
        try {
            const formData = new FormData();
            formData.append('avatar', file.originFileObj);

            const response = await ProfileService.updateAvatar(formData);
            if (response.success) {
                onProfileUpdate(response.avatarUrl);
                dispatch(updateUserProfile({ avatar: response.avatarUrl }));
                message.success('🎉 Cập nhật ảnh đại diện thành công');
            }
        } catch (error) {
            message.error(error.message || '❌ Lỗi khi cập nhật ảnh đại diện');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="avatar-wrapper">
                    <Avatar 
                        src={basicInfo?.avatar}
                        alt={basicInfo?.full_name}
                        text={basicInfo?.full_name}
                        size="large"
                        className="profile-avatar"
                    />
                    <Upload
                        showUploadList={false}
                        onChange={handleAvatarChange}
                        customRequest={({ onSuccess }) => {
                            // Đánh dấu thành công ngay lập tức để component Upload không tự gửi request
                            setTimeout(() => onSuccess('ok'), 0);
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
