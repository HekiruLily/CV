import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/login.css';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Gửi yêu cầu đăng nhập
            const response = await axios.post('http://localhost:3001/api/login', {
                email,
                password
            });
            console.log(response.data);
            
            // Gửi dữ liệu người dùng đến API /api/users
            await axios.post('http://localhost:3001/api/users', {
                email,
                password
            });

            localStorage.setItem('userId', response.data.id); // Giả sử response.data.id chứa userId


            // Chuyển hướng đến trang shop
            navigate('/shop'); 
        } catch (error) {
            if (error.response) {
                // Lỗi từ máy chủ
                console.error('Đăng nhập thất bại:', error.response.data);
                alert('Đăng nhập không thành công: ' + error.response.data.message);
            } else if (error.request) {
                // Không nhận được phản hồi từ máy chủ
                console.error('Không nhận được phản hồi:', error.request);
                alert('Không thể kết nối đến máy chủ. Vui lòng kiểm tra lại.');
            } else {
                // Lỗi khác
                console.error('Lỗi:', error.message);
                alert('Đã xảy ra lỗi: ' + error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <h1>Đăng Nhập</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng Nhập</button>
            </form>
        </div>
    );
};

export default Login;