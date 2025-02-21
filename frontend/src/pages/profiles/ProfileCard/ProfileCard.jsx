import React, { useState } from 'react';
import EditProfileModal from '../Edit/Info/EditProfileModal';
import './ProfileCard.css';
import avatar from '../avata.png';

const ProfileCard = () => {
  const profileData = {
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@gmail.com',
    phone: '+84 123 456 789',
    location: 'Hà Nội, Việt Nam',
    club: 'Hà Nội Running Club'
  };

  const profileInfo = [
    { icon: 'map-marker-alt', color: '#ef4444', text: profileData.location },
    { icon: 'envelope', color: '#3b82f6', text: profileData.email },
    { icon: 'phone', color: '#10b981', text: profileData.phone },
    { icon: 'running', color: '#f59e0b', text: profileData.club }
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = (updatedData) => {
    // Xử lý lưu dữ liệu ở đây
    console.log('Updated profile:', updatedData);
  };

  return (
    <>
      <div className="profile-card">
        <div className="profile-header">
          <img 
            className="avatar" 
            src={avatar}          
            alt="Avatar" 
          />
          <h2 className="name">
            <i className="fas fa-user icon blue-icon"></i>
            {profileData.name}
          </h2>
          <p className="status">
            <i className="fas fa-trophy icon"></i>
            Elite Runner
            <i className="fas fa-star yellow-icon"></i>
          </p>
        </div>
        <div className="profile-info">
          {profileInfo.map((info, index) => (
            <div key={index} className="info-item">
              <i 
                className={`fas fa-${info.icon} icon`}
                style={{
                  color: info.color,
                  border: `1.7px solid ${info.color}`,
                  borderRadius: '50%',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
              {info.text}
            </div>
          ))}
          <button className="edit-button" onClick={handleEditClick}>
            <i className="fas fa-edit icon"></i>
            Chỉnh sửa
          </button>
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        profileData={profileData}
        onSave={handleSaveProfile}
      />
    </>
  );
};

export default ProfileCard;