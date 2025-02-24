import React from 'react';
import './navbar.css';  
import Logo from '../../assets/img/Logo.png'; 
import { useNavigate } from 'react-router-dom';
import { Button, message, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import authService from '../../services/auth.service';

const Nav = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('user');
      message.success('Đăng xuất thành công!');
      navigate('/login');
    } catch (error) {
      message.error('Đăng xuất thất bại!');
    }
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />} onClick={() => navigate('/profile')}> 
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="logo-container">
          <img src={Logo} alt="RunnersPro Logo" className="logo-image" />
          <span className="brand-name">RunnersPro</span>
        </div>
      </div>

      <div className="nav-center">
        <Button type="text" onClick={() => navigate('/events')} className="nav-link">
          Sự kiện
        </Button>
        <Button type="text" onClick={() => navigate('/leaderboard')} className="nav-link">
          Bảng xếp hạng
        </Button>
        <Button type="text" onClick={() => navigate('/community')} className="nav-link">
          Cộng đồng
        </Button>
        <Button type="text" onClick={() => navigate('/profile')} className="nav-link">
          Câu lạc bộ
        </Button>
      </div>

      <div className="nav-right">
        {user ? (
          <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
            <div className="user-profile">
              <Avatar size="small" icon={<UserOutlined />} className="user-avatar" />
              <span className="username">{user.full_name}</span>
            </div>
          </Dropdown>
        ) : (
          <div className="auth-buttons">
            <Button 
              type="text" 
              onClick={() => navigate('/login')}
              className="login-button"
            >
              Đăng nhập
            </Button>
            <Button 
              type="primary" 
              onClick={() => navigate('/register')}
              className="join-button"
            >
              Đăng ký
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
