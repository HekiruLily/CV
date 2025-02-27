import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Introduction from './introduction/introduction';
import MemberList from './memberlist/memberlist';
import { useAuth } from '../../hooks/useAuth';

const ClubPage = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

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
