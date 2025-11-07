import './Header.css'
import React from 'react';

const Header = ({ totalTasks, completedTasks }) => {
    return (
        <div className="header">
            <h1>DANH SÁCH CÔNG VIỆC</h1>
            <div className="task-summary">
                <p>Tổng số nhiệm vụ: {totalTasks}</p>
                <p>Nhiệm vụ đã hoàn thành: {completedTasks}</p>
            </div>
        </div>
    );
}

export default Header;
