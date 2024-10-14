import React from "react";
import "./LoginMail.css";
import { Button, Input, Radio } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const LoginMail = () => {
  return (
    <div className="background">
      <div className="container">
        <div className="login">
          <h1 className="login-title">Đăng nhập</h1>

          <Input
            placeholder="Email hoặc mã sinh viên"
            prefix={<UserOutlined />}
            className="login-input"
          />

          <Input.Password
            placeholder="Mật khẩu của bạn"
            className="login-input"
          />

          <div className="login-options">
            <div className="remember-me">
              <Radio />
              <span>Lưu mật khẩu</span>
            </div>
            <Link to="/forgotpassword" className="forgot-password">
              Quên mật khẩu?
            </Link>
          </div>

          <Button className="login-btn">Đăng nhập</Button>

          <div className="register-link">
            <span>Chưa có tài khoản?</span>
            <Link to="/signin" className="signup-link">
              Đăng ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMail;
