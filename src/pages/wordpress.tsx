"use client";

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  ArrowRight, 
  Check, 
  Zap, 
  Image as ImageIcon, 
  Shield, 
  Settings,
  Download,
  Star,
  RefreshCw,
  Globe,
  Gauge,
  FileCode,
  ChevronRight
} from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { BlurFade } from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';
import { ShineBorder } from '@/components/ui/shine-border';

const Header = dynamic(() => import('@/components/Header'), {
  loading: () => <div className="h-16 bg-white dark:bg-zinc-900 border-b" />,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-64 bg-slate-900" />,
});

// Animated background components for bento cards
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

const ImageOptBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <div className="relative">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-xl animate-pulse" />
      <ImageIcon className="w-32 h-32 text-purple-500" />
      <div className="absolute -right-2 -bottom-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">WebP</div>
    </div>
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

const GlobeBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <div className="relative w-40 h-40">
      <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping" style={{ animationDuration: "3s" }} />
      <div className="absolute inset-4 rounded-full border-2 border-blue-500/40 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
      <div className="absolute inset-8 rounded-full border-2 border-blue-500/50 animate-ping" style={{ animationDuration: "2s", animationDelay: "1s" }} />
      <div className="absolute inset-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
    </div>
  </div>
);

const GaugeBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-15">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Gauge className="w-32 h-32 text-orange-500" />
      <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
        <div className="w-2 h-2 bg-orange-500 rounded-full absolute top-0 left-1/2" />
      </div>
    </div>
  </div>
);

