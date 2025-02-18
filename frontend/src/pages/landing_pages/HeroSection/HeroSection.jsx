import React from 'react';
import herosection from '../../../assets/img/herosection.png'; 
import './HeroSection.css';

const Hero = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${herosection})` }} >          
      <div className="hero-content">
        <h1>Vượt qua giới hạn của bạn</h1>
        <p>Tham gia thử thách chạy tuyết lớn nhất thế giới và tham gia với vận động viên từ khắp mọi nơi trên thế giới</p>
        <a href="/signup" className="register-btn">Đăng ký ngay</a>
      </div>
    </section>
  );
}

export default Hero;
