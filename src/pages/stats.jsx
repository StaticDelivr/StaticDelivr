import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Globe, Server, Zap, TrendingUp, TrendingDown, 
  Terminal, Activity, ShieldCheck, ExternalLink, 
  Clock, ArrowRight, Layers, Network
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { cn } from '@/lib/utils';

// --- Animation Wrapper ---
const FadeIn = ({ children, delay = 0, className }) => (
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
const NumberTicker = ({ value, decimals = 0 }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <span className="tabular-nums tracking-tight">0</span>;

  return (
    <span className="tabular-nums tracking-tight">
      {new Intl.NumberFormat('en-US', { 
        maximumFractionDigits: decimals,
        minimumFractionDigits: decimals 
      }).format(value)}
    </span>
  );
};

// --- Trend Badge ---
const TrendBadge = ({ change, className = '' }) => {
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  
  return (
    <div className={cn("inline-flex items-center gap-1.5 text-sm font-medium", 
      isPositive ? 'text-emerald-600' : 'text-rose-600', className)}>
      <TrendIcon className="w-4 h-4" />
      <span>{Math.abs(change).toFixed(2)}% vs last month</span>
    </div>
  );
};

// --- Animated Globe Visual ---
const AnimatedGlobe = () => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    {/* Globe wireframe */}
    <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-300 dark:text-zinc-700 stroke-current stroke-[0.5px] fill-none">
      <circle cx="50" cy="50" r="45" />
      <ellipse cx="50" cy="50" rx="18" ry="45" />
      <ellipse cx="50" cy="50" rx="45" ry="18" />
      <path d="M5 50h90" />
      <path d="M50 5v90" />
    </svg>
    
    {/* Animated edge nodes */}
    <motion.div 
      className="absolute w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50"
      style={{ top: '18%', left: '28%' }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
    <motion.div 
      className="absolute w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"
      style={{ top: '35%', right: '20%' }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
    />
    <motion.div 
      className="absolute w-2 h-2 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50"
      style={{ bottom: '25%', left: '22%' }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
    />
    <motion.div 
      className="absolute w-2.5 h-2.5 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50"
      style={{ bottom: '40%', right: '28%' }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
    />
    <motion.div 
      className="absolute w-2 h-2 bg-rose-500 rounded-full shadow-lg shadow-rose-500/50"
      style={{ top: '55%', left: '45%' }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
    />
  </div>
);

export async function getStaticProps() {
  const props = {
    stats: {
      requests: 890790,
      requestsChange: -0.18,
      bandwidthBytes: 24800577619,
      bandwidthChange: 1.1,
      cacheHitRate: 99.45
    },
    generatedAt: new Date().toISOString()
  };

  try {
    const res = await fetch('https://stats.staticdelivr.com/api/stats?month=previous');
    const data = await res.json();
    if (data?.total) {
      props.stats.requests = data.total.requests;
      props.stats.requestsChange = data.total.change?.requests || 0;
      props.stats.bandwidthBytes = data.total.bandwidth;
      props.stats.bandwidthChange = data.total.change?.bandwidth || 0;
    }
  } catch (error) {
    console.error("API Fetch failed, using fallback");
  }

  return { props, revalidate: 3600 };
}

const StatsPage = ({ stats, generatedAt }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const gbSaved = stats.bandwidthBytes / 1000000000;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-emerald-500/30 font-sans">
      <Head>
        <title>Stats | StaticDelivr</title>
        <meta name="description" content="Transparent network stats and infrastructure telemetry." />
      </Head>

      <Header />

      <main className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* --- Hero Section --- */}
        <section className="px-6 mb-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                <Terminal className="w-3 h-3" />
                <span>$ staticdelivr --stats --live</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                Open metrics.<br />
                <span className="text-zinc-400 dark:text-zinc-600">Public infrastructure.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                We believe public infrastructure should be measurable, not mysterious. 
                These numbers reflect the <strong className="font-semibold text-zinc-900 dark:text-white">previous 30 days</strong> of traffic across our global edge.
              </p>
            </FadeIn>

          </div>
        </section>

        {/* --- Primary Stats --- */}
        <section className="px-6 mb-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Requests Card */}
              <FadeIn className="md:col-span-2 relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-8 text-blue-600">
                    <Globe className="w-5 h-5" />
                    <span className="font-medium tracking-tight">Monthly Requests</span>
                  </div>
                  <div className="text-6xl md:text-8xl font-semibold tracking-tighter text-zinc-900 dark:text-white mb-4">
                    <NumberTicker value={stats.requests} />
                  </div>
                  <TrendBadge change={stats.requestsChange} className="mb-6" />
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm font-light">
                    Total HTTP requests processed through our global edge network in the past 30 days.
                  </p>
                </div>
              </FadeIn>

              {/* Right Column Stack */}
              <div className="flex flex-col gap-6">
                <FadeIn delay={0.1} className="flex-1 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-zinc-500 mb-4 text-xs font-semibold uppercase tracking-wider">
                    <Server className="w-4 h-4" /> Bandwidth Served
                  </div>
                  <div className="text-5xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                    <NumberTicker value={gbSaved} decimals={1} />
                    <span className="text-xl text-zinc-400 font-medium ml-1">GB</span>
                  </div>
                  <TrendBadge change={stats.bandwidthChange} className="mt-2" />
                </FadeIn>

                <FadeIn delay={0.2} className="flex-1 rounded-3xl bg-emerald-600 dark:bg-emerald-700 p-8 flex flex-col justify-center shadow-lg">
                  <div className="relative z-10 text-white">
                    <div className="flex items-center gap-2 mb-3 text-xs font-semibold uppercase tracking-wider opacity-80">
                      <Zap className="w-4 h-4" /> Cache Hit Rate
                    </div>
                    <div className="text-5xl font-semibold tracking-tight">
                      {stats.cacheHitRate}<span className="text-xl opacity-60 ml-1">%</span>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>

            <div className="mt-4 flex justify-between px-2 text-[10px] sm:text-xs text-zinc-400 font-mono uppercase tracking-wider">
               <span>Data refreshed from previous 30-day period</span>
               <span>•</span>
               <span>Updated hourly</span>
            </div>
          </div>
        </section>

        {/* --- Network Architecture Section --- */}
        <section className="px-6 mb-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              
              <FadeIn>
                <div className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-500 font-medium mb-6">
                  <Network className="w-5 h-5" />
                  <span>Multi-CDN Architecture</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
                  Built for scale.<br />
                  <span className="text-emerald-500">Designed for speed.</span>
                </h2>
                <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  <p>
                    Our network leverages the best of <strong className="font-medium text-zinc-900 dark:text-white">Cloudflare</strong>, 
                    <strong className="font-medium text-zinc-900 dark:text-white"> Fastly</strong>, <strong className="font-medium text-zinc-900 dark:text-white">Gcore</strong>, and other Tier-1 providers through intelligent routing.
                  </p>
                  <p>
                    Traffic is automatically directed to the fastest available edge, with instant failover if any node becomes unavailable.
                  </p>
                </div>

                <div className="mt-8">
                  <Link href="/network" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:gap-3 transition-all group">
                    View Network Map <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={0.2} className="flex justify-center">
                <div className="p-8 md:p-12 bg-zinc-100 dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                  <AnimatedGlobe />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
        <section className="px-6 pb-24 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 p-12 md:p-20 text-center shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#27272a_0%,_transparent_70%)] opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8 tracking-tight">
                  Join the movement for a<br className="hidden md:block" />
                  <span className="bg-gradient-to-r from-emerald-400 to-blue-300 bg-clip-text text-transparent">
                    faster, fairer internet.
                  </span>
                </h2>

                <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                  If StaticDelivr makes your site faster, consider <Link href="/sponsors" className="text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-emerald-500 transition-colors">sponsoring the project</Link> to help keep the network healthy and accessible.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/docs" className="h-12 px-8 rounded-full bg-white text-zinc-950 font-medium flex items-center hover:bg-zinc-200 transition-transform hover:scale-105">
                    Get Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  <Link href="https://status.staticdelivr.com" target="_blank" className="h-12 px-8 rounded-full border border-zinc-700 text-white font-medium flex items-center hover:bg-zinc-800 transition-all gap-2">
                    System Status <ExternalLink className="w-4 h-4" />
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

export default StatsPage;
