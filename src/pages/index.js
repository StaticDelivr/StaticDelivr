import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import QuickStartSection from '../components/QuickStartSection';
import FeaturesSection from '../components/FeaturesSection';
import NetworkMapSection from '../components/NetworkMapSection';
import SponsorsSection from '../components/SponsorsSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <HeroSection />
        <QuickStartSection />
        <FeaturesSection />
        <NetworkMapSection />
        <SponsorsSection />
      </main>
      <Footer />
    </div>
  );
}
