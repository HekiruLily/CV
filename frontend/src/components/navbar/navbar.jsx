import React from 'react';
import './navbar.css';  
import Logo from '../../assets/img/Logo.png'; 

const Nav = () => {
  const handleLoginClick = () => {
    window.location.href = '#'; // Điều hướng đến trang đăng nhập
  };

  const handleRegisterClick = () => {
    window.location.href = '#'; // Điều hướng đến trang đăng ký
  };

  const handleEventClick = () => {
    window.location.href = '#'; // Điều hướng đến trang sự kiện
  };

  const handleRankingClick = () => {
    window.location.href = '#'; // Điều hướng đến trang bảng xếp hạng
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />  
        <span className="brand">RunningClub</span>
      </div>

      <div className="nav-center">
        <button onClick={handleEventClick}>Home</button>
        <button onClick={handleRankingClick}>Events</button>
        <button onClick={handleRankingClick}>Leaderboard</button>
        <i className="bi bi-card-list icons"></i>
      </div>

      <div className="auth-buttons">
        <button onClick={handleLoginClick} className="login">Login</button>
        <button onClick={handleRegisterClick} className="register">Register</button>
        <i className="bi bi-person icons" onClick={() => window.location.href = '#'}></i>
      </div>
    </nav>
  );
}

export default Nav;
