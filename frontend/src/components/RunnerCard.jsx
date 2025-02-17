import React from 'react';

const RunnerCard = ({ runner }) => {
  return (
    <div className="runner-card">
      <div className="runner-info">
        <img src={runner.image} alt={runner.name} className="runner-image" />
          <h3>{runner.name}</h3>
      </div>
      <button className="view-profile-button">Xem thêm</button>
    </div>
  );
};

export default RunnerCard;
