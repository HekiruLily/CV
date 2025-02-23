import React from 'react';

const distances = ['Xếp thứ của mọi người', 'Full Marathon (Nam)', 'Full Marathon (Nữ)', 'Half Marathon (Nam)', 'Half Marathon (Nữ)'];

const DistanceButtons = ({ selectedDistance, onDistanceSelect }) => {
  return (
    <div className="distance-buttons">
      {distances.map((distance) => (
        <button
          key={distance}
          className={`distance-button ${
            selectedDistance === distance ? 'active' : ''
          }`}
          onClick={() => onDistanceSelect(distance)}
        >
          {distance}
        </button>
      ))}
    </div>
  );
};

export default DistanceButtons;
