import React from 'react';
import Nav from '../../components/navbar/navbar';
import Hero from './HeroSection/HeroSection';
import JoinClub from './joinClub/joinClub';
import Ranking from './ranking/ranking';
import Footer from '../../components/footer/Footer';
import UpcomingEvents from './upcomingEvents/upcomingEvents';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Nav />
      <Hero />
      <JoinClub />
      <Ranking />
      <UpcomingEvents />
      <Footer />s
    </div>
  );
};

export default LandingPage;
