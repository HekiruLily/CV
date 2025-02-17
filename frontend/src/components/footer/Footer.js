import React from 'react';
import './Footer.css';
import { 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined
} from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Phần thông tin công ty */}
        <div className="footer-section">
          <h3>RunningEvents.com</h3>
          <p>Điểm đến hàng đầu cho các sự kiện và giải đấu chạy bộ. Tham gia cộng đồng những người đam mê chạy bộ và đạt được mục tiêu của bạn.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookOutlined />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramOutlined />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterOutlined />
            </a>
          </div>
        </div>

        {/* Phần liên kết nhanh */}
        <div className="footer-section">
          <h3>Liên Kết Nhanh</h3>
          <ul>
            <li><a href="/">Trang Chủ</a></li>
            <li><a href="/events">Sự Kiện</a></li>
            <li><a href="/leaderboard">Bảng Xếp Hạng</a></li>
            <li><a href="/about">Về Chúng Tôi</a></li>
            <li><a href="/contact">Liên Hệ</a></li>
            <li><a href="/faq">Hỏi Đáp</a></li>
          </ul>
        </div>

        {/* Phần thông tin liên hệ */}
        <div className="footer-section">
          <h3>Thông Tin Liên Hệ</h3>
          <ul className="contact-info">
            <li className="contact-item">
              <MailOutlined />
              <span>info@runningevents.com</span>
            </li>
            <li className="contact-item">
              <PhoneOutlined />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="contact-item">
              <EnvironmentOutlined />
              <span>123 Đường Chạy Bộ, Thành phố Thể Thao, SP 12345</span>
            </li>
          </ul>
        </div>

        {/* Phần đăng ký nhận tin */}
        <div className="footer-section">
          <h3>Đăng Ký Nhận Tin</h3>
          <p>Đăng ký để nhận thông tin cập nhật về các sự kiện sắp tới và ưu đãi đặc biệt.</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Nhập email của bạn"
              aria-label="Email đăng ký nhận tin"
            />
            <button type="submit">Đăng Ký</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;