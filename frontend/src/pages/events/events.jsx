import React from 'react';
import './events.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faUsers, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ev01 from '../../assets/events/ev01.jpg';
import ev02 from '../../assets/events/ev02.jpg';
import ev03 from '../../assets/events/ev03.jpg';

function Events() {
  return (
    <div className="events-container">
      <div className="header">
        <h1 className="page-title">
          Quản lý giải đấu
        </h1>
        <button className="btn-primary">
          Tạo giải mới
        </button>
      </div>
      <div>
        <input className="search-input" placeholder="Tìm kiếm giải đấu..." type="text"/>
      </div>
      <div className="event-grid">
        
        <div className="event-card">
          <img alt="Abstract geometric shapes in blue and cream colors" className="card-image" height="400" src={ev01} width="600"/>
          <div className="card-body">
            <div className="card-header">
              <h2 className="card-title">
                Hanoi International Marathon 2024
              </h2>
              <span className="status-badge">
                Sắp diễn ra
              </span>
            </div>
            <p className="event-id">
              Mã: T001
            </p>
            <div className="event-info">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              <span>
                Hà Nội
              </span>
            </div>
            <div className="event-info">
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
              <span>
                2024-05-15
              </span>
            </div>
            <div className="event-info">
              <FontAwesomeIcon icon={faUsers} className="icon" />
              <span>
                1500 người tham gia
              </span>
            </div>
            <div className="tag-container">
              <span className="event-tag">
                5km
              </span>
              <span className="event-tag">
                10km
              </span>
              <span className="event-tag">
                21km
              </span>
              <span className="event-tag">
                42km
              </span>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn-icon">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn-icon">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        
        
        <div className="event-card">
          <img alt="" className="card-image" height="400" src={ev02} width="600"/>
          <div className="card-body">
            <div className="card-header">
              <h2 className="card-title">
                Da Nang Beach Run
              </h2>
              <span className="status-badge">
                Sắp diễn ra
              </span>
            </div>
            <p className="event-id">
              Mã: T002
            </p>
            <div className="event-info">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              <span>
                Đà Nẵng
              </span>
            </div>
            <div className="event-info">
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
              <span>
                2024-06-20
              </span>
            </div>
            <div className="event-info">
              <FontAwesomeIcon icon={faUsers} className="icon" />
              <span>
                800 người tham gia
              </span>
            </div>
            <div className="tag-container">
              <span className="event-tag">
                5km
              </span>
              <span className="event-tag">
                10km
              </span>
              <span className="event-tag">
                21km
              </span>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn-icon">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn-icon">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
        
        
        <div className="event-card">
          <img className="card-image" height="400" src={ev03} width="600"/>
          <div className="card-body">
            <div className="card-header">
              <h2 className="card-title">
                Sapa Mountain Marathon
              </h2>
              <span className="status-badge">
                Sắp diễn ra
              </span>
            </div>
            <p className="event-id">
              Mã: T003
            </p>
            <div className="event-info">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
              <span>
                Sapa, Lào Cai
              </span>
            </div>
            <div className="event-info">
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
              <span>
                2024-07-10
              </span>
            </div>
            <div className="event-info">
              <FontAwesomeIcon icon={faUsers} className="icon" />
              <span>
                600 người tham gia
              </span>
            </div>
            <div className="tag-container">
              <span className="event-tag">
                10km
              </span>
              <span className="event-tag">
                21km
              </span>
              <span className="event-tag">
                42km
              </span>
              <span className="event-tag">
                70km
              </span>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn-icon">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn-icon">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Events;
