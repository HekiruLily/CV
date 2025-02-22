import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing_pages/landing_pages';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import ClubPage from './pages/club/club_page';
import CreateClub from './pages/create_club/createClub';
import { GlobalProvider } from './contexts/GlobalContext';

import Profile from './pages/profiles/Profile';
function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/clubs/:clubCode/*" element={<ClubPage />} />
            <Route path="/create-club" element={<CreateClub />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
