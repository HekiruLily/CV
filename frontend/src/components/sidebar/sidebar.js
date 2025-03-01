import React, { useState, useEffect } from 'react';
import { Layout, Button, message, Divider, Tooltip } from 'antd';
import { 
  PlusOutlined, 
  UsergroupAddOutlined, 
  TeamOutlined,
  UserOutlined,
  FireOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import clubService from '../../services/club.service';
import './sidebar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGlobal } from '../../contexts/GlobalContext';
import { useSelector } from 'react-redux';
import Avatar from '../../components/Avatar/Avatar';
import JoinClubModal from '../JoinClubModal/JoinClubModal';
import ClubList from './ClubList';

const { Sider } = Layout;

// Lưu trạng thái collapse vào localStorage để duy trì giữa các lần chuyển trang
const getSavedCollapsedState = () => {
  const savedState = localStorage.getItem('sidebarCollapsed');
  return savedState ? JSON.parse(savedState) : false;
};

const Sidebar = () => {
  const { 
    showLoading, 
    hideLoading
  } = useGlobal();
  const userData = useSelector(state => state.user.userData);
  const [clubs, setClubs] = useState([]);
  const [expandedClub, setExpandedClub] = useState(null);
  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(getSavedCollapsedState);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Xác định câu lạc bộ đang active dựa trên URL
  const getCurrentClubCode = () => {
    const match = location.pathname.match(/\/clubs\/([^\/]+)/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    fetchUserClubs();
    
    // Thêm event listener để kiểm tra kích thước màn hình
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setCollapsedWithSave(true);
      }
    };
    
    // Kiểm tra kích thước màn hình khi component mount
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Cập nhật expandedClub khi URL thay đổi
  useEffect(() => {
    const currentClubCode = getCurrentClubCode();
    if (currentClubCode) {
      const club = clubs.find(c => c.club_code === currentClubCode);
      if (club) {
        setExpandedClub(club.id);
      }
    }
  }, [location.pathname, clubs]);

  // Hàm này sẽ lưu trạng thái collapse vào localStorage
  const setCollapsedWithSave = (value) => {
    setCollapsed(value);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(value));
  };

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

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const toggleClub = (clubId) => {
    setExpandedClub(expandedClub === clubId ? null : clubId);
  };

  const toggleCollapsed = () => {
    setCollapsedWithSave(!collapsed);
  };

  // Render các biểu tượng câu lạc bộ khi thu gọn
  const renderCollapsedClubs = () => {
    const currentClubCode = getCurrentClubCode();
    
    return (
      <div className="sb-collapsed-clubs">
        {clubs.map(club => (
          <Tooltip 
            key={club.id} 
            title={club.name} 
            placement="right"
          >
            <div 
              className={`sb-collapsed-club-item ${club.hasNotifications ? 'has-notification' : ''} ${club.club_code === currentClubCode ? 'active' : ''}`}
              onClick={() => navigate(`/clubs/${club.club_code}/introduction`)}
            >
              <Avatar 
                src={club.avatar}
                alt={club.name}
                text={club.initial}
                size="medium"
                className="sb-collapsed-club-avatar"
              />
              {club.hasNotifications && <div className="sb-notification-dot"></div>}
            </div>
          </Tooltip>
        ))}
      </div>
    );
  };

  return (
    <Sider 
      className={`sb-container ${collapsed ? 'sb-collapsed' : ''}`} 
      width={300}
      collapsedWidth={70}
      collapsed={collapsed}
      trigger={null}
    >
      <div className="sb-toggle-wrapper">
        <Button 
          type="text" 
          className="sb-toggle-btn"
          onClick={toggleCollapsed}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </div>

      {collapsed ? (
        <div className="sb-collapsed-content">
          <Tooltip title="Tạo câu lạc bộ mới" placement="right">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="sb-collapsed-btn"
              onClick={handleCreateClub}
            />
          </Tooltip>
          
          <Tooltip title="Tham gia câu lạc bộ" placement="right">
            <Button 
              className="sb-collapsed-btn sb-collapsed-join-btn"
              icon={<UsergroupAddOutlined />}
              onClick={handleJoinClub}
            />
          </Tooltip>
          
          <div className="sb-collapsed-divider"></div>
          
          {renderCollapsedClubs()}
        </div>
      ) : (
        <div className="sb-content">
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
        </div>
      )}

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