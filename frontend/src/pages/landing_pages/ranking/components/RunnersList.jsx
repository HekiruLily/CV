import React from 'react';
import RunnerCard from './RunnerCard';

const RunnersList = ({ runners }) => {
  return (
    <div>
      <div className="runners-list">
      {runners.map((runner, index) => (
        <RunnerCard key={runner.id} runner={runner} position={index + 1} />
      ))}
    </div>
      <button className="see-more-button">Xem thêm</button>

    </div>
  );
};

export default RunnersList;
