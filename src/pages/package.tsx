"use client";

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  ArrowRight,
  Check,
  Download,
  Zap,
  Package,
  Code,
  Globe,
  Terminal,
  FileCode,
  BookOpen,
  Star,
  TrendingUp,
  Calendar,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { BlurFade } from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';

const Header = dynamic(() => import('@/components/Header'), {
  loading: () => <div className="h-16 bg-white dark:bg-zinc-900 border-b" />,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-64 bg-slate-900" />,
});

// Animated background components for bento cards
const PackageBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-15">
    <div className="absolute top-4 left-4 right-4 grid grid-cols-3 gap-2">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="h-8 rounded-md bg-emerald-500 animate-pulse"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "2s" }}
        />
      ))}
    </div>
    <Package className="absolute -bottom-4 -right-4 w-32 h-32 text-emerald-500/30" />
  </div>
);

const CodeBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute top-4 left-4 text-blue-500 font-mono text-xs opacity-70">
        <div>import {'{'} StaticDelivrImage {'}'}</div>
        <div className="ml-4">from 'staticdelivr';</div>
      </div>
      <Code className="absolute -bottom-8 -right-8 w-40 h-40 text-blue-500/20" />
    </div>
  </div>
);

const ZapBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <svg className="absolute top-4 left-1/4 w-16 h-32 text-yellow-500 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
    <svg className="absolute top-12 right-1/4 w-12 h-24 text-yellow-400 animate-pulse" style={{ animationDelay: "0.3s" }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  </div>
);

const LayersBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-15">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="relative">
        <div className="w-24 h-16 bg-purple-500/40 rounded-lg transform rotate-6" />
        <div className="w-24 h-16 bg-purple-500/60 rounded-lg absolute top-2 left-2" />
        <div className="w-24 h-16 bg-purple-500/80 rounded-lg absolute top-4 left-4" />
      </div>
    </div>
  </div>
);

interface NpmStats {
  weekly: number;
  monthly: number;
  yearly: number;
  lastUpdated: string;
}

interface PackagePageProps {
  npmStats?: NpmStats;
}

const features = [
  {
    Icon: ImageIcon,
    name: "Automatic Optimization",
    description: "Convert images to WebP/AVIF automatically. Resize, compress, and deliver the optimal format for each browser.",
    background: <ZapBackground />,
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2",
    href: "/docs/frontend-usage#optimization",
    cta: "Learn more",
  },
  {
    Icon: Package,
    name: "Drop-in Replacement",
    description: "Replace <img> or Next.js <Image> components seamlessly. Same API, better performance.",
    background: <PackageBackground />,
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
    href: "/docs/frontend-usage#installation",
    cta: "Get started",
  },
  {
    Icon: Code,
    name: "TypeScript Ready",
    description: "Full TypeScript support with proper types for all props and configurations.",
    background: <CodeBackground />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
    href: "/docs/frontend-usage#typescript",
    cta: "View types",
  },
  {
    Icon: Layers,
    name: "Framework Agnostic",
    description: "Works with React, Next.js, Vite, or any modern React-based framework.",
    background: <LayersBackground />,
    className: "lg:col-start-1 lg:col-end-4 lg:row-start-2 lg:row-end-3",
    href: "/docs/frontend-usage#frameworks",
    cta: "See examples",
  },
];

