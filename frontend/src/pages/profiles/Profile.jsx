import React from 'react';
import ProfileCard from '../profiles/ProfileCard/ProfileCard';
import StatsGrid from '../profiles/StatsGrid/StatsGrid';
import Achievements from '../profiles/Achievements/Achievements';
import './Profile.css';

const Profile = () => {
    return (
      <div className="layout">
        <div className="main-content">
          <div className="content-wrapper">
            <ProfileCard />
            <div className="container">
              <StatsGrid />
              <Achievements />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Profile;