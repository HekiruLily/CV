import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="join-club-section">
        <h1 className="main-title">Tham gia câu lạc bộ</h1>
        <p className="subtitle">Trở thành thành viên của cộng đồng chạy bộ lớn nhất Việt Nam</p>
        
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-users" style={{color: '#4285f4'}}></i>
            </div>
            <h3>Cộng đồng năng động</h3>
            <p>Gặp gỡ và kết nối với những người có cùng đam mê chạy bộ</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-bullseye" style={{color: '#34a853'}}></i>
            </div>
            <h3>Lịch tập chuyên nghiệp</h3>
            <p>Được huấn luyện viên lên lịch tập phù hợp với mục tiêu</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-medal" style={{color: '#fbbc05'}}></i>
            </div>
            <h3>Sự kiện độc quyền</h3>
            <p>Tham gia các sự kiện đặc biệt dành riêng cho thành viên</p>
          </div>
        </div>

        <button className="register-button">
          Đăng ký ngay
          <i className="fas fa-arrow-right"></i>
        </button>
      </section>
    </div>
  );
};

export default Home;