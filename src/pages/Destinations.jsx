import React from 'react';
import Navbar from '../components/Navbar';
import DestinationsSection from '../components/DestinationsSection';
import Footer from '../components/Footer';

export default function Destinations() {
  return (
    <div className="travel-yatra-app">
      <Navbar />
      <main className="route-page">
        <DestinationsSection />
      </main>
      <Footer />
    </div>
  );
}
