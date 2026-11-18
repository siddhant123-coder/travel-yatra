import React from 'react';
import Navbar from '../components/Navbar';
import ItinerarySection from '../components/ItinerarySection';
import Footer from '../components/Footer';

export default function Itinerary() {
  return (
    <div className="travel-yatra-app">
      <Navbar />
      <main className="route-page">
        <ItinerarySection />
      </main>
      <Footer />
    </div>
  );
}
