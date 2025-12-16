"use client";

import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  ArrowRight, 
  Check, 
  Copy,
  Github,
  ExternalLink,
  Zap,
  Globe,
  Shield,
  Clock,
  ArrowDown
} from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { BlurFade } from '@/components/ui/blur-fade';

const Header = dynamic(() => import('@/components/Header'), {
  loading: () => <div className="h-16 bg-white dark:bg-zinc-900 border-b" />,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="h-64 bg-slate-900" />,
});

// Feature backgrounds
const GlobeBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <div className="relative w-40 h-40">
      <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping" style={{ animationDuration: "3s" }} />
      <div className="absolute inset-4 rounded-full border-2 border-purple-500/40 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
      <div className="absolute inset-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600" />
    </div>
  </div>
);

const ClockBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <Clock className="w-32 h-32 text-blue-500" />
  </div>
);

const ShieldBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <Shield className="w-32 h-32 text-green-500" />
  </div>
);

const features = [
  {
    Icon: Globe,
    name: "570+ Global PoPs",
    description: "Your files served from the closest edge location. Sub-50ms latency for users worldwide.",
    href: "/network",
    cta: "View Network",
    background: <GlobeBackground />,
    className: "lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: Clock,
    name: "Permanent Caching",
    description: "Files are cached for 1 year. Even if deleted from GitHub, they remain available on our CDN.",
    href: "/docs/caching-performance",
    cta: "Learn More",
    background: <ClockBackground />,
    className: "lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Shield,
    name: "Multi-CDN Failover",
    description: "If one CDN provider fails, traffic automatically routes to another. 99.99% uptime guaranteed.",
    href: "/about",
    cta: "Our Infrastructure",
    background: <ShieldBackground />,
    className: "lg:col-start-3 lg:col-end-4",
  },
];

