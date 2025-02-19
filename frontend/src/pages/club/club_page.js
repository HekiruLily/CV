import React from 'react';
import { Layout } from 'antd';
import Nav from '../../components/navbar/navbar';
import Sidebar from '../../components/sidebar/sidebar';
import CreateClub from './components/CreateClub/CreateClub';
import './club_page.css';

const { Content } = Layout;

const ClubPage = () => {
    return (
        <div className="app-container">
            <Nav />
            <Layout className="main-layout">
                <Sidebar />
                <Layout className="club-page-content">
                    <Content className="content-area">
                        <CreateClub />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default ClubPage;
