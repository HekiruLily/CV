import React from "react";
import "./Login.css";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="background">
      <div className="container">
        <div className="body">
          <div className="login">
            <h2 style={{ color: "white" }}>Login</h2>
            <Button
              type="primary"
              style={{
                width: "300px",
                backgroundColor: "#A39999",
                borderRadius: "10px",
              }}
            >
              <Link to="/loginemail">Đăng nhập bằng email</Link>
            </Button>
            <Button
              type="primary"
              style={{
                width: "300px",
                backgroundColor: "#A39999",
                borderRadius: "10px",
              }}
            >
              <Link to="/loginphonenumber">Đăng nhập bằng số điện thoại</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
