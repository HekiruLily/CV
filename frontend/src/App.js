import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import ClubList from './pages/clubs/club_page'
import EventsPage from './pages/events/events';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Kiểm tra token trong localStorage để xác định trạng thái đăng nhập
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/clubs" element={isAuthenticated ? <ClubList /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to={isAuthenticated ? "/clubs" : "/login"} />} />
                <Route path="/events" element={<EventsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
