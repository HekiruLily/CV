import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, message } from 'antd';
import { PlusOutlined, UsergroupAddOutlined, TeamOutlined } from '@ant-design/icons';
import clubService from '../../services/club.service';
import './sidebar.css';

const { Sider } = Layout;

const Sidebar = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserClubs();
  }, []);

  const fetchUserClubs = async () => {
    try {
      setLoading(true);
      const response = await clubService.getUserClubs();
      if (response.success) {
        const formattedClubs = response.data.map(club => ({
          id: club.club_id,
          name: club.name,
          members: club.member_count,
          initial: club.name.charAt(0),
          avatar: club.avatar
        }));
        setClubs(formattedClubs);
      }
    } catch (error) {
      message.error(error.message || 'Không thể tải danh sách câu lạc bộ');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClub = () => {
    // Điều hướng đến trang tạo club
    // navigate('/clubs/create');
  };

  const handleJoinClub = () => {
    // Điều hướng đến trang tham gia club
    // navigate('/clubs/join');
  };

  return (
    <Sider className="app-sidebar" width={300}>
      <div className="sidebar-buttons">
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          block 
          size="large"
          onClick={handleCreateClub}
        >
          Tạo câu lạc bộ
        </Button>
        <Button 
          type="primary" 
          className="join-button"
          icon={<UsergroupAddOutlined />} 
          block 
          size="large"
          onClick={handleJoinClub}
        >
          Tham gia câu lạc bộ
        </Button>
      </div>

      <div className="clubs-section">
        <div className="section-title">
          <TeamOutlined /> Câu lạc bộ của bạn
        </div>
        <Menu mode="inline" className="clubs-menu">
          {clubs.map(club => (
            <Menu.Item key={club.id} className="club-item">
              <div className="club-content">
                <Avatar 
                  className="club-avatar"
                  src={club.avatar}
                >
                  {!club.avatar && club.initial}
                </Avatar>
                <div className="club-info">
                  <div className="club-name">{club.name}</div>
                  <div className="club-members">{club.members} thành viên</div>
                </div>
              </div>
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </Sider>
  );
};

export default Sidebar; 