import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Introduction from './introduction/introduction';
import MemberList from './memberlist/memberlist';
import NewsFeed from './the_new/NewsFeed';
import { useAuth } from '../../hooks/useAuth';

const ClubPage = () => {
    useAuth(true);

    return (
        <MainLayout>
            <Routes>
                <Route path="introduction" element={<Introduction />} />
                <Route path="members" element={<MemberList />} />
                <Route path="news-feed" element={<NewsFeed />} />
                <Route index element={<Introduction />} />
            </Routes>
        </MainLayout>
    );
};

export default ClubPage;
