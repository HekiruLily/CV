import React from 'react';

const ImageUpload = ({ formData, setFormData }) => {
  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  return (
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
  );
};

export default ImageUpload; 