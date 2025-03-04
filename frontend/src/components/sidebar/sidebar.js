import React, { useState, useEffect } from 'react';
import { Layout, Button, Divider, Tooltip } from 'antd';
import { App } from 'antd';
import { 
  PlusOutlined, 
  UsergroupAddOutlined, 
  TeamOutlined,
  FireOutlined,
} from '@ant-design/icons';
import clubService from '../../services/club.service';
import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import { useGlobal } from '../../contexts/GlobalContext';
import { useSelector } from 'react-redux';
import Avatar from '../../components/Avatar/Avatar';
import JoinClubModal from '../JoinClubModal/JoinClubModal';
import ClubList from './ClubList';

const { Sider } = Layout;

const Sidebar = () => {
  const { message } = App.useApp();
  const { 
    showLoading, 
    hideLoading
  } = useGlobal();
  const [clubs, setClubs] = useState([]);
  const [expandedClub, setExpandedClub] = useState(null);
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
  const navigate = useNavigate();

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
          status: club.status || 'Active',
          hasNotifications: Math.random() > 0.5
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

  const toggleClub = (clubId) => {
    setExpandedClub(expandedClub === clubId ? null : clubId);
  };

  return (
    <Sider className="sb-container" width={300}>
      {/* User Profile Section */}
      {/* <div className="sb-user-profile">
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
      </div> */}

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

      <ClubList 
        clubs={clubs}
        expandedClub={expandedClub}
        toggleClub={toggleClub}
      />

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