import React from 'react';
import Head from 'next/head';
import { Globe, Server, Zap, Info, Shield, Activity, Network } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
const NetworkMap = dynamic(() => import('@/components/NetworkMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-zinc-50" />,
});
import { AuroraBackground } from '../components/ui/aurora-background';
import { BentoGrid } from '../components/ui/bento-grid';
import { BlurFade } from '../components/ui/blur-fade';
import { cn } from '@/lib/utils';

interface CustomBentoCardProps {
  name: string;
  className?: string;
  background: React.ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

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
}: CustomBentoCardProps & React.HTMLAttributes<HTMLDivElement>) => (
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

const NetworkPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>Global CDN Network | 570+ PoPs Worldwide - StaticDelivr</title>
        <meta name="description" content="Explore StaticDelivr's global network with 570+ Points of Presence across 6 continents, offering sub-50ms latency and high-speed content delivery with advanced security." />
        <meta name="keywords" content="global network, CDN network, StaticDelivr, content delivery, 570 locations, network capacity, PoPs, points of presence, multi-CDN, edge network, global CDN infrastructure" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        
        <meta property="og:url" content="https://staticdelivr.com/network" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Global CDN Network | 570+ PoPs Worldwide - StaticDelivr" />
        <meta property="og:description" content="Explore StaticDelivr's global network with 570+ Points of Presence across 6 continents, offering sub-50ms latency and high-speed content delivery." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="StaticDelivr" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/network" />
        <meta name="twitter:title" content="Global CDN Network | 570+ PoPs Worldwide - StaticDelivr" />
        <meta name="twitter:description" content="Explore StaticDelivr's global network with 570+ Points of Presence across 6 continents, offering sub-50ms latency and high-speed content delivery." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[50vh] py-24">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
              Global Network
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              Our network spans the globe with 570+ Points of Presence, ensuring lightning-fast content delivery worldwide.
            </p>
          </div>
        </AuroraBackground>

        {/* Map Section */}
        <section className="py-12 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.1} inView>
              <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-8 mb-12 shadow-sm">
                <div className="h-96 rounded-lg overflow-hidden relative z-0">
                  <NetworkMap />
                </div>
              </div>
            </BlurFade>

            {/* Network Stats */}
            <BlurFade delay={0.2} inView>
              <BentoGrid className="grid-cols-1 md:grid-cols-3 auto-rows-auto gap-6 mb-12">
                <CustomBentoCard
                  name="Global Coverage"
                  Icon={Globe}
                  background={<GlobeBackground />}
                  className="col-span-1"
                >
                  <p className="text-3xl font-bold text-zinc-900 dark:text-white mt-2">570+</p>
                  <p className="text-sm mt-1">Points of Presence</p>
                </CustomBentoCard>

                <CustomBentoCard
                  name="Multi-CDN"
                  Icon={Server}
                  background={<ServerBackground />}
                  className="col-span-1"
                >
                  <p className="text-3xl font-bold text-zinc-900 dark:text-white mt-2">2 CDN</p>
                  <p className="text-sm mt-1">& 2 DNS Providers</p>
                </CustomBentoCard>

                <CustomBentoCard
                  name="Avg Response Time"
                  Icon={Zap}
                  background={<ZapBackground />}
                  className="col-span-1"
                >
                  <p className="text-3xl font-bold text-zinc-900 dark:text-white mt-2">&lt;50ms</p>
                  <p className="text-sm mt-1">Worldwide</p>
                </CustomBentoCard>
              </BentoGrid>
            </BlurFade>

            {/* Network Features */}
            <BlurFade delay={0.3} inView>
              <BentoGrid className="grid-cols-1 md:grid-cols-2 auto-rows-auto gap-6">
                <CustomBentoCard
                  name="Infrastructure"
                  Icon={Activity}
                  background={<InfraBackground />}
                  className="col-span-1"
                >
                  <ul className="space-y-4 mt-4">
                    <li className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                      <span>Leveraging two leading CDN providers for global reach</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                      <span>Redundant DNS services for seamless operation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                      <span>Intelligent load balancing for optimal performance</span>
                    </li>
                  </ul>
                </CustomBentoCard>

                <CustomBentoCard
                  name="Security"
                  Icon={Shield}
                  background={<SecurityBackground />}
                  className="col-span-1"
                >
                  <ul className="space-y-4 mt-4">
                    <li className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                      <span>Resilient DDoS mitigation to protect against threats</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                      <span>End-to-end SSL/TLS encryption for data integrity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                      <span>Continuous 24/7 monitoring to ensure reliability</span>
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

export default NetworkPage;