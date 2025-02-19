import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Upload, Select, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import clubService from '../../../../services/club.service';
import addressService from '../../../../services/address.service';
import './CreateClub.css';

const CreateClubForm = () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      setLoadingProvinces(true);
      const data = await addressService.getProvinces();
      setProvinces(data);
    } catch (error) {
      messageApi.error(error.message);
    } finally {
      setLoadingProvinces(false);
    }
  };

  const handleProvinceChange = async (provinceId) => {
    try {
      form.setFieldValue('district', undefined); // Reset quận/huyện khi đổi tỉnh
      setLoadingDistricts(true);
      const data = await addressService.getDistricts(provinceId);
      setDistricts(data);
    } catch (error) {
      messageApi.error(error.message);
    } finally {
      setLoadingDistricts(false);
    }
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Tìm tên tỉnh/thành và quận/huyện từ ID
      const provinceName = provinces.find(p => p.value === values.province)?.label;
      const districtName = districts.find(d => d.value === values.district)?.label;

      const requestData = {
        ...values,
        province: provinceName,
        district: districtName
      };

      const response = await clubService.createClubRequest(requestData);
      messageApi.success('Gửi yêu cầu tạo CLB thành công!');
      navigate('/clubs/pending');
    } catch (error) {
      messageApi.error(error.message || 'Đã xảy ra lỗi khi gửi yêu cầu');
    } finally {
      setLoading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      {messageContextHolder}
      <div className="create-club-form-container">
        <h2>Đăng ký Câu lạc bộ</h2>
        <p className="form-description">Điền thông tin để đăng ký câu lạc bộ mới</p>
        
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="clubName"
                label="Tên câu lạc bộ"
                rules={[{ required: true, message: 'Vui lòng nhập tên câu lạc bộ!' }]}
              >
                <Input placeholder="Nhập tên câu lạc bộ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="clubCode"
                label="Mã câu lạc bộ"
                rules={[{ required: true, message: 'Vui lòng nhập mã câu lạc bộ!' },
                  { pattern: /^\S*$/, message: 'Mã câu lạc bộ không được chứa khoảng trắng' }
                ]}
              >
                <Input placeholder="Nhập mã câu lạc bộ" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="province"
                label="Tỉnh/Thành phố"
                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
              >
                <Select
                  placeholder="Chọn tỉnh/thành phố"
                  options={provinces}
                  loading={loadingProvinces}
                  onChange={handleProvinceChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="district"
                label="Quận/Huyện"
                rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
              >
                <Select
                  placeholder="Chọn quận/huyện"
                  options={districts}
                  loading={loadingDistricts}
                  disabled={!form.getFieldValue('province')}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="ward"
            label="Địa điểm cụ thể"
            rules={[{ required: true, message: 'Vui lòng nhập địa điểm cụ thể!' }]}
          >
            <Input placeholder="Nhập địa điểm sinh hoạt của câu lạc bộ" />
          </Form.Item>

          <Form.Item
            name="clubImage"
            label="Ảnh câu lạc bộ"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload.Dragger
              name="files"
              listType="picture"
              maxCount={1}
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Tải lên ảnh đại diện cho câu lạc bộ</p>
              <p className="ant-upload-hint">
                Kéo thả hoặc click để chọn ảnh
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô tả ngắn"
          >
            <Input.TextArea 
              placeholder="Mô tả về câu lạc bộ..."
              rows={4}
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              size="large"
              className="submit-button"
              loading={loading}
            >
              Gửi yêu cầu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateClubForm;