import React from "react";
import "./Forgotpassword.css";
import { Button, Input } from "antd";

const ForgotPassword = () => {
  return (
    <div className="background">
      <div className="container">
        <div className="body">
          <div className="login">
            <h2 style={{ color: "white" }}>Quên mật khẩu</h2>
            <p style={{ color: "white" }}>
              Chúng tôi sẽ gửi lại mật khẩu tài khoản của bạn vào email
            </p>
            <Input
              placeholder="Nhập email của bạn"
              style={{ width: "300px", borderRadius: "15px" }}
            />
            <Button
              style={{
                backgroundColor: "#3E4798",
                width: "100px",
                borderRadius: "15px",
              }}
            >
              Tiếp tục
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
