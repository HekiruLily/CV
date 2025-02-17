import React from 'react';
import RegistrationForm from '../../components/auth/RegistrationForm';
import Nav from '../../components/navbar/navbar';
import Footer from '../../components/footer/Footer';
import './RegisterPage.css';

const RegisterPage = () => {
    return (
    <div className="register-page">
        <Nav />
        <div className="register-content">
        <RegistrationForm />
        </div>
        <Footer />
    </div>
);
};

export default RegisterPage; 