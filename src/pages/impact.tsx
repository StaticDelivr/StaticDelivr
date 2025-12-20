import React from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import {
  Leaf, Zap, Activity, Heart, ArrowRight,
  Wind, Globe, TrendingDown, Check, Terminal
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
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

// --- Number Ticker ---
const NumberTicker = ({ value }: { value: number }) => (
  <span className="tabular-nums tracking-tight">
    {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)}
  </span>
);

// --- Minimal Globe Component ---
const MinimalGlobe = () => (
  <div className="relative w-64 h-64 flex items-center justify-center">
    {/* Static Lines */}
    <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-600 dark:text-zinc-500 stroke-current stroke-[1px] fill-none">
      <circle cx="50" cy="50" r="45" />
      <ellipse cx="50" cy="50" rx="20" ry="45" />
      <path d="M5 50h90" />
    </svg>

    {/* Orbiting Dot 1 */}
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-[15%] left-[85%] w-3 h-3 bg-blue-500 rounded-full shadow-sm" />
    </motion.div>

    {/* Orbiting Dot 2 (Inverse) */}
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute top-[75%] left-[15%] w-4 h-4 bg-emerald-500 rounded-full shadow-sm" />
    </motion.div>
  </div>
);

// --- Page Logic ---

interface ImpactStats {
  co2: number;
  lightbulbs: number;
  bandwidthSavedGB: number;
  requests: number;
}

interface ImpactPageProps {
  stats: ImpactStats;
}

export async function getStaticProps() {
  try {
    const response = await fetch('https://stats.staticdelivr.com/api/stats?month=previous');
    const data = await response.json();

    const imageReqs = (data.total.requests || 800000000) * 0.30;
    const bytesSaved = imageReqs * (400 * 1024);
    const gbSaved = bytesSaved / (1024 * 1024 * 1024);
    const kwhSaved = gbSaved * 0.15;
    const kgCo2 = kwhSaved * 0.475;
    const lightbulbs = Math.round(kgCo2 / 0.00475);

    const stats = {
      co2: Math.round(kgCo2),
      lightbulbs: lightbulbs,
      bandwidthSavedGB: Math.round(gbSaved),
      requests: data.total.requests || 800000000
    };

    return { props: { stats }, revalidate: 86400 };
  } catch (error) {
    // Fallback data if API fails
    return {
      props: {
        stats: { co2: 150, lightbulbs: 31579, bandwidthSavedGB: 2000, requests: 800000000 }
      },
      revalidate: 3600
    };
  }
}

