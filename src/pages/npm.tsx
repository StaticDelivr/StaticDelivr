"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  ArrowRight, 
  Check, 
  Copy,
  Zap, 
  Package,
  Code,
  Globe,
  Search,
  ExternalLink,
  Terminal,
  FileCode,
  Layers,
  GitBranch,
  BookOpen
} from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { BlurFade } from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';
import { ShineBorder } from '@/components/ui/shine-border';
import { CodeBlock } from '@/components/ui/code-block';

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
          className="h-8 rounded-md bg-orange-500 animate-pulse"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: "2s" }}
        />
      ))}
    </div>
    <Package className="absolute -bottom-4 -right-4 w-32 h-32 text-orange-500/30" />
  </div>
);

const CodeBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute top-4 left-4 text-blue-500 font-mono text-xs opacity-70">
        <div>import React from &apos;react&apos;;</div>
        <div>import {'{'} StaticDelivrImage {'}'}</div>
        <div className="ml-4">from &apos;staticdelivr&apos;;</div>
      </div>
      <Code className="absolute -bottom-8 -right-8 w-40 h-40 text-blue-500/20" />
    </div>
  </div>
);

const GlobeBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <div className="relative w-40 h-40">
      <div className="absolute inset-0 rounded-full border-2 border-green-500/30 animate-ping" style={{ animationDuration: "3s" }} />
      <div className="absolute inset-4 rounded-full border-2 border-green-500/40 animate-ping" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
      <div className="absolute inset-8 rounded-full border-2 border-green-500/50" />
      <div className="absolute inset-12 rounded-full bg-gradient-to-br from-green-400 to-green-600" />
    </div>
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

const TerminalBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-15">
    <div className="absolute top-4 left-4 right-4 font-mono text-xs text-emerald-500">
      <div>$ npm install staticdelivr</div>
      <div className="mt-1 text-emerald-400">+ staticdelivr@1.0.0</div>
      <div className="mt-1 text-emerald-300">added 1 package</div>
    </div>
    <Terminal className="absolute -bottom-4 -right-4 w-32 h-32 text-emerald-500/30" />
  </div>
);