const GitHubPage = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [outputUrl, setOutputUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convertUrl = useCallback((url: string): string => {
    if (!url.trim()) return '';

    const cdn = 'https://cdn.staticdelivr.com';

    // GitHub blob URL: https://github.com/user/repo/blob/branch/file
    const blobMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)/);
    if (blobMatch) {
      const [, user, repo, branch, file] = blobMatch;
      return `${cdn}/gh/${user}/${repo}/${branch}/${file}`;
    }

    // GitHub raw URL: https://github.com/user/repo/raw/branch/file
    const rawGhMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/raw\/([^/]+)\/(.+)/);
    if (rawGhMatch) {
      const [, user, repo, branch, file] = rawGhMatch;
      return `${cdn}/gh/${user}/${repo}/${branch}/${file}`;
    }

    // raw.githubusercontent.com: https://raw.githubusercontent.com/user/repo/branch/file
    const rawMatch = url.match(/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)/);
    if (rawMatch) {
      const [, user, repo, branch, file] = rawMatch;
      return `${cdn}/gh/${user}/${repo}/${branch}/${file}`;
    }

    throw new Error('Please enter a valid GitHub URL');
  }, []);

  useEffect(() => {
    if (!inputUrl.trim()) {
      setOutputUrl('');
      setError('');
      return;
    }

    try {
      const result = convertUrl(inputUrl);
      setOutputUrl(result);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid URL');
      setOutputUrl('');
    }
  }, [inputUrl, convertUrl]);

  const copyToClipboard = () => {
    if (outputUrl) {
      navigator.clipboard.writeText(outputUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Head>
        <title>GitHub to CDN Converter | StaticDelivr</title>
        <meta name="description" content="Convert GitHub file URLs to StaticDelivr CDN URLs instantly. Get faster delivery and better performance for your GitHub-hosted assets." />
        <meta name="keywords" content="GitHub CDN, convert GitHub URL, GitHub to CDN, raw GitHub alternative, GitHub file delivery, CDN converter, faster GitHub files, StaticDelivr" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://staticdelivr.com/github" />

        <meta property="og:url" content="https://staticdelivr.com/github" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="GitHub to CDN Converter | StaticDelivr" />
        <meta property="og:description" content="Convert GitHub file URLs to StaticDelivr CDN URLs for faster delivery." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:site_name" content="StaticDelivr" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GitHub to CDN Converter | StaticDelivr" />
        <meta name="twitter:description" content="Convert GitHub file URLs to StaticDelivr CDN URLs for faster delivery." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "StaticDelivr GitHub Converter",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Convert GitHub file URLs to StaticDelivr CDN URLs for faster delivery",
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
      <AuroraBackground className="min-h-[80vh] flex items-center justify-center pt-16">
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-20">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium mb-8">
                <Github className="w-4 h-4" />
                GitHub to CDN
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight mb-6">
                Convert GitHub URLs to{" "}
                <span className="bg-gradient-to-r from-zinc-600 to-zinc-900 dark:from-zinc-300 dark:to-white bg-clip-text text-transparent">
                  CDN Links
                </span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Transform your GitHub file URLs into fast, globally-distributed CDN links. 
                Perfect for serving JavaScript, CSS, images, and other static assets.
              </p>
            </div>
          </BlurFade>

          {/* Converter Card */}
          <BlurFade delay={0.2} inView>
            <div className="max-w-2xl mx-auto">
              <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg">
                
                {/* Input Section */}
                <div className="p-6">
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://github.com/user/repo/blob/main/file.js"
                    className="w-full h-12 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 font-mono text-sm"
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
                  )}
                  
                  {/* Supported formats */}
                  <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
                    Supports: github.com/blob, github.com/raw, raw.githubusercontent.com
                  </div>
                </div>

                {/* Arrow indicator */}
                {outputUrl && (
                  <div className="flex justify-center py-2 bg-zinc-50 dark:bg-zinc-900/50">
                    <ArrowDown className="w-4 h-4 text-zinc-400" />
                  </div>
                )}

                {/* Output Section */}
                {outputUrl && (
                  <div className="p-6 bg-zinc-900">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                        CDN URL
                      </label>
                      <div className="flex items-center gap-2">
                        <a
                          href={outputUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Open
                        </a>
                        <button
                          onClick={copyToClipboard}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-xs font-medium text-zinc-900 dark:text-white transition-colors"
                        >
                          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-zinc-800 border border-zinc-700">
                      <code className="text-green-400 text-sm font-mono break-all">{outputUrl}</code>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </BlurFade>
        </div>
      </AuroraBackground>

      {/* Why Use Section */}
      <section className="py-20 px-4 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                Why Use a CDN for GitHub Files?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                GitHub isn't designed for serving production assets. Our CDN delivers your files faster and more reliably.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <BentoGrid className="lg:grid-cols-3 auto-rows-[16rem]">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </BlurFade>
        </div>
      </section>

      {/* URL Format Examples */}
      <section className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                URL Format
              </h2>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Structure</h3>
                <code className="block p-4 bg-zinc-900 rounded-lg text-sm font-mono">
                  <span className="text-zinc-400">https://cdn.staticdelivr.com</span>
                  <span className="text-blue-400">/gh</span>
                  <span className="text-green-400">/user</span>
                  <span className="text-yellow-400">/repo</span>
                  <span className="text-purple-400">/branch</span>
                  <span className="text-pink-400">/path/to/file</span>
                </code>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Examples</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Input (GitHub)</div>
                    <code className="block p-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-sm font-mono text-zinc-600 dark:text-zinc-300 break-all">
                      https://github.com/jquery/jquery/blob/main/dist/jquery.min.js
                    </code>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Output (CDN)</div>
                    <code className="block p-3 bg-zinc-900 rounded-lg text-sm font-mono text-green-400 break-all">
                      https://cdn.staticdelivr.com/gh/jquery/jquery/main/dist/jquery.min.js
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              Need to serve npm packages?
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              Check out our npm CDN for serving JavaScript libraries directly.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/npm"
                className="h-12 px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                npm CDN
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/docs/getting-started"
                className="h-12 px-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium flex items-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                View Docs
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GitHubPage;