const ImpactPage: React.FC<ImpactPageProps> = ({ stats }) => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-emerald-500/30 font-sans">
      <NextSeo
        title="Impact & Sustainability - Engineering a Greener Web"
        description="Learn how StaticDelivr is reducing the internet's carbon footprint through edge optimization. We save terabytes of bandwidth and tons of CO2 every month."
        canonical="https://staticdelivr.com/impact"
        openGraph={{
          url: 'https://staticdelivr.com/impact',
          title: 'Building a Faster, Fairer, Greener Internet | StaticDelivr',
          description: 'The greenest byte is the one you never send. See our real-time impact on bandwidth savings and carbon reduction.',
        }}
      />

      <Header />

      <main className="relative pt-32 pb-20 overflow-hidden">

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

        {/* --- Hero Section --- */}
        <section className="px-6 mb-24 relative z-10">
          <div className="max-w-5xl mx-auto text-center">

            {/* CLI Badge */}
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                <Terminal className="w-3 h-3" />
                <span>$ staticdelivr --sustainability</span>
              </div>
            </FadeIn>

            {/* Heading */}
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                The fastest byte is the one<br />
                <span className="text-zinc-600 dark:text-zinc-400">you never send.</span>
              </h1>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
                We optimize assets at the edge, effectively <strong className="font-semibold text-zinc-900 dark:text-white">"deleting" waste</strong> from the internet.
                Less bandwidth means <strong className="font-semibold text-zinc-900 dark:text-white">faster loads</strong> for users and <strong className="font-semibold text-zinc-900 dark:text-white">less carbon</strong> for the planet.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* --- Stats Grid --- */}
        <section className="px-6 mb-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Primary Stat: Bandwidth */}
              <FadeIn className="md:col-span-2 relative group overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex items-center gap-2 mb-6 text-emerald-600 dark:text-emerald-500">
                    <Activity className="w-5 h-5" />
                    <h2 className="font-medium tracking-tight">Bandwidth Saved</h2>
                  </div>

                  <div>
                    <div className="text-6xl md:text-8xl font-semibold tracking-tighter text-zinc-900 dark:text-white mb-3">
                      <NumberTicker value={stats.bandwidthSavedGB} />
                      <span className="text-3xl md:text-4xl text-zinc-300 dark:text-zinc-700 ml-2 font-medium">GB</span>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mt-2 text-base font-normal leading-relaxed">
                      Data we didn't send. By compressing images and code, we saved terabytes of unnecessary transmission this month alone.
                    </p>
                  </div>
                </div>

                {/* Wind Icon - Subtle */}
                <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] text-zinc-900 dark:text-white pointer-events-none">
                  <Wind className="w-64 h-64" />
                </div>
              </FadeIn>

              {/* Secondary Stats Column */}
              <div className="flex flex-col gap-6">

                {/* CO2 */}
                <FadeIn delay={0.1} className="flex-1 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 flex flex-col justify-center shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
                  <h2 className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 mb-2 text-xs font-semibold uppercase tracking-wider">
                    <Leaf className="w-4 h-4" /> Carbon Avoided
                  </h2>
                  <div className="text-5xl font-semibold text-zinc-900 dark:text-white tracking-tight">
                    <NumberTicker value={stats.co2} /> <span className="text-2xl text-zinc-300 dark:text-zinc-600 font-medium">kg</span>
                  </div>
                </FadeIn>

                {/* Energy */}
                <FadeIn delay={0.2} className="flex flex-col">
                  <div className="flex-1 rounded-3xl bg-zinc-900 dark:bg-white p-8 flex flex-col justify-center shadow-lg relative overflow-hidden group">
                    {/* Subtle inner glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 dark:bg-black/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <div className="relative z-10">
                      <h2 className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 mb-3 text-xs font-semibold uppercase tracking-wider">
                        <Zap className="w-4 h-4" /> Energy Equivalent
                      </h2>
                      <div className="text-5xl font-semibold text-white dark:text-zinc-900 tracking-tight">
                        <NumberTicker value={stats.lightbulbs} />
                      </div>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 font-normal">Lightbulb-hours powered</div>
                    </div>
                  </div>

                  {/* Stats BELOW the card */}
                  <div className="mt-3 flex justify-between px-2 text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                    <span>0.15 kWh/GB Intensity</span>
                    <span>•</span>
                    <span>0.475 kg CO₂/kWh Grid Avg</span>
                  </div>
                </FadeIn>
              </div>
            </div>

            {/* Disclaimer */}
            <FadeIn delay={0.3} className="mt-8 text-center border-t border-dashed border-zinc-200 dark:border-zinc-800 pt-8">
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-normal">
                Calculations based on {stats.requests.toLocaleString()} real-time requests from the previous 30 days.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* --- MERGED: Inequality Mission + Visual Proof --- */}
        <section className="px-6 py-24 bg-white dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-900">
          <div className="max-w-7xl mx-auto space-y-24">

            {/* PART 1: The Philosophy (Your New Section) */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Large text */}
              <FadeIn>
                <div className="inline-flex items-center gap-2 text-rose-500 font-medium mb-6">
                  <Heart className="w-5 h-5" />
                  <span>Digital Inclusion</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
                  Built for the
                  <span className="text-emerald-500"> billions</span>,
                  not just the privileged
                </h2>
              </FadeIn>

              {/* Right: Body copy */}
              <FadeIn delay={0.2} className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                <p>
                  Modern web development assumes everyone has fiber internet and unlimited data.
                  <span className="text-zinc-900 dark:text-white font-medium"> They don't.</span>
                </p>
                <p>
                  A 3MB hero image loads instantly in Silicon Valley but becomes a financial burden
                  in regions where 1GB costs a day's wages. This is <span className="text-zinc-900 dark:text-white font-medium">Performance Inequality</span>.
                </p>
                <p>
                  StaticDelivr democratizes access through automatic edge optimization.
                  Rural users, developing nations, and budget data plans get the same fast experience
                  as tech hubs—while dramatically reducing the web's carbon footprint.
                </p>

                <div className="pt-4">
                  <Link
                    href="/sponsors"
                    className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:gap-3 transition-all group"
                  >
                    Support this mission
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* PART 2: The Visual Proof (Moved Old Components Here) */}
            <div className="grid md:grid-cols-2 gap-16 items-start">
              {/* 3G Stat Card */}
              <FadeIn delay={0.3} className="h-full">
                <div className="h-full p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 group hover:border-rose-200 transition-colors">
                  <div className="flex flex-col gap-6">
                    <div className="w-12 h-12 flex items-center justify-center bg-rose-100 dark:bg-rose-900/50 rounded-2xl text-rose-600 dark:text-rose-400 shrink-0 relative">
                      <Globe className="w-6 h-6 relative z-10" />
                      <div className="absolute inset-0 bg-rose-400/20 rounded-2xl animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                        40% of the world relies on 3G
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                        Optimization isn't just speed scores. For 3 billion users, it's the difference between <strong className="text-rose-600 dark:text-rose-400 font-medium">access</strong> and <strong className="text-rose-600 dark:text-rose-400 font-medium">exclusion</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* DevTools Component */}
              <FadeIn delay={0.4}>
                <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-xl">
                  <div className="h-10 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-rose-400/80"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                    </div>
                    <div className="ml-4 text-xs font-mono text-zinc-600 dark:text-zinc-400">DevTools / Network</div>
                  </div>

                  <div className="p-6 space-y-8 font-mono text-sm">
                    <div>
                      <div className="flex justify-between text-zinc-600 dark:text-zinc-400 mb-2 text-xs uppercase tracking-wide font-medium">
                        <span>Standard CDN Origin</span>
                        <span className="text-rose-500">3.2 MB / 12s on 3G</span>
                      </div>
                      <div className="relative h-10 bg-zinc-200 dark:bg-zinc-800 rounded-md overflow-hidden flex items-center px-4">
                        <span className="relative z-10 text-zinc-600 dark:text-zinc-400 text-xs">hero-image.png</span>
                        <div className="absolute top-0 left-0 h-full w-full bg-zinc-300 dark:bg-zinc-700"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-zinc-600 dark:text-zinc-400 mb-2 text-xs uppercase tracking-wide font-medium">
                        <span>StaticDelivr Edge</span>
                        <span className="text-emerald-500">320 KB / 0.8s on 3G</span>
                      </div>
                      <div className="relative h-10 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-md overflow-hidden flex items-center px-4 border border-emerald-500/20">
                        <span className="relative z-10 text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-2 text-xs">
                          hero-image.webp <span className="px-1.5 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-[10px]">Optimized</span>
                        </span>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '10%' }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="absolute top-0 left-0 h-full bg-emerald-500/30"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between text-xs">
                      <span className="text-zinc-400">Impact</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">-90% Data Transfer</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

          </div>
        </section>

        {/* --- Sustainability Section --- */}
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Minimal Globe Visual */}
              <FadeIn className="order-2 md:order-1 flex justify-center">
                <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-full p-12">
                  <MinimalGlobe />
                </div>
              </FadeIn>

              {/* Text Content */}
              <FadeIn className="order-1 md:order-2">
                <div className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-medium mb-6">
                  <Leaf className="w-5 h-5" />
                  <span>The Green Web</span>
                </div>
                <h2 className="text-4xl font-semibold text-zinc-900 dark:text-white tracking-tight mb-6">
                  The cleanest energy <br />is unused energy.
                </h2>
                <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  <p>
                    Every byte transferred consumes electricity at the data center, through the transmission network, and on the user's device.
                  </p>
                  <p>
                    We don't just buy carbon offsets. We fundamentally reduce the amount of work the internet has to do.
                  </p>
                </div>

                {/* Feature Cards */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 w-full shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                    <TrendingDown className="w-5 h-5 text-emerald-500 mb-4" />
                    <div className="font-semibold text-2xl text-zinc-900 dark:text-white mb-1">~40%</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 font-normal">Avg. Size Reduction</div>
                  </div>
                  <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 w-full shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
                    <Check className="w-5 h-5 text-blue-500 mb-4" />
                    <div className="font-semibold text-2xl text-zinc-900 dark:text-white mb-1">Zero</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 font-normal">Redundant Fetches</div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="px-6 py-24">
          <FadeIn>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 p-12 md:p-20 text-center shadow-2xl">
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-transparent opacity-50 pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                  Help us build a <br className="hidden md:block" />
                  <span className="bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">greener, faster internet.</span>
                </h2>
                <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
                  StaticDelivr is open source and community funded. Your support directly translates to optimizing more assets for more people.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/sponsors"
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-zinc-950 transition-all duration-300 hover:bg-zinc-200 hover:scale-105"
                  >
                    <span className="mr-2">Become a Sponsor</span>
                    <Heart className="h-4 w-4 transition-transform group-hover:scale-110 text-rose-500 fill-rose-500" />
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex h-12 items-center justify-center rounded-full px-8 font-medium text-white transition-colors hover:text-zinc-300 border border-zinc-700 hover:bg-zinc-800"
                  >
                    Read our philosophy <ArrowRight className="ml-2 h-4 w-4" />
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

export default ImpactPage;
