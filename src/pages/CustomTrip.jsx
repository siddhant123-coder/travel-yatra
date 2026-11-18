import React from 'react';
import Navbar from '../components/Navbar';
import CustomTripSection from '../components/CustomTripSection';
import Footer from '../components/Footer';

export default function CustomTrip() {
  return (
    <div className="travel-yatra-app">
      <Navbar />
      <main className="route-page">
        <CustomTripSection />
      </main>
      <Footer />
    </div>
  );
}
