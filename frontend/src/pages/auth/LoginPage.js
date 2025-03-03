import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { App } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/userSlice';
import authService from '../../services/authService';
import './LoginPage.css';

const { Title } = Typography;

const LoginPage = () => {

    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await authService.login(values);
            
            // Dispatch action để lưu thông tin user vào Redux store
            dispatch(setUser(response.data));
            
            message.success('Đăng nhập thành công!');
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
            <Title level={2}>Chào mừng trở lại</Title>
            <p className="subtitle">Đăng nhập để tiếp tục</p>
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
            label="Email hoặc Số điện thoại"
            rules={[
            { required: true, message: 'Vui lòng nhập email hoặc số điện thoại' }
            ]}
            >
            <Input 
                placeholder="Nhập email hoặc số điện thoại"
                className="custom-input"
            />
            </Form.Item>

            <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu' }
            ]}
            >
            <Input.Password
            placeholder="Nhập mật khẩu"
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
            Đăng nhập
            </Button>
        </Form.Item>
        </Form>
    </Card>
    </div>
);
};

export default LoginPage; 