import React, { useState, useEffect } from 'react';
import { Layout, Button, message, Divider, Badge, Tooltip } from 'antd';
import { 
  PlusOutlined, 
  UsergroupAddOutlined, 
  TeamOutlined,
  InfoCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  FireOutlined,
  RightOutlined,
  DownOutlined
} from '@ant-design/icons';
import clubService from '../../services/club.service';
import './sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGlobal } from '../../contexts/GlobalContext';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../../components/Avatar/Avatar';
import JoinClubModal from '../JoinClubModal/JoinClubModal';

const { Sider } = Layout;

const Sidebar = () => {
  const { 
    showLoading, 
    hideLoading
  } = useGlobal();
  const userData = useSelector(state => state.user.userData);
  const [clubs, setClubs] = useState([]);
  const [expandedClub, setExpandedClub] = useState(null);
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUserClubs();
  }, []);

  const fetchUserClubs = async () => {
    try {
      showLoading('Đang tải danh sách câu lạc bộ...');
      const response = await clubService.getUserClubs();
      if (response.success) {
        const formattedClubs = response.data.map(club => ({
          id: club.club_id,
          club_code: club.club_code,
          name: club.name,
          members: club.member_count,
          initial: club.name.charAt(0),
          avatar: club.avatar,
          hasNotifications: Math.random() > 0.5 // Giả lập thông báo
        }));
        setClubs(formattedClubs);
      }
    } catch (error) {
      message.error(error.message || 'Không thể tải danh sách câu lạc bộ');
    } finally {
      hideLoading();
    }
  };

  const handleCreateClub = () => {
    navigate('/create-club');
  };

  const handleJoinClub = () => {
    setIsJoinModalVisible(true);
  };

  const handleJoinSuccess = () => {
    // Refresh danh sách câu lạc bộ sau khi tham gia thành công
    fetchUserClubs();
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const toggleClub = (clubId) => {
    setExpandedClub(expandedClub === clubId ? null : clubId);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Sider className="sb-container" width={300}>
      {/* User Profile Section */}
      <div className="sb-user-profile">
        <Avatar 
          src={userData?.avatar}
          alt={userData?.full_name}
          text={userData?.full_name}
          size="large"
          className="sb-user-avatar"
        />
        <div className="sb-user-info">
          <div className="sb-user-name">{userData?.full_name || 'Người dùng'}</div>
          <Button 
            type="link" 
            className="sb-profile-link"
            onClick={handleProfileClick}
            icon={<UserOutlined />}
          >
            Trang cá nhân
          </Button>
        </div>
      </div>

      <Divider className="sb-divider">
        <FireOutlined className="sb-divider-icon" /> Câu lạc bộ
      </Divider>

      {/* Club Actions */}
      <div className="sb-header">
        <div className="sb-title">
          <TeamOutlined className="sb-title-icon" /> Câu lạc bộ của bạn
        </div>
        <Tooltip title="Tạo câu lạc bộ mới">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="sb-create-btn"
            onClick={handleCreateClub}
          />
        </Tooltip>
      </div>

      <Button 
        className="sb-join-btn"
        icon={<UsergroupAddOutlined />}
        block
        onClick={handleJoinClub}
      >
        Tham gia câu lạc bộ
      </Button>

      {/* Custom Club List */}
      <div className="sb-clubs-container">
        {clubs.length > 0 ? (
          clubs.map(club => (
            <div key={club.id} className="sb-club-item">
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
                    <div className="sb-club-name">{club.name}</div>
                    <div className="sb-club-members">{club.members} thành viên</div>
                  </div>
                </div>
                {expandedClub === club.id ? <DownOutlined /> : <RightOutlined />}
              </div>
              
              <AnimatePresence>
                {expandedClub === club.id && (
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

      {/* Join Club Modal */}
      <JoinClubModal 
        isOpen={isJoinModalVisible}
        onClose={() => setIsJoinModalVisible(false)}
        onSuccess={handleJoinSuccess}
      />
    </Sider>
  );
};

export default Sidebar;