import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer shell">
          <Link className="brand" to="/">
            <span className="brand-mark">Y</span>
            <span>
              TRAVEL 
              <b>YATRA</b>
            </span>
          </Link>
          <span>Thoughtfully curated journeys. Beautifully remembered.</span>
          <div>
            <Link to="/destinations">Destinations</Link>
            <Link to="/packages">Packages</Link>
            <Link to="/bookings">My journeys</Link>
          </div>
          <small>© 2026 TRAVEL YATRA</small>
        </footer>
  );
}
