import React from 'react';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

const TimeSelect = ({ formData, setFormData }) => {
  const handleTimeChange = (time) => {
    if (time) {
      const seconds = time.hour() * 3600 + time.minute() * 60 + time.second();
      setFormData(prev => ({
        ...prev,
        duration: seconds
      }));
    }
  };

  return (
    <div className="form-row">
      <div className="form-group">
        <label>Thời gian hoàn thành</label>
        <TimePicker 
          onChange={handleTimeChange}
          defaultValue={formData.duration ? dayjs().startOf('day').second(formData.duration) : null}
          format="HH:mm:ss"
          showNow={false}
          className="time-picker"
        />
      </div>
    </div>
  );
};

export default TimeSelect; 