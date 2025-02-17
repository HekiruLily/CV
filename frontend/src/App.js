import logo from './logo.svg';
import './App.css';
import Navbar from '../src/components/navbar/navbar';
import Hero from '../src/pages/landing_pages/HeroSection/HeroSection';
function App() {
  return (
    <div className="App">
        <Navbar />
        <Hero />
    </div>
  );
}

export default App;
