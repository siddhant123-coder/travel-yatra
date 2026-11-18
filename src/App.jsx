
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Packages from './pages/Packages';
import CustomTrip from './pages/CustomTrip';
import Itinerary from './pages/Itinerary';
import Bookings from './pages/Bookings';
import PaymentModal from './components/PaymentModal';

import './design.css';

function ScrollToSection() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== '/' || !hash) return;

    const id = decodeURIComponent(hash.slice(1));
    let attempts = 0;
    let frameId;

    const findAndScroll = () => {
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        return;
      }

      if (attempts < 20) {
        attempts += 1;
        frameId = requestAnimationFrame(findAndScroll);
      }
    };

    frameId = requestAnimationFrame(findAndScroll);

    return () => cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToSection />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/custom-trip" element={<CustomTrip />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/bookings" element={<Bookings />} />

        <Route path="*" element={<Home />} />
      </Routes>

      <PaymentModal />
    </>
  );
}
