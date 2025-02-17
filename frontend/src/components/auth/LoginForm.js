import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Divider } from 'antd';
import { App } from 'antd';
import { GoogleOutlined, EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';
import './LoginForm.css';

const { Title } = Typography;

const LoginForm = () => {

    const { message } = App.useApp();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await authService.login(values);
            message.success('Đăng nhập thành công!');
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/');
        } catch (error) {
            message.error(error.message || 'Đăng nhập thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card">
            <div className="login-header">
            <Title level={2}>Welcome Back</Title>
            <p className="subtitle">Sign in to your account to continue</p>
        </div>

        <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
        >
            <Form.Item
            name="email"
            label="Email or Phone Number"
            rules={[
            { required: true, message: 'Please enter your email or phone number' }
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
            { required: true, message: 'Please enter your password' }
            ]}
            >
            <Input.Password
            placeholder="Enter your password"
            className="custom-input"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
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
            Sign in
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
            Sign in with Google
        </Button>

        <div className="forgot-password-container">
            <Link to="/forgot-password" className="forgot-link">
            Forgot your password?
            </Link>
        </div>
        </Form>
    </Card>
    </div>
);
};

export default LoginForm; 