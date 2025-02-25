import React from 'react';
import Avatar from './Avatar';
import ViewCount from './ViewCount';
import ImageGallery from './ImageGallery';

const NewsCard = ({ avatar, title, views, timestamp, content, location, images }) => {
  return (
    <div className="news-card">
      <div className="news-content">
        <div className="avatar-title-row">
          <Avatar src={avatar} />
          <h2 className="news-title">{title}</h2>
        </div>
        <ViewCount count={views} />
        <p className="timestamp">
          <i className="far fa-clock mr-1"></i>
          {timestamp}
        </p>
        <p className="news-text">{content}</p>
        {location && (
          <p className="location">
            <i className="fas fa-map-marker-alt mr-1"></i>
            {location}
          </p>
        )}
        {images && images.length > 0 && <ImageGallery images={images} />}
      </div>
    </div>
  );
};

export default NewsCard;