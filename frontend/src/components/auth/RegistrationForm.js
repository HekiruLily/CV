// RegistrationForm.jsx
import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import './RegistrationForm.css';

const { Title } = Typography;

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await authService.register(values);
      message.success('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      message.error(error.message || 'Đăng ký thất bại!');
    } finally {
      setLoading(false);
    }
  };

  // Validate contact info (either email or phone)
  const validateContactInfo = (_, value) => {
    if (!value) {
      return Promise.reject('Vui lòng nhập email hoặc số điện thoại');
    }

    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return Promise.reject('Vui lòng nhập email hoặc số điện thoại hợp lệ');
    }
    return Promise.resolve();
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <div className="register-header">
          <Title level={2}>Tạo tài khoản</Title>
          <p className="subtitle">Đăng ký để bắt đầu</p>
        </div>

        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[
              { required: true, message: 'Vui lòng nhập họ và tên' },
              { min: 2, message: 'Họ và tên phải có ít nhất 2 ký tự' },
              { whitespace: true, message: 'Họ và tên không được để trống' }
            ]}
          >
            <Input 
              placeholder="Nhập họ và tên"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            name="contactInfo"
            label="Email or Phone Number"
            rules={[
              { required: true, message: 'Vui lòng nhập email hoặc số điện thoại' },
              { validator: validateContactInfo }
            ]}
          >
            <Input 
              placeholder="Nhập email hoặc số điện thoại"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Nhập mật khẩu"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Mật khẩu không khớp');
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Xác nhận mật khẩu"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="signin-button"
            >
              Tạo tài khoản
            </Button>
          </Form.Item>

          <div className="divider-container">
            <Divider className="custom-divider">HOẶC TIẾP TỤC VỚI</Divider>
          </div>

          <Button 
            block 
            size="large" 
            icon={<GoogleOutlined />}
            className="google-button"
          >
            Đăng ký với Google
          </Button>

          <div className="login-link-container">
            <span>Đã có tài khoản? </span>
            <Link to="/login" className="login-link">
              Đăng nhập
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegistrationForm;