import React from 'react';

const distances = ['Xếp thứ của mọi người', 'Full Marathon Sub 4 (Nam)', 'Full Marathon Sub 4 (Nữ)', 'Full Marathon Sub 145 (Nam)', 'Half Marathon Sub 2 (Nam)', 'Half Marathon Sub 2 (Nữ)'];

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
