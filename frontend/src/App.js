import React from 'react';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import ClubList from './pages/clubs/club_page'
import EventsPage from './pages/events/events';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/clubs" element={<ClubList />} />
                    <Route path="/events" element={<EventsPage />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
