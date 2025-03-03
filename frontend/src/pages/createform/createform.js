import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Upload, message, Select, DatePicker, TimePicker } from 'antd';
import { UploadOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons';
import './createform.css';

const { Option } = Select;

const CreateRaceForm = ({ onClose }) => {
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [distances, setDistances] = useState([]);
  const [raceTypes, setRaceTypes] = useState([]);
  const [newDistance, setNewDistance] = useState('');
  const [newRaceType, setNewRaceType] = useState('');
  
  // Thêm state cho địa điểm
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Fetch dữ liệu tỉnh/thành phố khi component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch('https://provinces.open-api.vn/api/p/');
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
        message.error('Không thể tải danh sách tỉnh/thành phố');
      }
    };
    
    fetchProvinces();
  }, []);

  // Fetch dữ liệu quận/huyện khi chọn tỉnh/thành phố
  const handleProvinceChange = async (value) => {
    setSelectedProvince(value);
    form.setFieldsValue({ district: undefined, ward: undefined });
    setSelectedDistrict(null);
    setWards([]);
    
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/p/${value}?depth=2`);
      const data = await response.json();
      setDistricts(data.districts);
    } catch (error) {
      console.error('Error fetching districts:', error);
      message.error('Không thể tải danh sách quận/huyện');
    }
  };

  // Fetch dữ liệu phường/xã khi chọn quận/huyện
  const handleDistrictChange = async (value) => {
    setSelectedDistrict(value);
    form.setFieldsValue({ ward: undefined });
    
    try {
      const response = await fetch(`https://provinces.open-api.vn/api/d/${value}?depth=2`);
      const data = await response.json();
      setWards(data.wards);
    } catch (error) {
      console.error('Error fetching wards:', error);
      message.error('Không thể tải danh sách phường/xã');
    }
  };

  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.url);
      message.success('Tải ảnh lên thành công!');
    } else if (info.file.status === 'error') {
      message.error('Tải ảnh lên thất bại.');
    }
  };

  const addDistance = () => {
    if (newDistance.trim()) {
      setDistances([...distances, newDistance]);
      setNewDistance('');
    }
  };

  const addRaceType = () => {
    if (newRaceType.trim()) {
      setRaceTypes([...raceTypes, newRaceType]);
      setNewRaceType('');
    }
  };

  const onFinish = (values) => {
    const formData = {
      ...values,
      distances,
      raceTypes,
      imageUrl,
      eventDateTime: values.eventDate && values.eventTime 
        ? `${values.eventDate.format('YYYY-MM-DD')} ${values.eventTime.format('HH:mm:ss')}`
        : null,
    };
    console.log('Form submitted:', formData);
    // Gửi dữ liệu đến API
    message.success('Tạo giải thành công!');
    form.resetFields();
    setDistances([]);
    setRaceTypes([]);
    setImageUrl(null);
  };

  return (
    <div className="create-race-form-container">
      <div className="form-header">
        <h2>Tạo giải mới</h2>
        <div className="title-container">
          <div className="close-button" onClick={onClose}>
              <CloseOutlined />
            </div>
        </div>
      </div>
      
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên giải"
          name="raceName"
          rules={[{ required: true, message: 'Vui lòng nhập tên giải!' }]}
        >
          <Input placeholder="Nhập tên giải" />
        </Form.Item>

        <Form.Item label="Ảnh giải đấu">
          <div className="upload-container">
            {!imageUrl ? (
              <Upload.Dragger
                name="file"
                action="/api/upload"
                onChange={handleImageChange}
                showUploadList={false}
              >
                <p className="upload-icon">
                  <UploadOutlined />
                </p>
                <p className="upload-text">Kéo thả hoặc click để tải ảnh lên</p>
              </Upload.Dragger>
            ) : (
              <div className="image-preview">
                <img src={imageUrl} alt="Race banner" />
                <Button onClick={() => setImageUrl(null)}>Xóa</Button>
              </div>
            )}
          </div>
        </Form.Item>
        <Form.Item label="Địa điểm">
          <div className="location-container">
            <Form.Item
              name="province"
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
              style={{ display: 'inline-block', width: 'calc(33.33% - 11px)', marginRight: 8 }}
              noStyle
            >
              <Select
                placeholder="Tỉnh/Thành phố"
                onChange={handleProvinceChange}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {provinces.map(province => (
                  <Option key={province.code} value={province.code}>
                    {province.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="district"
              rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
              style={{ display: 'inline-block', width: 'calc(33.33% - 11px)', marginRight: 8 }}
              noStyle
            >
              <Select
                placeholder="Quận/Huyện"
                onChange={handleDistrictChange}
                disabled={!selectedProvince}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {districts.map(district => (
                  <Option key={district.code} value={district.code}>
                    {district.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item
              name="ward"
              rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
              style={{ display: 'inline-block', width: 'calc(33.33% - 11px)' }}
              noStyle
            >
              <Select
                placeholder="Phường/Xã"
                disabled={!selectedDistrict}
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {wards.map(ward => (
                  <Option key={ward.code} value={ward.code}>
                    {ward.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          
          <Form.Item
            name="addressDetail"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}
            style={{ marginTop: 10 }}
          >
            <Input placeholder="Địa chỉ chi tiết (số nhà, tên đường...)" />
          </Form.Item>
        </Form.Item>

        <Form.Item label="Thời gian">
          <div className="time-container">
            <Form.Item
              name="eventDate"
              rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: 16 }}
            >
              <DatePicker 
                placeholder="Chọn ngày" 
                format="DD/MM/YYYY" 
                style={{ width: '100%' }}
              />
            </Form.Item>
            
            <Form.Item
              name="eventTime"
              rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
            >
              <TimePicker 
                placeholder="Chọn giờ" 
                format="HH:mm" 
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          label="Đường dẫn URL"
          name="websiteUrl"
          rules={[
            { 
              type: 'url', 
              message: 'Vui lòng nhập đúng định dạng URL!' 
            }
          ]}
        >
          <Input placeholder="https://example.com" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block className="submit-button">
            Tạo giải
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateRaceForm;