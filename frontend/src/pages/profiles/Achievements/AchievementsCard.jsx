import React, { useState } from 'react';
import './Achievements.css';
import AchievementModal from '../Edit/Add/AchievementModal';
import { App } from 'antd';

const AchievementCard = ({ achievement, onDelete, onUpdate }) => {
  const [showImage, setShowImage] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { message } = App.useApp();

  const {
    title,
    type,
    date,
    time,
    pace,
    distance,
    imageId,
    imageSrc 
  } = achievement;

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  const handleDelete = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thành tích này?')) {
      onDelete(achievement.id);
    }
  };

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSuccess = (updatedData) => {
    onUpdate(updatedData);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="achievement-card">
        <div className="achievement-content">
          <div className="achievement-header-row">
            <div className="achievement-info">
              <div className="medal-icon-wrapper">
                <i className="fas fa-medal medal-icon"></i>
              </div>
              <div className="achievement-details">
                <h2 className="achievement-title">
                  {title}
                  <span className="badge">{type}</span>
                </h2>
              </div>
            </div>
            <div className="action-buttons">
              <div className="date">{date}</div>
              <button 
                className="action-button toggle"
                onClick={toggleImage}
              >
                <i className={`fas fa-chevron-${showImage ? 'up' : 'down'}`}></i>
              </button>
              <button className="action-button edit" onClick={handleEdit}>
                <i className="fas fa-pen"></i>
              </button>
              <button className="action-button delete" onClick={handleDelete}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div className="achievement-stats">
            <div className="achievement-stat-group">
              <div className="achievement-stat-label">Thời gian:</div>
              <div className="achievement-stat-value">{time}</div>
            </div>
            <div className="achievement-stat-group">
              <div className="achievement-stat-label">Pace:</div>
              <div className="achievement-stat-value">{pace}</div>
            </div>
            <div className="achievement-stat-group">
              <div className="achievement-stat-label">Khoảng cách:</div>
              <div className="achievement-stat-value">{distance}</div>
            </div>
          </div>
        </div>
        {imageSrc && (
          <img
            src={imageSrc}  
            alt={title} 
            className="achievement-image"
            id={imageId}
            style={{ 
              display: showImage ? 'block' : 'none',
              maxHeight: '100%', 
              width: '100%',
              objectFit: 'cover'}}
          />
        )}
      </div>

      <AchievementModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditSuccess}
        editData={achievement}
      />
    </>
  );
};

export default AchievementCard;