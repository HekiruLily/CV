import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Nav from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import './MainLayout.css';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra kích thước màn hình và cập nhật trạng thái
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Tự động ẩn sidebar trên mobile
      if (mobile) {
        setSidebarVisible(false);
      } else {
        setSidebarVisible(true);
      }
    };

    // Kiểm tra khi component mount
    checkScreenSize();

    // Thêm event listener để kiểm tra khi resize
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="app-container">
      <Nav toggleSidebar={toggleSidebar} isMobile={isMobile} sidebarVisible={sidebarVisible} />
      <Layout className="main-layout">
        {sidebarVisible && <Sidebar />}
        <Layout className={`main-content ${sidebarVisible ? '' : 'full-width'}`}>
          <Content className="content-area">
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout; 