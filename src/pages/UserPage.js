import React, { useState } from "react";
import "../assets/css/UserPage.css";
import {
  UserOutlined,
  PhoneFilled,
  MailFilled,
  StarFilled,
  ContainerOutlined,
  DropboxOutlined,
} from "@ant-design/icons";
function UserPage() {
  return (
    // profile
    <>
      <section className="profile-card">
        <div className="profile-icon">
          <UserOutlined style={{ fontSize: "5rem" }} />
          <button className="change-icon-button">THAY ẢNH ĐẠI DIỆN</button>
        </div>
        <h2 className="profile-name">NGUYỄN MINH HIẾU</h2>
        <p className="profile-id">B23DCCC066</p>
        <div className="profile-details">
          <div className="detail-item">
            <span className="icon">
              <PhoneFilled style={{ color: "rgb(220 38 38)" }} />
            </span>
            <span>0319390331</span>
          </div>
          <div className="detail-item">
            <span className="icon">
              <MailFilled style={{ color: "rgb(34 211 238)" }} />
            </span>
            <span>HieuNM.Bxxxxx@stu.ptit.edu.vn</span>
          </div>
        </div>
        <button className="edit-button">CHỈNH SỬA</button>
      </section>
      <section className="order-section">
        <h1 style={{ fontSize: "25px" }}>Đơn Mua</h1>
        <div className="order-status">
          <div className="status-box">
            <a href="#">
              <ContainerOutlined style={{ fontSize: "2rem" }} />
            </a>
            <div>
              Chờ xác nhận <span className="notification-badge">3</span>
            </div>
          </div>
          <div class="status-box">
            <a href="#">
              <DropboxOutlined style={{ fontSize: "2rem" }} />
            </a>
            <div>
              Chờ lấy hàng <span class="notification-badge">3</span>
            </div>
          </div>
          <div class="status-box">
            <a href="#">
              <StarFilled style={{ fontSize: "2rem" }} />
            </a>
            <div>
              Đánh giá <span class="notification-badge">3</span>
            </div>
          </div>
        </div>
      </section>
      <section className="order-history">
        <button style={{ fontSize: "20px" }}>Xem Thêm ...</button>
      </section>
    </>
  );
}

export default UserPage;
