import React from 'react';
import Nav from '../../components/navbar/navbar';
import Hero from './HeroSection/HeroSection';
import JoinClub from './joinClub/joinClub';
import Ranking from './ranking/ranking';
import Footer from '../../components/footer/Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Nav />
      <Hero />
      <JoinClub />
      <Ranking />
      <Footer />
    </div>
  );
};

export default LandingPage;