const features = [
  {
    Icon: Zap,
    name: "Zero Configuration",
    description: "Just activate and go. No API keys, no DNS changes, no complex setup. StaticDelivr automatically rewrites your asset URLs.",
    href: "/docs/wordpress-integration",
    cta: "View Setup Guide",
    background: <ZapBackground />,
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: ImageIcon,
    name: "Automatic WebP/AVIF",
    description: "Images are automatically converted to modern formats. Turn 2MB images into 20KB without quality loss—up to 95% smaller.",
    href: "/docs/wordpress-integration",
    cta: "Learn More",
    background: <ImageOptBackground />,
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Shield,
    name: "Smart Fallback",
    description: "If the CDN ever fails, assets automatically load from your origin server. Your site never breaks—guaranteed reliability.",
    href: "/docs/wordpress-integration",
    cta: "How It Works",
    background: <ShieldBackground />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Globe,
    name: "570+ Global PoPs",
    description: "Your WordPress assets served from 570+ edge locations worldwide. Sub-50ms latency for visitors everywhere.",
    href: "/network",
    cta: "View Network",
    background: <GlobeBackground />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: Gauge,
    name: "Core Web Vitals Boost",
    description: "Improve LCP, CLS, and FID scores. Faster load times mean better SEO rankings and happier visitors.",
    href: "/docs/caching-performance",
    cta: "Performance Tips",
    background: <GaugeBackground />,
    className: "lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
];

const WordPressPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Head>
        <title>Free WordPress CDN Plugin | StaticDelivr - Accelerate WordPress in 1 Click</title>
        <meta name="description" content="Speed up WordPress with our free CDN plugin. Automatic WebP/AVIF optimization, smart fallback, zero configuration. No API keys or DNS changes required." />
        <meta name="keywords" content="free WordPress CDN plugin, WordPress CDN, WordPress speed optimization, WebP WordPress, AVIF WordPress, WordPress performance, free CDN for WordPress, WordPress image optimization" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://staticdelivr.com/wordpress" />
        
        {/* Open Graph */}
        <meta property="og:url" content="https://staticdelivr.com/wordpress" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free WordPress CDN Plugin | StaticDelivr" />
        <meta property="og:description" content="Accelerate WordPress in 1 click. Automatic WebP/AVIF optimization, smart fallback, no configuration needed." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-wordpress.png" />
        <meta property="og:site_name" content="StaticDelivr" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free WordPress CDN Plugin | StaticDelivr" />
        <meta name="twitter:description" content="Accelerate WordPress in 1 click. Automatic WebP/AVIF optimization, smart fallback, no configuration needed." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-wordpress.png" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "StaticDelivr CDN WordPress Plugin",
              "applicationCategory": "WebApplication",
              "applicationSubCategory": "WordPress Plugin",
              "operatingSystem": "WordPress 5.8+",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Free WordPress CDN plugin that automatically rewrites asset URLs and optimizes images to WebP/AVIF format for faster page loads.",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "50",
                "bestRating": "5",
                "worstRating": "1"
              },
              "softwareVersion": "1.3.0",
              "downloadUrl": "https://wordpress.org/plugins/staticdelivr/",
              "screenshot": "https://staticdelivr.com/assets/img/wp-plugin-screenshot.png",
              "featureList": [
                "Automatic URL rewriting",
                "WebP/AVIF image optimization",
                "Smart fallback to origin",
                "Zero configuration",
                "Multi-CDN support"
              ],
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8">
              <Star className="w-4 h-4 fill-current" />
              5/5 Stars on WordPress.org
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight mb-6">
              Accelerate WordPress<br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                in 1 Click
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto mb-4">
              No API Keys. No DNS Changes. No Configuration.
            </p>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
              The StaticDelivr WordPress plugin automatically rewrites your assets to our global CDN 
              and optimizes images on the fly. Set it and forget it.
            </p>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="https://wordpress.org/plugins/staticdelivr/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-8 rounded-full bg-[#0073aa] hover:bg-[#005a87] text-white font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Download Free Plugin
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/docs/wordpress-integration"
                className="h-14 px-8 rounded-full bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium flex items-center gap-2 hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-colors backdrop-blur-sm"
              >
                <FileCode className="w-5 h-5" />
                View Documentation
              </Link>
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            {/* Social Proof / Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-zinc-200 dark:border-zinc-800 pt-10">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">5/5</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1 mt-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">v1.3.0</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Latest Version</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">95%</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Image Savings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">570+</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Global PoPs</div>
              </div>
            </div>
          </BlurFade>
        </div>
      </AuroraBackground>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium mb-4">
                <Settings className="w-4 h-4" />
                How It Works
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                Set It and{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Forget It
                </span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                StaticDelivr works silently in the background. No maintenance, no updates, no hassle.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Install Plugin</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Search for &quot;StaticDelivr&quot; in your WordPress plugins page and click Install. Takes 10 seconds.
                </p>
              </div>

              {/* Arrow 1 */}
              <div className="hidden md:flex items-center justify-center px-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <ArrowRight className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Activate</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Click Activate. Both Assets CDN and Image Optimization are enabled by default.
                </p>
              </div>

              {/* Arrow 2 */}
              <div className="hidden md:flex items-center justify-center px-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                  <ArrowRight className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">3</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Done!</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Your site is now accelerated. Assets served from our global CDN, images optimized automatically.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
                <Zap className="w-4 h-4" />
                Features
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                Everything You Need,{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Nothing You Don&apos;t
                </span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                A lightweight plugin that does exactly what it promises—accelerate your WordPress site.
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

      {/* URL Transformation Example */}
      <section className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-5xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                See the Transformation
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                Your URLs are automatically rewritten to our global CDN
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="space-y-6">
              {/* Theme Example */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <RefreshCw className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-zinc-900 dark:text-white">Theme CSS</span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <code className="text-sm text-red-600 dark:text-red-400 break-all">
                      https://example.com/wp-content/themes/theme-name/style.css
                    </code>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <code className="text-sm text-green-600 dark:text-green-400 break-all">
                      https://cdn.staticdelivr.com/wp/themes/theme-name/version/style.css
                    </code>
                  </div>
                </div>
              </div>

              {/* Image Example */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <ImageIcon className="w-5 h-5 text-purple-500" />
                  <span className="font-medium text-zinc-900 dark:text-white">Image Optimization</span>
                  <span className="ml-auto text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                    95% smaller
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <code className="text-sm text-red-600 dark:text-red-400 break-all">
                      https://example.com/wp-content/uploads/photo.jpg (2MB)
                    </code>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <code className="text-sm text-green-600 dark:text-green-400 break-all">
                      https://cdn.staticdelivr.com/img/images?url=...&q=80&format=webp (~50KB)
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <BlurFade delay={0.1} inView>
            <div className="inline-flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Speed Up Your WordPress Site?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of WordPress sites already using StaticDelivr. 
              Free forever, no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wordpress.org/plugins/staticdelivr/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-10 rounded-full bg-white text-zinc-900 font-semibold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Download Free Plugin
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/docs/wordpress-integration"
                className="h-14 px-8 rounded-full bg-white/10 border border-white/30 text-white font-medium flex items-center gap-2 hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
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

export default WordPressPage;
