import React from 'react';
import RunnerCard from './RunnerCard';

const RunnersList = ({ runners }) => {
  return (
    <div>
      <div className="runners-list">
        {runners.map((runner) => (
          <RunnerCard key={runner.id} runner={runner} />
        ))}
      </div>
      <button className="see-more-button">Xem thêm</button>

    </div>
  );
};

export default RunnersList;
