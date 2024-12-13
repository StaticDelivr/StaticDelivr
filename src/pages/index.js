import React from 'react';
import Head from 'next/head';
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
      <Head>
        <title>StaticDelivr - Free and Open Source CDN for Open Source Projects</title>
        <meta name="description" content="StaticDelivr is a free and open-source CDN for accelerating open-source projects. With 350+ Points of Presence and multi-CDN support, it ensures fast, reliable content delivery worldwide." />
        <meta name="keywords" content="CDN, free CDN, open source CDN, StaticDelivr, npm, github, jsDelivr alternative, fast CDN" />
        <meta name="robots" content="index, follow" />

        <meta property="og:url" content="https://staticdelivr.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="StaticDelivr - Free and Open Source CDN for Open Source Projects" />
        <meta property="og:description" content="StaticDelivr offers a fast, reliable, and open-source content delivery network, providing an alternative to jsDelivr for faster access to your assets." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com" />
        <meta name="twitter:title" content="StaticDelivr - Free and Open Source CDN for Open Source Projects" />
        <meta name="twitter:description" content="StaticDelivr offers a fast, reliable, and open-source content delivery network, providing an alternative to jsDelivr for faster access to your assets." />
        <meta name="twitter:image" content="" />
      </Head>

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