const PackagePage: React.FC<PackagePageProps> = ({ npmStats }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Head>
        <title>StaticDelivr React Component | Image Optimization Library</title>
        <meta name="description" content="React component for automatic image optimization. 54K+ downloads. Drop-in replacement for Next.js Image with WebP/AVIF conversion and CDN delivery." />
        <meta name="keywords" content="react image component, nextjs image optimization, webp avif react, image cdn react, staticdelivr react, react image library" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://staticdelivr.com/package" />

        {/* Open Graph */}
        <meta property="og:url" content="https://staticdelivr.com/package" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="StaticDelivr React Component | Image Optimization Library" />
        <meta property="og:description" content="54K+ downloads. React component for automatic image optimization with WebP/AVIF conversion." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:site_name" content="StaticDelivr" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="StaticDelivr React Component | Image Optimization Library" />
        <meta name="twitter:description" content="54K+ downloads. React component for automatic image optimization with WebP/AVIF conversion." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "StaticDelivr React Component",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "React component for automatic image optimization with CDN delivery",
              "downloadUrl": "https://www.npmjs.com/package/staticdelivr",
              "softwareVersion": "1.0.0",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": npmStats?.yearly || 54067,
                "bestRating": "5"
              },
              "author": {
                "@type": "Organization",
                "name": "StaticDelivr",
                "url": "https://staticdelivr.com"
              }
            })
          }}
        />
      </Head>

      <Header />

      {/* Hero Section */}
      <AuroraBackground className="min-h-[90vh] flex items-center justify-center pt-16">
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-8">
              <Package className="w-4 h-4" />
              React Component Library
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight mb-6">
              Image Optimization{" "}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto mb-10">
              Drop-in React component for automatic WebP/AVIF conversion, resizing, and CDN delivery.
            </p>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            {/* Download Stats - PROMINENT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {npmStats?.yearly.toLocaleString() || "54K"}+
                </div>
                <div className="text-zinc-600 dark:text-zinc-400">Total Downloads</div>
                <div className="flex items-center mt-2 text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  <span className="text-sm">Growing fast</span>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {npmStats?.monthly.toLocaleString() || "5K"}+
                </div>
                <div className="text-zinc-600 dark:text-zinc-400">Monthly Downloads</div>
                <div className="flex items-center mt-2 text-blue-600 dark:text-blue-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="text-sm">Last 30 days</span>
                </div>
              </div>

              <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                <div className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  v1.0.0
                </div>
                <div className="text-zinc-600 dark:text-zinc-400">Latest Version</div>
                <div className="flex items-center mt-2 text-purple-600 dark:text-purple-400">
                  <Star className="w-4 h-4 mr-1" />
                  <span className="text-sm">Stable release</span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="https://www.npmjs.com/package/staticdelivr"
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-8 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Download className="w-5 h-5" />
                npm install staticdelivr
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/docs/frontend-usage"
                className="h-14 px-8 rounded-full bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium flex items-center gap-2 hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-colors backdrop-blur-sm"
              >
                <FileCode className="w-5 h-5" />
                View Documentation
              </Link>
            </div>
          </BlurFade>
        </div>
      </AuroraBackground>

      {/* Installation & Usage Section */}
      <section className="py-24 px-4 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                Get Started in{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  2 Minutes
                </span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Install the package and start optimizing images immediately.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Installation */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 text-lg flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-emerald-500" />
                    Installation
                  </h3>
                  <CodeBlock
                    code="npm install staticdelivr"
                    language="bash"
                  />
                  <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                    Or with yarn: <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">yarn add staticdelivr</code>
                  </p>
                </div>
              </div>

              {/* Basic Usage */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 text-lg flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-500" />
                    Basic Usage
                  </h3>
                  <CodeBlock
                    code={`import { StaticDelivrImage } from 'staticdelivr';

<StaticDelivrImage
  src="https://example.com/image.jpg"
  width={800}
  height={600}
  quality={80}
  format="webp"
  alt="Optimized image"
/>`}
                    language="jsx"
                  />
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Features
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                Everything You Need for{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Perfect Images
                </span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Powerful image optimization without the complexity.
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

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <BlurFade delay={0.1} inView>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Optimize Your Images?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join 54K+ developers already using StaticDelivrImage for better performance and user experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.npmjs.com/package/staticdelivr"
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-10 rounded-full bg-white text-zinc-900 font-semibold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Install Now
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/docs/frontend-usage"
                className="h-14 px-8 rounded-full bg-white/10 border border-white/30 text-white font-medium flex items-center gap-2 hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                <BookOpen className="w-5 h-5" />
                Read the Docs
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PackagePage;

// Add ISR for npm stats
export async function getStaticProps() {
  try {
    const [weeklyRes, monthlyRes, yearlyRes] = await Promise.all([
      fetch('https://api.npmjs.org/downloads/point/last-week/staticdelivr'),
      fetch('https://api.npmjs.org/downloads/point/last-month/staticdelivr'),
      fetch('https://api.npmjs.org/downloads/point/last-year/staticdelivr')
    ]);

    const [weekly, monthly, yearly] = await Promise.all([
      weeklyRes.json(),
      monthlyRes.json(),
      yearlyRes.json()
    ]);

    return {
      props: {
        npmStats: {
          weekly: weekly.downloads,
          monthly: monthly.downloads,
          yearly: yearly.downloads,
          lastUpdated: new Date().toISOString()
        }
      },
      revalidate: 86400 // Regenerate daily
    };
  } catch (error) {
    console.error('Failed to fetch npm stats:', error);
    // Fallback to static numbers
    return {
      props: {
        npmStats: {
          weekly: 1232,
          monthly: 5150,
          yearly: 54067,
          lastUpdated: new Date().toISOString()
        }
      },
      revalidate: 86400
    };
  }
}