"use client";

import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  ArrowRight, 
  Check, 
  Copy,
  RefreshCw,
  ExternalLink,
  Zap,
  Globe,
  Shield,
  ArrowDown,
  Package
} from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { BlurFade } from '@/components/ui/blur-fade';
import { CodeBlock } from '@/components/ui/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
      <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping" style={{ animationDuration: "3s" }} />
      <div className="absolute inset-4 rounded-full border-2 border-blue-500/40 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
      <div className="absolute inset-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
    </div>
  </div>
);

const ShieldBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <Shield className="w-32 h-32 text-green-500" />
  </div>
);

const ZapBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <Zap className="w-32 h-32 text-yellow-500" />
  </div>
);

const features = [
  {
    Icon: Globe,
    name: "570+ Global PoPs",
    description: "Multi-CDN infrastructure with automatic failover ensures your assets are always available.",
    href: "/network",
    cta: "View Network",
    background: <GlobeBackground />,
    className: "lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: Shield,
    name: "99.99% Uptime",
    description: "If one CDN provider fails, traffic automatically routes to another. Your assets stay online.",
    href: "/about",
    cta: "Our Infrastructure",
    background: <ShieldBackground />,
    className: "lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Zap,
    name: "Same URL Structure",
    description: "Simple domain swap. Your existing paths work exactly the same way.",
    href: "/docs/getting-started",
    cta: "Get Started",
    background: <ZapBackground />,
    className: "lg:col-start-3 lg:col-end-4",
  },
];

type CDNSource = 'jsdelivr' | 'unpkg' | 'npmjs';

