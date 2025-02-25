import React from 'react';
import { Card, Statistic } from 'antd';
import { FaRunning, FaRoad, FaUsers } from 'react-icons/fa';
import './StatsGrid.css';

const StatsGrid = ({ achievements }) => {
    const stats = [
        {
            title: 'Tổng số lần chạy',
            value: achievements.total_runs,
            unit: 'lần',
            icon: <FaRunning className="stat-icon" />
        },
        {
            title: 'Tổng quãng đường',
            value: achievements.total_distance,
            unit: 'km',
            icon: <FaRoad className="stat-icon" />
        },
        {
            title: 'Số CLB tham gia',
            value: achievements.total_clubs,
            unit: 'CLB',
            icon: <FaUsers className="stat-icon" />
        }
    ];

    return (
        <div className="stats-grid">
            {stats.map((stat, index) => (
                <Card
                    key={index}
                    className={`stat-card stat-card-${index + 1}`}
                    bordered={false}
                    hoverable
                >
                    <div className="stat-icon-wrapper">{stat.icon}</div>
                    <Statistic
                        title={stat.title}
                        value={stat.value}
                        suffix={stat.unit}
                        valueStyle={{
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: 600
                        }}
                        style={{
                            padding: '0.5rem'
                        }}
                    />
                </Card>
            ))}
        </div>
    );
};

export default StatsGrid;