import React from 'react';
import { Badge } from 'antd';
import { 
  InfoCircleOutlined, 
  TeamOutlined,
  CalendarOutlined,
  RightOutlined,
  DownOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';

const ClubList = ({ clubs, expandedClub, toggleClub }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sb-clubs-container">
      {clubs.length > 0 ? (
        clubs.map(club => (
          <div 
            key={club.id} 
            className={`sb-club-item ${club.status === 'Pending' ? 'sb-club-pending' : ''}`}
          >
            <div 
              className={`sb-club-header ${expandedClub === club.id ? 'expanded' : ''}`}
              onClick={() => toggleClub(club.id)}
            >
              <div className="sb-club-left">
                <Badge dot={club.hasNotifications} offset={[-2, 2]}>
                  <Avatar 
                    src={club.avatar}
                    alt={club.name}
                    text={club.initial}
                    size="medium"
                    className="sb-club-avatar"
                  />
                </Badge>
                <div className="sb-club-info">
                  <div className="sb-club-name">
                    {club.name}
                    {club.status === 'Pending' && (
                      <span className="sb-club-pending-label">(Đang chờ duyệt)</span>
                    )}
                  </div>
                  <div className="sb-club-members">{club.members} thành viên</div>
                </div>
              </div>
              {expandedClub === club.id ? <DownOutlined /> : <RightOutlined />}
            </div>
            
            <AnimatePresence>
              {expandedClub === club.id && club.status === 'Approved' && (
                <motion.div 
                  className="sb-club-menu"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className={`sb-menu-item ${isActive(`/clubs/${club.club_code}/introduction`) ? 'active' : ''}`}
                    onClick={() => navigate(`/clubs/${club.club_code}/introduction`)}
                  >
                    <InfoCircleOutlined className="sb-menu-icon" />
                    <span>Giới thiệu</span>
                  </div>
                  <div 
                    className={`sb-menu-item ${isActive(`/clubs/${club.club_code}/members`) ? 'active' : ''}`}
                    onClick={() => navigate(`/clubs/${club.club_code}/members`)}
                  >
                    <TeamOutlined className="sb-menu-icon" />
                    <span>Thành viên</span>
                  </div>
                  <div 
                    className={`sb-menu-item ${isActive(`/clubs/${club.club_code}/events`) ? 'active' : ''}`}
                    onClick={() => navigate(`/clubs/${club.club_code}/events`)}
                  >
                    <CalendarOutlined className="sb-menu-icon" />
                    <span>Sự kiện</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))
      ) : (
        <div className="sb-empty-clubs">
          <p>Bạn chưa tham gia câu lạc bộ nào</p>
          <p>Hãy tạo hoặc tham gia một câu lạc bộ</p>
        </div>
      )}
    </div>
  );
};

export default ClubList; 