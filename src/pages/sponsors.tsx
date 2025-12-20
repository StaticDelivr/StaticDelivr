import React, { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Heart, Terminal, ArrowRight, Server,
  Zap, Globe, Trophy, Leaf, Users,
  Cpu, Rocket, Wifi, Cloud
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { cn } from '@/lib/utils';

// --- Animation Wrapper ---
const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Hydration-Safe Number Ticker ---
const NumberTicker = ({ value, decimals = 0 }: { value: number, decimals?: number }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <span className="tabular-nums tracking-tight opacity-0">0</span>;

  return (
    <span className="tabular-nums tracking-tight">
      {new Intl.NumberFormat('en-US', {
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals
      }).format(value)}
    </span>
  );
};

// --- Wireframe Globe Icon ---
const WireframeGlobe = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="50" cy="50" r="48" />
    <ellipse cx="50" cy="50" rx="48" ry="20" />
    <path d="M50 2v96" />
    <path d="M2 50h96" />
  </svg>
);

// --- Data Fetching ---
interface SponsorsPageProps {
  stats: {
    requests: number;
    bandwidth: number;
  };
}

export async function getStaticProps() {
  const props = {
    stats: { requests: 890790, bandwidth: 26628797235 }
  };

  try {
    const res = await fetch('https://stats.staticdelivr.com/api/stats?month=previous');
    const data = await res.json();

    if (data?.total?.requests) props.stats.requests = data.total.requests;
    if (data?.total?.bandwidth) props.stats.bandwidth = data.total.bandwidth;
  } catch (error) {
    console.error("Error fetching stats:", error);
  }

  return { props, revalidate: 3600 };
}

// --- Sponsors Data ---
const sponsors = [
  {
    name: "ClouDNS",
    tier: "Infrastructure",
    role: "DNS Network",
    description: "Premium DNS infrastructure ensuring global resolution speed and 100% uptime reliability.",
    logo: "/assets/sponsors/cloudns.svg",
    website: "https://www.cloudns.net/",
    color: "blue",
  },
  {
    name: "Netlify",
    tier: "Infrastructure",
    role: "Hosting & Edge",
    description: "Modern hosting and serverless backend services that power our core web presence.",
    logo: "/assets/sponsors/netlify.svg",
    website: "https://www.netlify.com/",
    color: "cyan",
  },
];

