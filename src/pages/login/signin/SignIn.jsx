import React from "react";
import "./SignIn.css";
import { Button, Input } from "antd";

const SignIn = () => {
  return (
    <div className="">
      <div className="container">
        <div
          className="body"
          style={{
            backgroundColor: "#D9D9D9",
            marginTop: "100px",
            marginBottom: "100px",
            height: "450px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <h1 style={{ fontSize: "30px", color: "#2B3591" }}> Đăng ký</h1>
          <div
            className="container-input"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>Họ và Tên</p>
            <Input
              className="input"
              style={{
                backgroundColor: "#D9D9D9",
                borderColor: "#A39999",
                width: "400px",
                borderRadius: "15px",
              }}
            />
          </div>
          <div
            className="container-input"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>Email</p>
            <Input
              className="input"
              style={{
                backgroundColor: "#D9D9D9",
                borderColor: "#A39999",
                width: "400px",
                borderRadius: "15px",
              }}
            />
          </div>{" "}
          <div
            className="container-input"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>Số điện thoại</p>
            <Input
              className="input"
              style={{
                backgroundColor: "#D9D9D9",
                borderColor: "#A39999",
                width: "400px",
                borderRadius: "15px",
              }}
            />
          </div>{" "}
          <div
            className="container-input"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>Mật khẩu</p>
            <Input
              className="input"
              style={{
                backgroundColor: "#D9D9D9",
                borderColor: "#A39999",
                width: "400px",
                borderRadius: "15px",
              }}
            />
          </div>{" "}
          <div
            className="container-input"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>Nhập lại mật khẩu</p>
            <Input
              className="input"
              style={{
                backgroundColor: "#D9D9D9",
                borderColor: "#A39999",
                width: "400px",
                borderRadius: "15px",
              }}
            />
          </div>
          <Button
            style={{
              backgroundColor: "#3E4798",
              color: "white",
              width: "100px",
              height: "40px",
              borderRadius: "10px",
            }}
          >
            {" "}
            Đăng ký{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
