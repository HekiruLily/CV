import React from 'react';
import './StatsGrid.css';

const StatsGrid = ({ achievements }) => {
    
    const stats = [
        {
            title: 'Tổng số lần chạy',
            value: achievements.total_runs,
            unit: 'lần'
        },
        {
            title: 'Tổng quãng đường',
            value: achievements.total_distance,
            unit: 'km'
        },
        {
            title: 'Số CLB tham gia',
            value: achievements.total_clubs,
            unit: 'CLB'
        }
    ];

    return (
        <div className="stats-grid">
            {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                    <h3 className="stat-title">{stat.title}</h3>
                    <div className="stat-value">
                        {stat.value} <span className="stat-unit">{stat.unit}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;