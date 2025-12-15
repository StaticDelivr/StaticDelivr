import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import QuickStartSection from '../components/QuickStartSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';

// Lazy load below-the-fold components
const NetworkMapSection = dynamic(() => import('../components/NetworkMapSection'), {
  loading: () => <div className="h-96" />,
});
const SponsorsSection = dynamic(() => import('../components/SponsorsSection'), {
  loading: () => <div className="h-64" />,
});
const FloatingContact = dynamic(() => import('../components/FloatingContact').then(mod => ({ default: mod.FloatingContact })), {
  ssr: false,
});

export default function Home() {
  return (
    <div>
      <Head>
        <title>StaticDelivr - Free and Open Source CDN for Open Source Projects</title>
        <meta name="description" content="StaticDelivr is a free and open-source CDN for accelerating open-source projects. With 350+ Points of Presence and multi-CDN support, it ensures fast, reliable content delivery worldwide." />
        <meta name="keywords" content="CDN, free CDN, open source CDN, StaticDelivr, npm CDN, github CDN, WordPress CDN, jsDelivr alternative, fast CDN, content delivery network, global CDN, free content delivery" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="StaticDelivr" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:url" content="https://staticdelivr.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="StaticDelivr - Free and Open Source CDN for Open Source Projects" />
        <meta property="og:description" content="StaticDelivr offers a fast, reliable, and open-source content delivery network, providing an alternative to jsDelivr for faster access to your assets." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="StaticDelivr - Free CDN for Open Source" />
        <meta property="og:site_name" content="StaticDelivr" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com" />
        <meta name="twitter:title" content="StaticDelivr - Free and Open Source CDN for Open Source Projects" />
        <meta name="twitter:description" content="StaticDelivr offers a fast, reliable, and open-source content delivery network, providing an alternative to jsDelivr for faster access to your assets." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta name="twitter:image:alt" content="StaticDelivr - Free CDN for Open Source" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://staticdelivr.com/#organization",
                  "name": "StaticDelivr",
                  "url": "https://staticdelivr.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://staticdelivr.com/assets/img/icons/horizontal-white.svg",
                    "width": 128,
                    "height": 32
                  },
                  "description": "Free and open-source CDN for open source projects with 350+ global PoPs",
                  "sameAs": [
                    "https://github.com/StaticDelivr/StaticDelivr"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "email": "contact@staticdelivr.com",
                    "contactType": "customer support"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://staticdelivr.com/#website",
                  "url": "https://staticdelivr.com",
                  "name": "StaticDelivr",
                  "description": "Free and Open Source CDN for Open Source Projects",
                  "publisher": {
                    "@id": "https://staticdelivr.com/#organization"
                  },
                  "inLanguage": "en-US"
                },
                {
                  "@type": "SoftwareApplication",
                  "name": "StaticDelivr CDN",
                  "applicationCategory": "DeveloperApplication",
                  "operatingSystem": "Any",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  },
                  "description": "Free and reliable CDN serving billions of requests with 350+ global PoPs",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "ratingCount": "1000",
                    "bestRating": "5"
                  }
                }
              ]
            })
          }}
        />
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
      <FloatingContact />
    </div>
  );
}
