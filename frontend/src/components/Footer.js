import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info Section */}
        <div className="footer-section">
          <h3>RunningEvents.com</h3>
          <p>Your premier destination for running events and competitions. Join our community of passionate runners and achieve your goals.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/leaderboard">Leaderboard</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            <li>
              <i className="far fa-envelope"></i>
              <a href="mailto:info@runningevents.com">info@runningevents.com</a>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <a href="tel:+15551234567">+1 (555) 123-4567</a>
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>123 Runner's Lane, Athletic City, SP 12345</span>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Subscribe to get updates about upcoming events and special offers.</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email"
              aria-label="Email for newsletter"
            />
            <button type="submit">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;