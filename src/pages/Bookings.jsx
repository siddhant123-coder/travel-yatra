import React from 'react';
import Navbar from '../components/Navbar';
import BookingsSection from '../components/BookingsSection';
import Footer from '../components/Footer';

export default function Bookings() {
  return (
    <div className="travel-yatra-app">
      <Navbar />
      <main className="route-page">
        <BookingsSection />
      </main>
      <Footer />
    </div>
  );
}
