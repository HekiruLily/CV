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
      return Promise.reject('Please enter your email or phone number');
    }

    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      return Promise.reject('Please enter a valid email or phone number');
    }
    return Promise.resolve();
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <div className="register-header">
          <Title level={2}>Create Account</Title>
          <p className="subtitle">Sign up to get started</p>
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
            label="Full Name"
            rules={[
              { required: true, message: 'Please enter your full name' },
              { min: 2, message: 'Name must be at least 2 characters' },
              { whitespace: true, message: 'Name cannot be empty' }
            ]}
          >
            <Input 
              placeholder="Enter your full name"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            name="contactInfo"
            label="Email or Phone Number"
            rules={[
              { required: true, message: 'Please enter your email or phone number' },
              { validator: validateContactInfo }
            ]}
          >
            <Input 
              placeholder="Enter your email or phone number"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Enter your password"
              className="custom-input"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Passwords do not match');
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Confirm your password"
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
              Create Account
            </Button>
          </Form.Item>

          <div className="divider-container">
            <Divider className="custom-divider">OR CONTINUE WITH</Divider>
          </div>

          <Button 
            block 
            size="large" 
            icon={<GoogleOutlined />}
            className="google-button"
          >
            Sign up with Google
          </Button>

          <div className="login-link-container">
            <span>Already have an account? </span>
            <Link to="/login" className="login-link">
              Sign in
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegistrationForm;