import React from "react";
import "./Login.css";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="background_login">
      <div className="container_login">
        <div className="login">
          <h1 style={{ color: "white" }}>ĐĂNG NHẬP</h1>
          <Button
            type="primary"
            className="login-btn"
            icon={<span role="img" aria-label="email">✉️</span>}
          >
            <Link to="/loginemail">Đăng nhập bằng email</Link>
          </Button>
          <Button
            type="primary"
            className="login-btn"
            icon={<span role="img" aria-label="phone">📞</span>}
          >
            <Link to="/loginphonenumber">Đăng nhập bằng số điện thoại</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
