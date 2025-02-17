import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { UsergroupAddOutlined, AimOutlined, TrophyOutlined, ArrowRightOutlined } from '@ant-design/icons';

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="home-container">
      <section className="join-club-section">
        <h1 className="main-title">Tham gia câu lạc bộ</h1>
        <p className="subtitle">Trở thành thành viên của cộng đồng chạy bộ lớn nhất Việt Nam</p>
        
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <UsergroupAddOutlined style={{ fontSize: '32px', color: '#4285f4' }} />
            </div>
            <h3>Cộng đồng năng động</h3>
            <p>Gặp gỡ và kết nối với những người có cùng đam mê chạy bộ</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <AimOutlined style={{ fontSize: '32px', color: '#34a853' }} />
            </div>
            <h3>Lịch tập chuyên nghiệp</h3>
            <p>Được huấn luyện viên lên lịch tập phù hợp với mục tiêu</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <TrophyOutlined style={{ fontSize: '32px', color: '#fbbc05' }} />
            </div>
            <h3>Sự kiện độc quyền</h3>
            <p>Tham gia các sự kiện đặc biệt dành riêng cho thành viên</p>
          </div>
        </div>

        <button className="register-button" onClick={handleRegisterClick}>
          Đăng ký ngay
          <ArrowRightOutlined />
        </button>
      </section>
    </div>
  );
};

export default Home;