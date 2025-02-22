import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Introduction from './introduction/introduction';
import MemberList from './memberlist/memberlist';

const ClubPage = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="introduction" element={<Introduction />} />
                <Route path="members" element={<MemberList />} />
                <Route index element={<Introduction />} />
            </Routes>
        </MainLayout>
    );
};

export default ClubPage;
