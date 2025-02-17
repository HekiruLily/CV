import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import Nav from '../../components/navbar/navbar';
import Footer from '../../components/footer/Footer';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <Nav />
      <div className="login-content">
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage; 