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
    <Sider className="sb-container" width={300}>
      <div className="sb-header">
        <div className="sb-title">
          <TeamOutlined /> Câu lạc bộ của bạn
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="sb-create-btn"
          onClick={handleCreateClub}
          title="Tạo câu lạc bộ mới"
        />
      </div>

      <Button 
        type="primary"
        className="sb-join-btn"
        icon={<UsergroupAddOutlined />}
        block
        size="large"
        onClick={handleJoinClub}
      >
        Tham gia câu lạc bộ
      </Button>

      <Menu mode="inline" className="sb-clubs-list">
        {clubs.map(club => (
          <Menu.Item key={club.id} className="sb-club-item">
            <div className="sb-club-content">
              <Avatar 
                className="sb-club-avatar"
                src={club.avatar}
              >
                {!club.avatar && club.initial}
              </Avatar>
              <div className="sb-club-info">
                <div className="sb-club-name">{club.name}</div>
                <div className="sb-club-members">{club.members} thành viên</div>
              </div>
            </div>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar; 