const SponsorsPage: React.FC<SponsorsPageProps> = ({ stats }) => {

  // Format Bandwidth helper
  const formatBandwidth = (bytes: number) => {
    if (!bytes) return "0 GB";
    const gb = bytes / (1024 * 1024 * 1024);
    if (gb >= 1024) return <><NumberTicker value={gb / 1024} decimals={1} /> TB</>;
    return <><NumberTicker value={gb} decimals={1} /> GB</>;
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-rose-500/30 font-sans">
      <NextSeo
        title="Our Sponsors | StaticDelivr"
        description="Meet the infrastructure partners and companies powering the free, open-source StaticDelivr network."
        canonical="https://staticdelivr.com/sponsors"
        openGraph={{
          url: 'https://staticdelivr.com/sponsors',
          title: 'Our Sponsors | StaticDelivr',
          description: 'Meet the infrastructure partners and companies powering the free, open-source StaticDelivr network.',
        }}
      />

      <Header />

      <main className="relative pt-32 pb-20 overflow-hidden">

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-rose-500/10 dark:bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* --- Hero Section --- */}
        <section className="px-6 mb-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-700 dark:text-zinc-400 mb-8">
                <Terminal className="w-3 h-3" />
                <span>$ staticdelivr --sponsors</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                Powered by sponsors who<br />
                <span className="text-zinc-600 dark:text-zinc-400">believe in the open web.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                StaticDelivr is <strong className="font-semibold text-zinc-900 dark:text-white">free and open source</strong>.
                We rely on forward-thinking infrastructure partners to keep the network fast, free, and accessible for everyone.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/become-a-sponsor" className="h-10 px-6 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium flex items-center hover:opacity-90 transition-opacity">
                <Heart className="w-4 h-4 mr-2 text-rose-500 fill-rose-500" /> Become a Sponsor
              </Link>
              <Link href="/impact" className="h-10 px-6 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                View Our Impact <ArrowRight className="w-3 h-3 ml-2" />
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* --- Current Sponsors Grid --- */}
        <section className="px-6 mb-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="mb-8 flex flex-wrap items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Infrastructure Partners</h2>
                <p className="text-sm text-zinc-600 mt-1">Leading companies powering the network</p>
              </div>
              {/* Stats Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 rounded-full text-xs font-medium border border-rose-200 dark:border-rose-900/30">
                <Heart className="w-3 h-3 fill-rose-500" />
                Thanks to our {sponsors.length} partners
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sponsors.map((sponsor, index) => (
                <FadeIn key={sponsor.name} delay={index * 0.1}>
                  <Link
                    href={sponsor.website}
                    target="_blank"
                    className="group relative block h-full overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-all hover:shadow-lg"
                  >
                    {/* Gradient Hover Effect */}
                    <div className={cn(
                      "absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-gradient-to-br from-transparent to-transparent",
                      sponsor.color === 'blue' && "from-blue-500/5",
                      sponsor.color === 'cyan' && "from-cyan-500/5"
                    )} />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-8">
                        {/* Sponsor Logo Container */}
                        <div className="relative h-12 w-32 flex items-center justify-start grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                          <Image
                            src={sponsor.logo}
                            alt={`${sponsor.name} logo`}
                            fill
                            className="object-contain object-left dark:invert"
                          />
                        </div>
                        <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{sponsor.name}</h3>
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide",
                          sponsor.color === 'blue' ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300"
                        )}>
                          {sponsor.tier}
                        </span>
                      </div>

                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                        {sponsor.description}
                      </p>

                      <div className="mt-auto pt-2">
                        <div className="inline-block text-xs font-mono text-zinc-400 border-b border-transparent group-hover:border-zinc-400 transition-colors">
                          {sponsor.website.replace('https://', '').replace(/\/$/, '')}
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}

              {/* "Your Company" Placeholder Card */}
              <FadeIn delay={0.3}>
                <Link
                  href="/become-a-sponsor"
                  className="group block h-full"
                >
                  <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/50 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all h-full flex flex-col items-center justify-center p-12 text-center min-h-[280px]">
                    <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Heart className="w-8 h-8 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-2">Your Company Here</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                      Support the open web and get your brand in front of millions of developers
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-white group-hover:gap-2 transition-all">
                      Become a Sponsor <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* --- Why Sponsor (Bento Grid Style) --- */}
        <section className="px-6 mb-32">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">Why support infrastructure?</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">Sponsoring StaticDelivr isn't just about logo placement. It's about funding digital equity and a cleaner web.</p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">

              {/* Card 1: Brand Visibility */}
              <FadeIn delay={0.1} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Global Visibility</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Connect with millions of developers who rely on our network. Your brand is displayed on our homepage, docs, and repo.
                  </p>
                </div>
              </FadeIn>

              {/* Card 2: Digital Equity (Large) */}
              <FadeIn delay={0.2} className="md:col-span-2 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-900 dark:bg-zinc-800/50 text-white flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                <div className="relative z-10 flex-1">
                  <div className="inline-flex items-center gap-2 text-emerald-400 font-medium mb-4">
                    <Globe className="w-5 h-5" />
                    <span>Social Impact</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Fund Digital Equity</h3>
                  <p className="text-zinc-300 leading-relaxed mb-6">
                    Your sponsorship directly subsidizes traffic for users in developing regions. We optimize assets to run smoothly on low-end devices and expensive data plans, bridging the digital divide.
                  </p>
                  <Link href="/impact" className="text-sm font-medium border-b border-zinc-600 hover:border-white transition-colors pb-0.5">
                    Read our Impact Report
                  </Link>
                </div>
                {/* Abstract Visual */}
                <div className="w-full md:w-1/3 h-48 md:h-full relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-emerald-500/20 blur-[60px] rounded-full" />
                  <Globe className="relative z-10 w-32 h-32 text-emerald-500/80 stroke-1" />
                </div>
              </FadeIn>

              {/* Card 3: Recruiting */}
              <FadeIn delay={0.3} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Top Tier Talent</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Showcase your commitment to open source to attract engineers who care about performance and community.
                  </p>
                </div>
              </FadeIn>

              {/* Card 4: Sustainability */}
              <FadeIn delay={0.4} className="md:col-span-2 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Climate Action</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
                    Our edge optimization reduces data transfer by up to 90%. Sponsoring us effectively acts as a carbon offset for the internet.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-center">
                    <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">~120t</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wide">CO2 Avoided/yr</div>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* --- How You Can Help (Contribution Tiers) --- */}
        <section className="px-6 mb-32">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">Contribution Tiers</h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                We prioritize <strong className="text-zinc-900 dark:text-white">unused capacity</strong> over cash.
                If you can spare infrastructure, that's more valuable to us than a donation.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Infrastructure */}
              <FadeIn delay={0.1}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-all hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                      <Server className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">Edge Infrastructure</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                      Provide bandwidth, compute, or object storage. Help us cache content closer to users in underserved regions like SE Asia and LATAM.
                    </p>
                    <div className="mt-auto border-t border-zinc-100 dark:border-zinc-800 pt-4">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Most Needed</span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Card 2: Tooling */}
              <FadeIn delay={0.2}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-all hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">SaaS & Observability</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                      We need visibility to keep the network stable. Sponsoring enterprise accounts for monitoring, logging, or security tools helps us stay online.
                    </p>
                  </div>
                </div>
              </FadeIn>

              {/* Card 3: Engineering */}
              <FadeIn delay={0.3}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-all hover:shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">Engineering Time</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                      Dedicate team hours to help maintain our open source integrations, improve our documentation, or build new plugins.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="px-6 pb-24">
          <FadeIn>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 p-12 md:p-20 text-center shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-transparent opacity-50 pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                  Ready to support <br className="hidden md:block" />
                  <span className="bg-gradient-to-r from-rose-400 to-orange-300 bg-clip-text text-transparent">
                    public infrastructure?
                  </span>
                </h2>
                <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
                  If you can help with infrastructure, tooling, or engineering resources, we'd love to talk. Join our sponsors in building a faster, fairer internet for everyone.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/become-a-sponsor"
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-zinc-950 transition-all duration-300 hover:bg-zinc-200 hover:scale-105"
                  >
                    <Heart className="h-4 w-4 mr-2 text-rose-500 fill-rose-500 transition-transform group-hover:scale-110" />
                    <span>Become a Sponsor</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-12 items-center justify-center rounded-full px-8 font-medium text-white transition-colors hover:text-zinc-300 border border-zinc-700 hover:bg-zinc-800"
                  >
                    Contact Us
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

export default SponsorsPage;