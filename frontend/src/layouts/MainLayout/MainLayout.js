import React from 'react';
import { Layout } from 'antd';
import Nav from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import './MainLayout.css';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Nav />
      <Layout className="main-layout">
        <Sidebar />
        <Layout className="main-content">
          <Content className="content-area">
            {children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout; 