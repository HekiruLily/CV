import React from 'react';
import { StarOutlined } from '@ant-design/icons'; 
import { ReactComponent as GoldMedal } from '../svg/gold.svg'; 
import { ReactComponent as SilverMedal } from '../svg/silver.svg';
import { ReactComponent as BronzeMedal } from '../svg/bronze.svg'; 
import '../ranking.css'; 

const RunnerCard = ({ runner, position }) => {
  const { accumulated, monthly } = runner; // Destructure accumulated and monthly from runner

  const renderMedalIcon = () => {
    switch (position) {
      case 1:
        return <GoldMedal className="medal-icon"/> ; // Add className="medal-icon" to the gold medal icon
      case 2:
        return <SilverMedal className="medal-icon" />;
      case 3:
        return <BronzeMedal  className="medal-icon"/>;
      default:
        return null;
    }
  };


  return (
    <div className="runner-card">
      <div className="runner-info">
        <img src={runner.image} alt={runner.name} className="runner-image" />
        <h3>{runner.name} {renderMedalIcon()}</h3>
      </div>
      <p>Tích lũy: {accumulated} <StarOutlined style={{ color: 'gold' }} /></p> {/* Replace km with star icon */}
      <p>Trong tháng: {monthly} <StarOutlined style={{ color: 'gold' }} /></p> {/* Replace km with star icon */}
    </div>
  );
};

export default RunnerCard;