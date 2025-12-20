import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import {
  Server, Wifi, Activity, Terminal,
  ShieldCheck, Network, Layers,
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { FadeIn } from '../components/FadeIn';

// Lazy load the Map component to avoid loading heavy Mapbox GL JS on initial load/other pages
const NetworkGlobe = dynamic(() => import('../components/NetworkGlobe'), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[700px] rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-zinc-100 dark:bg-zinc-900 animate-pulse flex items-center justify-center">
      <div className="text-zinc-400 font-medium">Loading Globe...</div>
    </div>
  )
});

const NetworkPage = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-teal-500/30 font-sans">
      <NextSeo
        title="Network Map - Global Edge Infrastructure"
        description="Explore our global edge network of 570+ points of presence. See where your content is served from and learn about our multi-CDN architecture."
        canonical="https://staticdelivr.com/network"
        openGraph={{
          url: 'https://staticdelivr.com/network',
          title: 'Global Edge Network - Interactive Map | StaticDelivr',
          description: 'Sub-50ms latency anywhere in the world. View our interactive map and see how we deliver content at light speed.',
        }}
      />
      <Head>
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
        {/* CSS to hide Mapbox logo completely as requested */}
        <style>{`
          .mapboxgl-ctrl-logo {
            display: none !important;
          }
        `}</style>
      </Head>

      <Header />

      <main className="relative pt-32 pb-20 overflow-hidden">

        {/* "Tealish" Background Gradient Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-transparent blur-[100px] rounded-full pointer-events-none" />

        {/* --- Hero Section --- */}
        <section className="px-6 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                <Terminal className="w-3 h-3" />
                <span>$ staticdelivr --network --map</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                Global presence.<br />
                <span className="text-zinc-500 dark:text-zinc-400">Local performance.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                Our multi-CDN architecture routes traffic through extensive points of presence worldwide, ensuring your content is always served from the closest available node.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* --- Map Wrapper --- */}
        <section className="px-6 mb-32 relative z-10">
          <div className="max-w-7xl mx-auto">
            <NetworkGlobe />
          </div>
        </section>

        {/* --- Network Features Grid --- */}
        <section className="px-6 mb-32">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">Architecture Features</h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                How we maintain high availability and low latency across a fragmented internet.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <FadeIn delay={0.1} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
                  <Network className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Smart Routing</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Our DNS dynamically routes users to the fastest available provider based on real-time latency metrics from their region.
                </p>
              </FadeIn>

              {/* Card 2 */}
              <FadeIn delay={0.2} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Failover Redundancy</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  If a specific PoP or provider goes down, traffic is instantly rerouted to the next best node. No single point of failure.
                </p>
              </FadeIn>

              {/* Card 3 */}
              <FadeIn delay={0.3} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Tiered Caching</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Requests that miss the edge are checked against regional mid-tier caches before hitting the origin, reducing load times.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* --- Final CTA (Updated Style) --- */}
        <section className="px-6 pb-24 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 p-12 md:p-20 text-center shadow-2xl">

              {/* Background Glow inside CTA */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-zinc-900 to-transparent opacity-50 pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-teal-400 font-medium mb-6">
                  <Wifi className="w-5 h-5" />
                  <span>Join the network</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                  Help us reach every<br />corner of the world.
                </h2>

                <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                  We are actively looking for infrastructure partners in underserved regions to improve latency for local communities and reduce performance inequality.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/become-a-sponsor"
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-zinc-950 transition-all duration-300 hover:bg-zinc-200 hover:scale-105"
                  >
                    <span className="mr-2">Sponsor a Node</span>
                    <Server className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </Link>
                  <Link
                    href="/stats"
                    className="inline-flex h-12 items-center justify-center rounded-full px-8 font-medium text-white transition-colors hover:text-zinc-300 border border-zinc-700 hover:bg-zinc-800"
                  >
                    View Traffic Stats <Activity className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default NetworkPage;