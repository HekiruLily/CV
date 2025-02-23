import React from 'react';
import './upcomingEvents.css';
import upcoming_1 from '../../../assets/upcoming_img/upcoming_1.jpg';
import upcoming_2 from '../../../assets/upcoming_img/upcoming_2.jpg';
import upcoming_3 from '../../../assets/upcoming_img/upcoming_3.jpg';
import upcoming_4 from '../../../assets/upcoming_img/upcoming_4.jpg';

const UpcomingEvents = () => {
    return (
    <div class="upcoming-events-container">
        <div class="text-center">
            <h1>Upcoming Events</h1>
            <p>Khám phá và đăng kí cho các sự kiện chạy bộ sắp tới</p>
        </div>
        <div class="flex">
            <div class="filter">
                <i class="fas fa-filter"></i>
                <select>
                    <option>All Levels</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>
            </div>
            <button class="view-all">Xem tất cả sự kiện</button>
        </div>
        <div class="grid">
            <div class="card">
                <img src={upcoming_1} alt=""></img>
                <div class="content">
                    <h2>Running Event 1</h2>
                    <div class="info">
                        <i class="fas fa-calendar-alt"></i>
                        <span>22/2/2025</span>
                    </div>
                    <div class="info">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Central Park, New York</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <img src={upcoming_2} alt=""></img>                
                    <div class="content">
                    <h2>Running Event 2</h2>
                    <div class="info">
                        <i class="fas fa-calendar-alt"></i>
                        <span>23/2/2025</span>
                    </div>
                    <div class="info">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Miami Beach, Florida</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <img src={upcoming_3} alt=""></img>
                    <div class="content">
                    <h2>Running Event 3</h2>
                    <div class="info">
                        <i class="fas fa-calendar-alt"></i>
                        <span>24/2/2025</span>
                    </div>
                    <div class="info">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Rocky Mountains, Colorado</span>
                    </div>
                </div>
            </div>
            <div class="card">
                <img src={upcoming_4} alt=""></img> 
                    <div class="content">
                    <h2>Running Event 4</h2>
                    <div class="info">
                        <i class="fas fa-calendar-alt"></i>
                        <span>25/2/2025</span>
                    </div>
                    <div class="info">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>Golden Gate Park, San Francisco</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default UpcomingEvents;