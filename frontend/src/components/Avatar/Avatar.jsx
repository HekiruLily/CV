import React from 'react';
import defaultAvatar from '../../assets/avatar-default.png';
import './Avatar.css';

const Avatar = ({ 
    src, 
    alt, 
    size = 'medium', 
    text,
    className = '',
    onClick 
}) => {
    const getAvatarUrl = (avatarPath) => {
        if (!avatarPath) return null;
        return `http://localhost:5000${avatarPath}`;
    };

    return (
        <div 
            className={`app-avatar app-avatar-${size} ${className}`}
            onClick={onClick}
        >
            {src ? (
                <img
                    src={getAvatarUrl(src)}
                    alt={alt}
                    onError={(e) => {
                        e.target.src = defaultAvatar;
                    }}
                />
            ) : (
                <span className="avatar-placeholder">
                    {text?.charAt(0).toUpperCase() || 'U'}
                </span>
            )}
        </div>
    );
};

export default Avatar; 