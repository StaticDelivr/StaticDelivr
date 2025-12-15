import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Globe, Server, Zap, TrendingUp, TrendingDown, Activity, Shield, Network } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuroraBackground } from '../components/ui/aurora-background';
import { BentoGrid } from '../components/ui/bento-grid';
import { BlurFade } from '../components/ui/blur-fade';
import { NumberTicker } from '../components/ui/number-ticker';
import { cn } from '@/lib/utils';

// Background components
const GlobeBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Globe className="w-64 h-64 text-blue-500 animate-pulse" style={{ animationDuration: "3s" }} />
  </div>
);

const ServerBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-10">
    <div className="absolute top-4 left-4 right-4 grid grid-cols-4 gap-2">
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="h-3 rounded-sm bg-zinc-500 animate-pulse"
          style={{ animationDelay: `${i * 0.1}s`, animationDuration: "1.5s" }}
        />
      ))}
    </div>
  </div>
);

const ZapBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-15">
    <svg className="absolute top-0 left-1/4 w-16 h-32 text-yellow-500 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
    <svg className="absolute top-8 right-1/4 w-12 h-24 text-yellow-400 animate-pulse" style={{ animationDelay: "0.3s" }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  </div>
);

const SecurityBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Shield className="w-48 h-48 text-green-500" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent animate-pulse" />
  </div>
);

const InfraBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Network className="w-48 h-48 text-purple-500" />
  </div>
);

const CustomBentoCard = ({
  name,
  className,
  background,
  Icon,
  children,
  ...props
}) => (
  <div
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-white dark:bg-zinc-900 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
      className
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-6 relative z-10 h-full flex flex-col">
      <div className="mb-4 p-2 w-fit rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Icon className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        {name}
      </h3>
      <div className="text-zinc-500 dark:text-zinc-400 flex-grow">
        {children}
      </div>
    </div>
  </div>
);

const StatsPage = () => {
  const [statsData, setStatsData] = useState(null);

  // Fetch statistics data on the client-side
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://stats.staticdelivr.com/api/stats?month=previous');
        const data = await response.json();

        // Extract the total stats and the change values
        const totalStats = data.total;

        setStatsData({
          requests: totalStats.requests,
          bandwidth: totalStats.bandwidth,
          requestsChange: totalStats.change.requests,
          bandwidthChange: totalStats.change.bandwidth,
        });
      } catch (error) {
        console.error('Error fetching stats data:', error);
        setStatsData(null);
      }
    };

    fetchStats();
  }, []);

  const StatItem = ({ title, value, change, icon: Icon, unit, decimalPlaces = 0, background }) => {
    const isPositive = change > 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;
    const trendColor = isPositive ? 'text-green-500' : 'text-red-500';

    return (
      <CustomBentoCard
        name={title}
        Icon={Icon}
        background={background}
        className="col-span-1"
      >
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-3xl font-bold text-zinc-900 dark:text-white">
             <NumberTicker value={value} decimalPlaces={decimalPlaces} />
          </span>
          {unit && <span className="text-xl text-zinc-500 dark:text-zinc-400 font-medium">{unit}</span>}
        </div>
        {change !== undefined && (
          <div className={`flex items-center ${trendColor} text-sm font-medium mt-2`}>
            <TrendIcon className="w-4 h-4 mr-1" />
            <span>{Math.abs(change).toFixed(2)}%</span>
          </div>
        )}
      </CustomBentoCard>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>CDN Statistics & Performance Metrics | StaticDelivr</title>
        <meta name="description" content="Real-time insights into StaticDelivr's global CDN performance. View monthly requests, bandwidth usage, cache hit rates, and network status across 350+ PoPs." />
        <meta name="keywords" content="CDN statistics, network performance, StaticDelivr stats, bandwidth metrics, cache hit rate, CDN analytics, request statistics, global CDN performance" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:url" content="https://staticdelivr.com/stats" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="CDN Statistics & Performance Metrics | StaticDelivr" />
        <meta property="og:description" content="Real-time insights into StaticDelivr's global CDN performance. View monthly requests, bandwidth usage, and cache hit rates." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="StaticDelivr" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/stats" />
        <meta name="twitter:title" content="CDN Statistics & Performance Metrics | StaticDelivr" />
        <meta name="twitter:description" content="Real-time insights into StaticDelivr's global CDN performance. View monthly requests, bandwidth usage, and cache hit rates." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[50vh] py-24">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
              Network Statistics
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              Real-time insights into StaticDelivr&apos;s global network performance and usage.
            </p>
          </div>
        </AuroraBackground>

        {/* Stats Grid Section */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.1} inView>
              <BentoGrid className="grid-cols-1 md:grid-cols-3 auto-rows-auto gap-6 mb-12">
                <StatItem
                  title="Total Monthly Requests"
                  value={statsData ? statsData.requests : 0}
                  change={statsData ? statsData.requestsChange : 0}
                  icon={Globe}
                  background={<GlobeBackground />}
                />
                
                <StatItem
                  title="Total Bandwidth"
                  value={statsData ? statsData.bandwidth / 1000000 : 0}
                  change={statsData ? statsData.bandwidthChange : 0}
                  icon={Server}
                  unit="MB"
                  decimalPlaces={2}
                  background={<ServerBackground />}
                />
                
                <StatItem
                  title="Cache Hit Rate"
                  value={99.45}
                  icon={Zap}
                  unit="%"
                  decimalPlaces={2}
                  background={<ZapBackground />}
                />
              </BentoGrid>
            </BlurFade>

            {/* Additional Info Cards */}
            <BlurFade delay={0.2} inView>
              <BentoGrid className="grid-cols-1 md:grid-cols-2 auto-rows-auto gap-6">
                <CustomBentoCard
                  name="Global Coverage"
                  Icon={Activity}
                  background={<InfraBackground />}
                  className="col-span-1"
                >
                  <ul className="space-y-4 mt-4">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>350+ Points of Presence</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>6 Continents Covered</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span>Multiple Tier-1 Providers</span>
                    </li>
                  </ul>
                </CustomBentoCard>

                <CustomBentoCard
                  name="Performance"
                  Icon={Shield}
                  background={<SecurityBackground />}
                  className="col-span-1"
                >
                  <ul className="space-y-4 mt-4">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>&lt;50ms Average Response Time</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>Global Coverage</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span>Automatic Failover</span>
                    </li>
                  </ul>
                </CustomBentoCard>
              </BentoGrid>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StatsPage;
