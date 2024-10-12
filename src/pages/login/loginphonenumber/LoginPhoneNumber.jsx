import React from "react";
import "./LoginPhoneNumber.css";
import { Button, Input, Radio } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const LoginPhoneNumber = () => {
  return (
    <div className="background">
      <div className="container">
        <div className="body">
          <div className="login">
            <h2 style={{ color: "white" }}>Login</h2>
            <Input
              placeholder="số điện thoại của bạn"
              prefix={<UserOutlined />}
              style={{ width: "300px", borderRadius: "15px" }}
            />
            <Input.Password
              placeholder="mật khẩu của bạn"
              style={{ width: "300px", borderRadius: "15px" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "300px",
              }}
            >
              <div style={{ display: "flex", color: "white" }}>
                <Radio />
                <p>lưu mật khẩu</p>
              </div>
              <div>
                <Link to="/forgotpassword" style={{ color: "white" }}>
                  Quên mật khẩu
                </Link>
              </div>
            </div>
            <Button
              style={{
                backgroundColor: "#3E4798",
                borderRadius: "15px",
                color: "white",
              }}
            >
              Đăng nhập
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "200px",
              }}
            >
              <p style={{ color: "white" }}>chưa có tài khoản</p>
              <Link to="/signin" style={{ color: "white" }}>
                đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPhoneNumber;
