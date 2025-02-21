import React, { useState } from 'react';
import './AddAchievementModal.css';

const AddAchievementModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    raceName: '',
    raceType: '',
    distance: '',
    hours: '',
    minutes: '',
    seconds: '',
    paceMinutes: '',
    paceSeconds: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit form
    console.log(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="achievement-modal-overlay">
      <div className="achievement-modal-content">
        <div className="achievement-modal-header">
            <h2>
                <i className="fas fa-trophy" style={{color: '#ff6b6b', marginRight: '10px'}}></i>
                Thêm thành tích mới
            </h2>
            <button className="close-button" onClick={onClose}>
                <i className="fas fa-times"></i>
            </button>
        </div>

        <form onSubmit={handleSubmit} className="achievement-form">
          <div className="form-group">
            <label>Tên giải</label>
            <select 
              name="raceName" 
              value={formData.raceName}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Chọn giải chạy</option>
              <option value="VnExpress Marathon">VnExpress Marathon</option>
              <option value="Longbien Marathon">Longbien Marathon</option>
              <option value="Trail Running">Trail Running</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Hình thức</label>
              <select 
                name="raceType" 
                value={formData.raceType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Chọn hình thức</option>
                <option value="Full Marathon">Full Marathon</option>
                <option value="Half Marathon">Half Marathon</option>
                <option value="10K">10K</option>
                <option value="5K">5K</option>
              </select>
            </div>

            <div className="form-group">
              <label>Khoảng cách</label>
              <div className="distance-input">
                <input
                  type="number"
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  placeholder="Khoảng cách"
                />
                <span className="unit">km</span>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Thời gian hoàn thành</label>
              <div className="time-inputs">
                <input
                  type="number"
                  name="hours"
                  value={formData.hours}
                  onChange={handleChange}
                  placeholder="HH"
                  min="0"
                  max="23"
                />
                <input
                  type="number"
                  name="minutes"
                  value={formData.minutes}
                  onChange={handleChange}
                  placeholder="MM"
                  min="0"
                  max="59"
                />
                <input
                  type="number"
                  name="seconds"
                  value={formData.seconds}
                  onChange={handleChange}
                  placeholder="SS"
                  min="0"
                  max="59"
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Hình ảnh</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                id="achievement-image"
              />
              <label htmlFor="achievement-image" className="file-input-label">
                <i className="fas fa-cloud-upload-alt"></i>
                {formData.image ? formData.image.name : 'Chọn tệp'}
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Hủy
            </button>
            <button type="submit" className="submit-button">
                <i className="fas fa-medal" style={{fontSize: '1.2rem'}}></i>
                Thêm thành tích
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAchievementModal;