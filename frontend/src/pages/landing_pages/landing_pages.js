import React from 'react';
import Nav from '../../components/navbar/navbar';
import Hero from './HeroSection/HeroSection';
import Home from './home/Home';
import Footer from '../../components/footer/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Nav />
      <Hero />
      <Home />
      <Footer />
    </div>
  );
};

export default LandingPage;
