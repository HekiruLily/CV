import React, { useState } from 'react';
import './EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, profileData, onSave }) => {
  const [formData, setFormData] = useState({
    name: profileData.name || '',
    email: profileData.email || '',
    phone: profileData.phone || '',
    location: profileData.location || '',
    club: profileData.club || ''
  });

  const handleChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content-small">
        <div className="modal-header-sports">
          <i className="fas fa-running header-icon"></i>
          <h2>Chỉnh Sửa Hồ Sơ Runner</h2>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form-small">
          <div className="form-group-small">
            <div className="input-icon-wrapper">
              <i className="fas fa-user input-icon" style={{color: '#3b82f6'}}></i>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Họ và tên"
                className="input-with-icon"
              />
            </div>
          </div>

          <div className="form-group-small">
            <div className="input-icon-wrapper">
              <i className="fas fa-envelope input-icon" style={{color: '#10b981'}}></i>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input-with-icon"
              />
            </div>
          </div>

          <div className="form-group-small">
            <div className="input-icon-wrapper">
              <i className="fas fa-phone input-icon" style={{color: '#f59e0b'}}></i>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Số điện thoại"
                className="input-with-icon"
              />
            </div>
          </div>

          <div className="form-group-small">
            <div className="input-icon-wrapper">
              <i className="fas fa-map-marker-alt input-icon" style={{color: '#ef4444'}}></i>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Địa chỉ"
                className="input-with-icon"
              />
            </div>
          </div>

          <div className="form-group-small">
            <div className="input-icon-wrapper">
              <i className="fas fa-running input-icon" style={{color: '#8b5cf6'}}></i>
              <input
                type="text"
                name="club"
                value={formData.club}
                onChange={handleChange}
                placeholder="Câu lạc bộ"
                className="input-with-icon"
              />
            </div>
          </div>

          <div className="form-actions-small">
            <button type="button" onClick={onClose} className="cancel-button-small">
              <i className="fas fa-times"></i> Hủy
            </button>
            <button type="submit" className="save-button-small">
              <i className="fas fa-medal"></i> Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;