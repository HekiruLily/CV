import React from 'react';

const RunnerCard = ({ runner }) => {
  return (
    <div className="runner-card">
      <div className="runner-image-container">
        <img src={runner.image} alt={runner.name} className="runner-image" />
        <div className="medal-container">
          {renderMedalIcon()}
        </div>
      </div>
      <div className="runner-info">
        <h3>{runner.name} </h3>
      </div>
      <button className="view-profile-button">Xem thêm</button>
    </div>
  );
};

export default RunnerCard;