const features = [
  {
    Icon: Package,
    name: "Any npm Package",
    description: "Access any package from npm instantly. React, Vue, Angular, or any of the 2M+ packages available.",
    href: "/docs/api-tools",
    cta: "View API Docs",
    background: <PackageBackground />,
    className: "lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: Code,
    name: "React Component",
    description: "Use our StaticDelivrImage component for automatic image optimization in your React and Next.js apps.",
    href: "/docs/frontend-usage",
    cta: "See Examples",
    background: <CodeBackground />,
    className: "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Globe,
    name: "570+ Edge Locations",
    description: "Your packages served from the closest edge location. Sub-50ms latency worldwide.",
    href: "/network",
    cta: "View Network",
    background: <GlobeBackground />,
    className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: Layers,
    name: "Version Pinning",
    description: "Pin to any version with semantic versioning. Use @latest, @^1.0.0, or exact versions.",
    href: "/docs/api-tools",
    cta: "Learn More",
    background: <LayersBackground />,
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
  },
  {
    Icon: Terminal,
    name: "npm Package Library",
    description: "Install our npm package for React projects. Automatic CDN URL generation and image optimization.",
    href: "/docs/frontend-usage",
    cta: "npm install staticdelivr",
    background: <TerminalBackground />,
    className: "lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
];

// Popular packages for quick selection
const popularPackages = [
  { name: 'react', version: '18.2.0', file: 'umd/react.production.min.js' },
  { name: 'vue', version: '3.4.21', file: 'dist/vue.global.prod.js' },
  { name: 'lodash', version: '4.17.21', file: 'lodash.min.js' },
  { name: 'axios', version: '1.6.7', file: 'dist/axios.min.js' },
  { name: 'jquery', version: '3.7.1', file: 'dist/jquery.min.js' },
  { name: 'moment', version: '2.30.1', file: 'min/moment.min.js' },
];

const NpmPage = () => {
  const [packageInput, setPackageInput] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [scriptCopied, setScriptCopied] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ name: string; description: string; version: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search for npm packages
  useEffect(() => {
    const searchPackages = async () => {
      const searchTerm = packageInput.split('@')[0].split('/')[0];
      if (!searchTerm || searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(searchTerm)}&size=6`
        );
        if (response.ok) {
          const data = await response.json();
          setSuggestions(
            data.objects.map((obj: { package: { name: string; description: string; version: string } }) => ({
              name: obj.package.name,
              description: obj.package.description || '',
              version: obj.package.version,
            }))
          );
        }
      } catch (error) {
        console.error('Error searching npm:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchPackages, 300);
    return () => clearTimeout(debounceTimer);
  }, [packageInput]);

  // Generate CDN URL from package input
  const generateCdnUrl = useCallback((input: string) => {
    if (!input.trim()) {
      setGeneratedUrl('');
      return;
    }

    // Parse the input - could be "package", "package@version", or "package@version/file"
    let packageName = input.trim();
    let version = 'latest';
    let file = '';

    // Check for version
    const atIndex = packageName.indexOf('@', packageName.startsWith('@') ? 1 : 0);
    if (atIndex !== -1) {
      const afterAt = packageName.substring(atIndex + 1);
      const slashIndex = afterAt.indexOf('/');
      if (slashIndex !== -1) {
        version = afterAt.substring(0, slashIndex);
        file = afterAt.substring(slashIndex + 1);
      } else {
        version = afterAt;
      }
      packageName = packageName.substring(0, atIndex);
    }

    // Build the URL
    let url = `https://cdn.staticdelivr.com/npm/${packageName}@${version}`;
    if (file) {
      url += `/${file}`;
    }

    setGeneratedUrl(url);
  }, []);

  useEffect(() => {
    generateCdnUrl(packageInput);
  }, [packageInput, generateCdnUrl]);

  const copyUrl = () => {
    if (generatedUrl) {
      navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyScriptTag = () => {
    if (generatedUrl) {
      const scriptTag = `<script src="${generatedUrl}"></script>`;
      navigator.clipboard.writeText(scriptTag);
      setScriptCopied(true);
      setTimeout(() => setScriptCopied(false), 2000);
    }
  };

  const selectPopularPackage = (pkg: typeof popularPackages[0]) => {
    setPackageInput(`${pkg.name}@${pkg.version}/${pkg.file}`);
    setShowSuggestions(false);
  };

  const selectSuggestion = (suggestion: { name: string; version: string }) => {
    setPackageInput(`${suggestion.name}@${suggestion.version}`);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Head>
        <title>NPM CDN | StaticDelivr - The Developer-First CDN for React & Vue</title>
        <meta name="description" content="Free npm CDN for developers. Instantly serve any npm package via our global CDN. React, Vue, Angular and 2M+ packages. No build step required." />
        <meta name="keywords" content="npm CDN, free npm CDN, JavaScript CDN, React CDN, Vue CDN, package CDN, unpkg alternative, jsdelivr alternative, esm CDN, module CDN" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="canonical" href="https://staticdelivr.com/npm" />
        
        {/* Open Graph */}
        <meta property="og:url" content="https://staticdelivr.com/npm" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NPM CDN | StaticDelivr" />
        <meta property="og:description" content="The developer-first CDN for React & Vue. Serve any npm package via our global CDN." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-npm.png" />
        <meta property="og:site_name" content="StaticDelivr" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NPM CDN | StaticDelivr" />
        <meta name="twitter:description" content="The developer-first CDN for React & Vue. Serve any npm package via our global CDN." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-npm.png" />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "StaticDelivr NPM CDN",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Free CDN for npm packages. Serve any npm package with a simple URL structure.",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "ratingCount": "1000",
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-medium mb-8">
              <Package className="w-4 h-4" />
              2M+ Packages Available
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight mb-6">
              The Developer-First<br />
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                CDN for React & Vue
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto mb-10">
              Instantly serve any npm package via our global CDN. 
              No build step, no configuration—just paste and go.
            </p>
          </BlurFade>

          {/* Interactive Package Search */}
          <BlurFade delay={0.2} inView>
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative">
                <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl">
                  <ShineBorder
                    className="text-center text-2xl font-bold capitalize"
                    shineColor={["#F97316", "#EF4444", "#EC4899"]}
                    borderWidth={1.5}
                  />
                  
                  {/* Input Section */}
                  <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                      <Search className="w-4 h-4" />
                      Enter package name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={packageInput}
                        onChange={(e) => {
                          setPackageInput(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        placeholder="e.g., react@18.2.0/umd/react.production.min.js"
                        className="w-full h-14 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
                      />

                      {/* Autocomplete Suggestions Dropdown */}
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl z-50 overflow-hidden">
                          {isSearching && (
                            <div className="px-4 py-2 text-sm text-zinc-500">Searching...</div>
                          )}
                          {suggestions.map((suggestion) => (
                            <button
                              key={suggestion.name}
                              onMouseDown={() => selectSuggestion(suggestion)}
                              className="w-full flex items-start gap-3 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left border-b border-zinc-100 dark:border-zinc-800 last:border-b-0"
                            >
                              <Package className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-zinc-900 dark:text-white">{suggestion.name}</span>
                                  <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                                    v{suggestion.version}
                                  </span>
                                </div>
                                {suggestion.description && (
                                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                                    {suggestion.description}
                                  </p>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Popular Packages */}
                  <div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                      <Zap className="w-3 h-3" />
                      Popular packages
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularPackages.map((pkg) => (
                        <button
                          key={pkg.name}
                          onClick={() => selectPopularPackage(pkg)}
                          className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                        >
                          {pkg.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generated URL */}
                  {generatedUrl && (
                    <div className="p-6 bg-zinc-950">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">CDN URL</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={copyUrl}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                          >
                            {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                            {copied ? 'Copied!' : 'Copy URL'}
                          </button>
                          <a
                            href={generatedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Open
                          </a>
                        </div>
                      </div>
                      <code className="block p-3 rounded-lg bg-zinc-900 text-green-400 text-sm font-mono break-all">
                        {generatedUrl}
                      </code>

                      {/* Script tag helper */}
                      <div className="mt-4 pt-4 border-t border-zinc-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Script Tag</span>
                          <button
                            onClick={copyScriptTag}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-zinc-300 hover:text-white transition-colors"
                          >
                            {scriptCopied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                            {scriptCopied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                        <code className="block p-3 rounded-lg bg-zinc-900 text-sm font-mono break-all">
                          <span className="text-blue-400">&lt;script</span> <span className="text-purple-400">src</span>=<span className="text-green-400">&quot;{generatedUrl}&quot;</span><span className="text-blue-400">&gt;&lt;/script&gt;</span>
                        </code>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Quick Stats */}
          <BlurFade delay={0.3} inView>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-zinc-200 dark:border-zinc-800 pt-10">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">2M+</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Packages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">570+</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Edge PoPs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">&lt;50ms</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Latency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">100%</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Free</div>
              </div>
            </div>
          </BlurFade>
        </div>
      </AuroraBackground>

      {/* URL Structure Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-slate-50 dark:from-zinc-950 dark:to-zinc-900">
        <div className="max-w-5xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                <Code className="w-4 h-4" />
                URL Structure
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                Simple, Predictable{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  URLs
                </span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Just construct the URL and you&apos;re done. No API keys, no registration.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="space-y-6">
              {/* npm URL Structure */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg flex items-center gap-2">
                    <Package className="w-5 h-5 text-orange-500" />
                    npm Packages
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Access any file from any npm package
                  </p>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/npm/package@version/file"
                    language="url"
                  />
                  <div className="mt-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                    <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Examples:</h4>
                    <div className="space-y-2 font-mono text-sm">
                      <div className="text-zinc-600 dark:text-zinc-400">
                        <span className="text-orange-500">react@18.2.0</span> → /npm/react@18.2.0/umd/react.production.min.js
                      </div>
                      <div className="text-zinc-600 dark:text-zinc-400">
                        <span className="text-orange-500">lodash@latest</span> → /npm/lodash@latest/lodash.min.js
                      </div>
                      <div className="text-zinc-600 dark:text-zinc-400">
                        <span className="text-orange-500">@scope/pkg</span> → /npm/@scope/pkg@version/file.js
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GitHub URL Structure */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg flex items-center gap-2">
                    <GitBranch className="w-5 h-5 text-purple-500" />
                    GitHub Repositories
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Serve any file from any public GitHub repo
                  </p>
                  <CodeBlock 
                    code="https://cdn.staticdelivr.com/gh/user/repo/branch/file"
                    language="url"
                  />
                  <div className="mt-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                    <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Examples:</h4>
                    <div className="space-y-2 font-mono text-sm">
                      <div className="text-zinc-600 dark:text-zinc-400">
                        <span className="text-purple-500">jquery/jquery</span> → /gh/jquery/jquery/3.6.4/dist/jquery.min.js
                      </div>
                      <div className="text-zinc-600 dark:text-zinc-400">
                        <span className="text-purple-500">twbs/bootstrap</span> → /gh/twbs/bootstrap/v5.3.0/dist/css/bootstrap.min.css
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* npm Package Section */}
      <section className="py-24 px-4 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-4">
                <Terminal className="w-4 h-4" />
                npm Package
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                Built for{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  React Developers
                </span>
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Install our npm package for automatic image optimization with the StaticDelivrImage component.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Installation */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 text-lg">Installation</h3>
                  <CodeBlock 
                    code="npm install staticdelivr"
                    language="bash"
                  />
                  <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                    Or with yarn: <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">yarn add staticdelivr</code>
                  </p>
                </div>
              </div>

              {/* Usage */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 text-lg">Basic Usage</h3>
                  <CodeBlock 
                    code={`import { StaticDelivrImage } from 'staticdelivr';

<StaticDelivrImage
  src="https://example.com/image.jpg"
  width={800}
  quality={80}
  format="webp"
/>`}
                    language="jsx"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/docs/frontend-usage"
                className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium hover:underline"
              >
                <BookOpen className="w-4 h-4" />
                View full documentation
                <ArrowRight className="w-4 h-4" />
              </Link>
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
                  Modern Development
                </span>
              </h2>
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
      <section className="py-24 px-4 bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <BlurFade delay={0.1} inView>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Serving Packages Today
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              No registration required. Just construct your URL and start serving packages from our global CDN.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs/getting-started"
                className="h-14 px-10 rounded-full bg-white text-zinc-900 font-semibold flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/docs/api-tools"
                className="h-14 px-8 rounded-full bg-white/10 border border-white/30 text-white font-medium flex items-center gap-2 hover:bg-white/20 transition-colors backdrop-blur-sm"
              >
                <BookOpen className="w-5 h-5" />
                API Documentation
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NpmPage;
