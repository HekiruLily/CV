import React from 'react';
import './events.css';
import Footer from '../../components/footer/Footer';
import Nav from '../../components/navbar/navbar';

import event_1 from '../../assets/events_img/img/event_01.jpg';
import event_2 from '../../assets/events_img/img/event_02.jpg';
import event_3 from '../../assets/events_img/img/event_03.jpg';

import organizer_1 from '../../assets/events_img/organizer/001.png';
import organizer_2 from '../../assets/events_img/organizer/002.jpg';
import organizer_3 from '../../assets/events_img/organizer/003.jpg';

const Events = () => {
  return (
    <div className="events-page">
        <Nav />
      <div className="events-container">
        <h1 className="title">Sự kiện sắp diễn ra</h1>
        <p className="subtitle">Khám phá và tham gia các sự kiện chạy bộ hấp dẫn</p>
        
        <div className="events-grid">
          {/* Event card 1 */}
          <div className="event-card">
            <div className="image-container">
              <img 
                src={event_1} 
                className="event-image"
              />
              <div className="registration-status">64% đã đăng ký</div>
            </div>
            <div className="event-details">
              <div className="event-date">
                <i className="far fa-calendar-alt"></i>
                <span>15/3/2024</span>
              </div>
              <h2 className="event-title">VnExpress Marathon 2024</h2>
              <div className="event-categories">
                <span className="category-tag">5km</span>
                <span className="category-tag">10km</span>
                <span className="category-tag">21km</span>
                <span className="category-tag">42km</span>
              </div>
              <div className="event-location">
                <i className="fas fa-map-marker-alt"></i>
                <span>Hà Nội</span>
              </div>
              <div className="event-type">
                <i className="fas fa-running"></i>
                <span>Full Marathon</span>
              </div>
              <div className="event-capacity">
                <i className="fas fa-users"></i>
                <span>3200/5000</span>
              </div>
              <div className="event-deadline">
                <i className="fas fa-calendar-check"></i>
                <span>HĐK: 15/2/2024</span>
              </div>
              <div className="event-footer">
                <div className="organizer">
                  <img 
                    src={organizer_1}
                    className="organizer-logo"
                  />
                  <div className="organizer-info">
                    <p className="organizer-name">VnExpress</p>
                    <p className="event-price">Từ 500.000đ</p>
                  </div>
                </div>
                <a href="#" className="details-link">Chi tiết</a>
              </div>
            </div>
          </div>

          {/* Event card 2 */}
          <div className="event-card">
            <div className="image-container">
              <img 
                src={event_2}
                className="event-image"
              />
              <div className="registration-status">75% đã đăng ký</div>
            </div>
            <div className="event-details">
              <div className="event-date">
                <i className="far fa-calendar-alt"></i>
                <span>20/4/2024</span>
              </div>
              <h2 className="event-title">Dalat Ultra Trail 2024</h2>
              <div className="event-categories">
                <span className="category-tag">10km</span>
                <span className="category-tag">21km</span>
                <span className="category-tag">42km</span>
                <span className="category-tag">70km</span>
              </div>
              <div className="event-location">
                <i className="fas fa-map-marker-alt"></i>
                <span>Đà Lạt</span>
              </div>
              <div className="event-type">
                <i className="fas fa-running"></i>
                <span>Trail Running</span>
              </div>
              <div className="event-capacity">
                <i className="fas fa-users"></i>
                <span>1500/2000</span>
              </div>
              <div className="event-deadline">
                <i className="fas fa-calendar-check"></i>
                <span>HĐK: 20/3/2024</span>
              </div>
              <div className="event-footer">
                <div className="organizer">
                  <img 
                    src={organizer_2}
                    className="organizer-logo"
                  />
                  <div className="organizer-info">
                    <p className="organizer-name">DL Marathon</p>
                    <p className="event-price">Từ 800.000đ</p>
                  </div>
                </div>
                <a href="#" className="details-link">Chi tiết</a>
              </div>
            </div>
          </div>

          {/* Event card 3 */}
          <div className="event-card">
            <div className="image-container">
              <img 
                src={event_3}
                className="event-image"
              />
              <div className="registration-status">60% đã đăng ký</div>
            </div>
            <div className="event-details">
              <div className="event-date">
                <i className="far fa-calendar-alt"></i>
                <span>10/5/2024</span>
              </div>
              <h2 className="event-title">Sunset Beach Run 2024</h2>
              <div className="event-categories">
                <span className="category-tag">5km</span>
                <span className="category-tag">10km</span>
                <span className="category-tag">21km</span>
              </div>
              <div className="event-location">
                <i className="fas fa-map-marker-alt"></i>
                <span>Đà Nẵng</span>
              </div>
              <div className="event-type">
                <i className="fas fa-running"></i>
                <span>Half Marathon</span>
              </div>
              <div className="event-capacity">
                <i className="fas fa-users"></i>
                <span>1800/3000</span>
              </div>
              <div className="event-deadline">
                <i className="fas fa-calendar-check"></i>
                <span>HĐK: 10/4/2024</span>
              </div>
              <div className="event-footer">
                <div className="organizer">
                  <img 
                    src={organizer_3}
                    className="organizer-logo"
                  />
                  <div className="organizer-info">
                    <p className="organizer-name">DN Sports</p>
                    <p className="event-price">Từ 400.000đ</p>
                  </div>
                </div>
                <a href="#" className="details-link">Chi tiết</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default Events;
