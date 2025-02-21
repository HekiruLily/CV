import React from 'react';
import './StatsGrid.css';

const StatsGrid = () => {
  const stats = [
    {
      type: 'green',
      icon: 'stopwatch',
      label: 'Thời gian chạy tốt nhất',
      value: '3:45:28',
      change: '-2:15'
    },
    {
      type: 'red',
      icon: 'road',
      label: 'Tổng quãng đường',
      value: '1234km',
      change: '+45km'
    },
    {
      type: 'yellow',
      icon: 'medal',
      label: 'Huy chương',
      value: '12',
      change: '+2'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card ${stat.type}`}>
          <p className="stat-label">
            <i className={`fas fa-${stat.icon}`}></i> 
            {stat.label}
          </p>
          <p className="stat-value">{stat.value}</p>
          <p className="stat-change">{stat.change}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;