const MigratePage = () => {
  const [activeTab, setActiveTab] = useState<CDNSource>('jsdelivr');
  const [inputUrl, setInputUrl] = useState('');
  const [outputUrl, setOutputUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convertUrl = useCallback((url: string, source: CDNSource): string => {
    if (!url.trim()) return '';

    const cdn = 'https://cdn.staticdelivr.com';

    if (source === 'jsdelivr') {
      // jsDelivr npm: https://cdn.jsdelivr.net/npm/package@version/file
      const npmMatch = url.match(/cdn\.jsdelivr\.net\/npm\/([^/]+)(?:@([^/]+))?(?:\/(.+))?/);
      if (npmMatch) {
        const [, pkg, version, file] = npmMatch;
        const versionPart = version ? `@${version}` : '';
        const filePart = file ? `/${file}` : '';
        return `${cdn}/npm/${pkg}${versionPart}${filePart}`;
      }

      // jsDelivr gh: https://cdn.jsdelivr.net/gh/user/repo@version/file
      const ghMatch = url.match(/cdn\.jsdelivr\.net\/gh\/([^/]+)\/([^@/]+)(?:@([^/]+))?(?:\/(.+))?/);
      if (ghMatch) {
        const [, user, repo, version, file] = ghMatch;
        const branch = version || 'main';
        const filePart = file || '';
        return `${cdn}/gh/${user}/${repo}/${branch}/${filePart}`;
      }

      throw new Error('Please enter a valid jsDelivr URL');
    }

    if (source === 'unpkg') {
      // unpkg: https://unpkg.com/package@version/file
      const match = url.match(/unpkg\.com\/([^/]+)(?:@([^/]+))?(?:\/(.+))?/);
      if (match) {
        const [, pkg, version, file] = match;
        const versionPart = version ? `@${version}` : '';
        const filePart = file ? `/${file}` : '';
        return `${cdn}/npm/${pkg}${versionPart}${filePart}`;
      }

      throw new Error('Please enter a valid unpkg URL');
    }

    if (source === 'npmjs') {
      // npmjs CDN: https://registry.npmjs.org/package/-/package-version.tgz
      // or direct file references - convert to our npm format
      const registryMatch = url.match(/registry\.npmjs\.org\/([^/]+)/);
      if (registryMatch) {
        const [, pkg] = registryMatch;
        return `${cdn}/npm/${pkg}`;
      }

      // npmjs package page: https://www.npmjs.com/package/packagename
      const pageMatch = url.match(/(?:www\.)?npmjs\.com\/package\/([^/?#]+)/);
      if (pageMatch) {
        const [, pkg] = pageMatch;
        return `${cdn}/npm/${pkg}`;
      }

      throw new Error('Please enter a valid npm URL');
    }

    throw new Error('Unknown source');
  }, []);

  useEffect(() => {
    if (!inputUrl.trim()) {
      setOutputUrl('');
      setError('');
      return;
    }

    try {
      const result = convertUrl(inputUrl, activeTab);
      setOutputUrl(result);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid URL');
      setOutputUrl('');
    }
  }, [inputUrl, activeTab, convertUrl]);

  const copyToClipboard = () => {
    if (outputUrl) {
      navigator.clipboard.writeText(outputUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getPlaceholder = (source: CDNSource) => {
    switch (source) {
      case 'jsdelivr':
        return 'https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js';
      case 'unpkg':
        return 'https://unpkg.com/react@18.2.0/umd/react.production.min.js';
      case 'npmjs':
        return 'https://www.npmjs.com/package/react';
    }
  };

  const getSupportedFormats = (source: CDNSource) => {
    switch (source) {
      case 'jsdelivr':
        return 'cdn.jsdelivr.net/npm/*, cdn.jsdelivr.net/gh/*';
      case 'unpkg':
        return 'unpkg.com/*';
      case 'npmjs':
        return 'npmjs.com/package/*, registry.npmjs.org/*';
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Head>
        <title>Migrate to StaticDelivr | CDN Migration Tool</title>
        <meta name="description" content="Migrate from jsDelivr, unpkg, or npmjs to StaticDelivr. Convert your CDN URLs instantly with our free migration tool." />
        <meta name="keywords" content="CDN migration, jsDelivr alternative, unpkg alternative, migrate CDN, CDN converter, StaticDelivr migration" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://staticdelivr.com/migrate" />

        <meta property="og:url" content="https://staticdelivr.com/migrate" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Migrate to StaticDelivr | CDN Migration Tool" />
        <meta property="og:description" content="Convert your jsDelivr, unpkg, or npmjs URLs to StaticDelivr instantly." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:site_name" content="StaticDelivr" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Migrate to StaticDelivr | CDN Migration Tool" />
        <meta name="twitter:description" content="Convert your jsDelivr, unpkg, or npmjs URLs to StaticDelivr instantly." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "StaticDelivr Migration Tool",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Migrate from jsDelivr, unpkg, or npmjs to StaticDelivr CDN",
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
                <RefreshCw className="w-4 h-4" />
                Migration Tool
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight mb-6">
                Migrate to{" "}
                <span className="bg-gradient-to-r from-zinc-600 to-zinc-900 dark:from-zinc-300 dark:to-white bg-clip-text text-transparent">
                  StaticDelivr
                </span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Convert your existing CDN URLs from jsDelivr, unpkg, or npm to StaticDelivr. 
                Same files, better infrastructure.
              </p>
            </div>
          </BlurFade>

          {/* Converter Card */}
          <BlurFade delay={0.2} inView>
            <div className="max-w-2xl mx-auto">
              <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-lg">
                
                {/* Source Tabs */}
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
                  <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v as CDNSource); setInputUrl(''); }}>
                    <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                      <TabsTrigger 
                        value="jsdelivr"
                        className="py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm rounded-md transition-all text-sm font-medium"
                      >
                        jsDelivr
                      </TabsTrigger>
                      <TabsTrigger 
                        value="unpkg"
                        className="py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm rounded-md transition-all text-sm font-medium"
                      >
                        unpkg
                      </TabsTrigger>
                      <TabsTrigger 
                        value="npmjs"
                        className="py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm rounded-md transition-all text-sm font-medium"
                      >
                        npm
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Input Section */}
                <div className="p-6">
                  <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
                    {activeTab === 'jsdelivr' && 'jsDelivr URL'}
                    {activeTab === 'unpkg' && 'unpkg URL'}
                    {activeTab === 'npmjs' && 'npm URL'}
                  </label>
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder={getPlaceholder(activeTab)}
                    className="w-full h-12 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 font-mono text-sm"
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
                  )}
                  
                  <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
                    Supports: {getSupportedFormats(activeTab)}
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
                        StaticDelivr URL
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

      {/* Why Migrate Section */}
      <section className="py-20 px-4 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                Why Migrate to StaticDelivr?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Multi-CDN redundancy means your assets are always available, even if one provider goes down.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <BentoGrid className="lg:grid-cols-3">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
          </BlurFade>
        </div>
      </section>

      {/* URL Mapping Section */}
      <section className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                URL Mapping Reference
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Simple find-and-replace patterns to migrate your codebase.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="space-y-6">
              {/* jsDelivr npm */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 text-lg">jsDelivr npm → StaticDelivr</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Before</span>
                      <CodeBlock code="https://cdn.jsdelivr.net/npm/package@version/file" language="url" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">After</span>
                      <CodeBlock code="https://cdn.staticdelivr.com/npm/package@version/file" language="url" />
                    </div>
                  </div>
                </div>
              </div>

              {/* jsDelivr gh */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 text-lg">jsDelivr GitHub → StaticDelivr</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Before</span>
                      <CodeBlock code="https://cdn.jsdelivr.net/gh/user/repo@version/file" language="url" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">After</span>
                      <CodeBlock code="https://cdn.staticdelivr.com/gh/user/repo/version/file" language="url" />
                    </div>
                  </div>
                </div>
              </div>

              {/* unpkg */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 text-lg">unpkg → StaticDelivr</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">Before</span>
                      <CodeBlock code="https://unpkg.com/package@version/file" language="url" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase">After</span>
                      <CodeBlock code="https://cdn.staticdelivr.com/npm/package@version/file" language="url" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Start Your Migration
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
              Our documentation has everything you need to make a seamless transition.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs/getting-started"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 font-semibold rounded-lg hover:bg-zinc-100 transition-colors"
              >
                Read the Docs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/github"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
              >
                GitHub Converter
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MigratePage;
