import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import IntroSection from '../components/IntroSection';
import FeaturesSection from '../components/FeaturesSection';
import DestinationsSection from '../components/DestinationsSection';
import PackagesSection from '../components/PackagesSection';
import CustomTripSection from '../components/CustomTripSection';
import ItinerarySection from '../components/ItinerarySection';
import BookingsSection from '../components/BookingsSection';
import FinalCTASection from '../components/FinalCTASection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="travel-yatra-app">
      <Navbar />
      <main id="top">
        <Hero />
        <IntroSection />
        <FeaturesSection />
        <DestinationsSection />
        <PackagesSection />
        <CustomTripSection />
        <ItinerarySection />
        <BookingsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
