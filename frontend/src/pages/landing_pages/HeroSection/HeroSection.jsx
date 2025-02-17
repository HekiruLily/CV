import React from 'react';
import herosection from '../../../assets/img/herosection.png'; 
import './HeroSection.css';

const Hero = () => {
  return (
    <section className="hero" style={{ backgroundImage: `url(${herosection})` }} >          
      <div className="hero-content">
        <h1>Push Your Limits</h1>
        <p>Join the ultimate running challenge and compete with athletes from around the world</p>
        <a href="/signup" className="register-btn">Đăng ký ngay</a>
      </div>
    </section>
  );
}

export default Hero;
