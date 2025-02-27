import React from 'react';
import Avatar from './Avatar';
import ViewCount from './ViewCount';
import ImageGallery from './ImageGallery';
import { 
  ClockCircleOutlined, 
  EnvironmentOutlined, 
  FireOutlined,
  LikeOutlined,
  MessageOutlined,
  ShareAltOutlined
} from '@ant-design/icons';

const NewsCard = ({ 
  avatar, 
  title, 
  views, 
  timestamp, 
  content, 
  location, 
  images,
  activity,
  stats 
}) => {
  return (
    <div className="news-card">
      <div className="news-content">
        {activity && (
          <div className="activity-tag">
            <FireOutlined /> {activity}
          </div>
        )}
        
        <div className="avatar-title-row">
          <Avatar src={avatar} />
          <h2 className="news-title">{title}</h2>
        </div>

        <div className="metadata-row">
          <span className="timestamp">
            <ClockCircleOutlined className="icon" /> {timestamp}
          </span>
          {location && (
            <span className="location">
              <EnvironmentOutlined className="icon" /> {location}
            </span>
          )}
          <ViewCount count={views} />
        </div>

        <p className="news-text">{content}</p>

        {images && images.length > 0 && <ImageGallery images={images} />}

        {stats && (
          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-label">
                <LikeOutlined className="icon" /> Lượt thích
              </div>
              <div className="stat-value">{stats.likes}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">
                <MessageOutlined className="icon" /> Bình luận
              </div>
              <div className="stat-value">{stats.comments}</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">
                <ShareAltOutlined className="icon" /> Chia sẻ
              </div>
              <div className="stat-value">{stats.shares}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;