import React from 'react';
import Navbar from '../components/Navbar';
import PackagesSection from '../components/PackagesSection';
import Footer from '../components/Footer';

export default function Packages() {
  return (
    <div className="travel-yatra-app">
      <Navbar />
      <main className="route-page">
        <PackagesSection />
      </main>
      <Footer />
    </div>
  );
}
