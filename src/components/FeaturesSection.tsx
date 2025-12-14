"use client";

import React from "react";
import { 
  Globe2, 
  Server, 
  Zap, 
  Shield, 
  GitBranch
} from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { BlurFade } from "@/components/ui/blur-fade";

// Animated background components for each card
const GlobeBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-20">
    <div className="relative w-48 h-48">
      {/* Animated rings */}
      <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping" style={{ animationDuration: "3s" }} />
      <div className="absolute inset-4 rounded-full border-2 border-blue-500/40 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
      <div className="absolute inset-8 rounded-full border-2 border-blue-500/50 animate-ping" style={{ animationDuration: "2s", animationDelay: "1s" }} />
      {/* Static center globe */}
      <div className="absolute inset-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
    </div>
  </div>
);

const ServerBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-15">
    <div className="absolute top-4 left-4 right-4 grid grid-cols-4 gap-2">
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="h-3 rounded-sm bg-purple-500 animate-pulse"
          style={{ animationDelay: `${i * 0.1}s`, animationDuration: "1.5s" }}
        />
      ))}
    </div>
  </div>
);

const ZapBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    {/* Lightning bolts */}
    <svg className="absolute top-0 left-1/4 w-16 h-32 text-yellow-500 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
    <svg className="absolute top-8 right-1/4 w-12 h-24 text-yellow-400 animate-pulse" style={{ animationDelay: "0.3s" }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  </div>
);

const ShieldBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <div className="relative">
      <div className="absolute inset-0 rounded-lg bg-green-500/20 blur-xl animate-pulse" />
      <Shield className="w-32 h-32 text-green-500" />
    </div>
  </div>
);

const GitBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-15">
    <div className="absolute top-4 left-8">
      <div className="flex flex-col items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-orange-500" />
        <div className="w-0.5 h-12 bg-orange-400" />
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-6 bg-orange-400" />
            <div className="w-4 h-4 rounded-full bg-orange-500" />
          </div>
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-6 bg-orange-400" />
            <div className="w-4 h-4 rounded-full bg-orange-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const features = [
  {
    Icon: Globe2,
    name: "Global Network",
    description: "350+ Points of Presence across 6 continents ensuring blazing fast content delivery worldwide with <50ms latency.",
    href: "/network",
    cta: "View Network Map",
    background: <GlobeBackground />,
    className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: Server,
    name: "Multi-CDN Architecture",
    description: "2 enterprise CDN providers with intelligent load balancing and automatic failover for 99.99% uptime.",
    href: "/about",
    cta: "Learn More",
    background: <ServerBackground />,
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Zap,
    name: "Lightning Fast Setup",
    description: "Simple URL structure - just swap your domain. No configuration, no API keys, no build steps required.",
    href: "/docs/getting-started",
    cta: "Get Started",
    background: <ZapBackground />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Shield,
    name: "Enterprise Security",
    description: "Free SSL/TLS, DDoS protection, and SRI hash support. Your assets are served securely, always.",
    href: "/docs/caching-performance",
    cta: "Security Details",
    background: <ShieldBackground />,
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: GitBranch,
    name: "Version Control",
    description: "Semantic versioning support with npm, GitHub releases, and commit SHA references. Pin any version.",
    href: "/docs/api-tools",
    cta: "API Reference",
    background: <GitBackground />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: "24px 24px"
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              Why StaticDelivr
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Built for Speed,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Designed for Developers
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to serve your open-source projects with enterprise-grade performance—completely free.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <BentoGrid className="lg:grid-rows-2 auto-rows-[18rem] md:auto-rows-[20rem]">
            {features.map((feature) => (
              <BentoCard key={feature.name} {...feature} />
            ))}
          </BentoGrid>
        </BlurFade>
      </div>
    </section>
  );
};

export default FeaturesSection;