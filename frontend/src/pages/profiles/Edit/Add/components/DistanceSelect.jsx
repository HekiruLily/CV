import React from 'react';

const DistanceSelect = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="form-row">
      <div className="form-group">
        <label>Hình thức</label>
        <select 
          name="surface_type" 
          value={formData.surface_type}
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
  );
};

export default DistanceSelect; 