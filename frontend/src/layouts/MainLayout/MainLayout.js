import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Nav from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import './MainLayout.css';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Kiểm tra kích thước màn hình khi component mount
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-container">
      <Nav />
      <Layout className="main-layout">
        <Sidebar />
        <Layout className={`main-content ${isMobile ? 'mobile-content' : ''}`}>
          <Content className="content-area">
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout; 