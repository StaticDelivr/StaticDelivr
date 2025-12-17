"use client";

import React, { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  ArrowRight, 
  Check, 
  Copy,
  Type,
  ExternalLink,
  Zap,
  Globe,
  Shield,
  Lock,
  ArrowDown
} from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { BentoCard, BentoGrid } from '@/components/ui/bento-grid';
import { BlurFade } from '@/components/ui/blur-fade';
import { CodeBlock } from '@/components/ui/code-block';

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

const LockBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <Lock className="w-32 h-32 text-green-500" />
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
    description: "Fonts served from the closest edge location for lightning-fast load times worldwide.",
    href: "/network",
    cta: "View Network",
    background: <GlobeBackground />,
    className: "lg:col-start-1 lg:col-end-2",
  },
  {
    Icon: Lock,
    name: "Privacy First",
    description: "No tracking, no cookies, no data collection. Your visitors' privacy is protected.",
    href: "/about",
    cta: "Learn More",
    background: <LockBackground />,
    className: "lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: Zap,
    name: "Drop-in Replacement",
    description: "Same syntax as Google Fonts. Just change the domain and you're done.",
    href: "/docs/getting-started",
    cta: "Get Started",
    background: <ZapBackground />,
    className: "lg:col-start-3 lg:col-end-4",
  },
];

const popularFonts = [
  { name: 'Inter', weights: '400;500;600;700' },
  { name: 'Roboto', weights: '400;500;700' },
  { name: 'Open Sans', weights: '400;600;700' },
  { name: 'Poppins', weights: '400;500;600;700' },
  { name: 'Lato', weights: '400;700' },
  { name: 'Montserrat', weights: '400;500;600;700' },
];

const GoogleFontsPage = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [outputUrl, setOutputUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convertUrl = useCallback((url: string): string => {
    if (!url.trim()) return '';

    const cdn = 'https://cdn.staticdelivr.com';

    // Google Fonts CSS2 URL
    const css2Match = url.match(/fonts\.googleapis\.com\/css2\?(.+)/);
    if (css2Match) {
      return `${cdn}/gfonts/css2?${css2Match[1]}`;
    }

    // Google Fonts CSS URL (legacy)
    const cssMatch = url.match(/fonts\.googleapis\.com\/css\?(.+)/);
    if (cssMatch) {
      return `${cdn}/gfonts/css?${cssMatch[1]}`;
    }

    throw new Error('Please enter a valid Google Fonts URL');
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

  const generateFontUrl = (font: typeof popularFonts[0]) => {
    const fontName = font.name.replace(/ /g, '+');
    return `https://cdn.staticdelivr.com/gfonts/css2?family=${fontName}:wght@${font.weights}&display=swap`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Head>
        <title>Google Fonts CDN | StaticDelivr</title>
        <meta name="description" content="Serve Google Fonts from StaticDelivr's global CDN. Privacy-first, no tracking, same API. Drop-in replacement for Google Fonts." />
        <meta name="keywords" content="Google Fonts CDN, privacy fonts, self-host Google Fonts, Google Fonts proxy, GDPR fonts, font CDN, StaticDelivr" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://staticdelivr.com/google-fonts" />

        <meta property="og:url" content="https://staticdelivr.com/google-fonts" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Google Fonts CDN | StaticDelivr" />
        <meta property="og:description" content="Serve Google Fonts from StaticDelivr's global CDN. Privacy-first, no tracking." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:site_name" content="StaticDelivr" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Google Fonts CDN | StaticDelivr" />
        <meta name="twitter:description" content="Serve Google Fonts from StaticDelivr's global CDN. Privacy-first, no tracking." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "StaticDelivr Google Fonts CDN",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Serve Google Fonts from a privacy-focused CDN",
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
                <Type className="w-4 h-4" />
                Google Fonts CDN
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight mb-6">
                Google Fonts,{" "}
                <span className="bg-gradient-to-r from-zinc-600 to-zinc-900 dark:from-zinc-300 dark:to-white bg-clip-text text-transparent">
                  Privacy First
                </span>
              </h1>

              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Serve Google Fonts from our global CDN without compromising your visitors' privacy. 
                Same syntax, better performance, no tracking.
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
                    Google Fonts URL
                  </label>
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600"
                    className="w-full h-12 px-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:focus:ring-zinc-600 font-mono text-sm"
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>
                  )}
                  
                  <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
                    Supports: fonts.googleapis.com/css2, fonts.googleapis.com/css
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
                Why Use StaticDelivr for Google Fonts?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Google Fonts can track your visitors. Our CDN serves the same fonts without any tracking or data collection.
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

      {/* Popular Fonts Section */}
      <section className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                Popular Fonts
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Click any font to copy its CDN URL. All 1,500+ Google Fonts are available.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularFonts.map((font) => (
                <button
                  key={font.name}
                  onClick={() => {
                    navigator.clipboard.writeText(generateFontUrl(font));
                  }}
                  className="group p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-semibold text-zinc-900 dark:text-white" style={{ fontFamily: font.name }}>
                      {font.name}
                    </span>
                    <Copy className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Weights: {font.weights.split(';').join(', ')}
                  </p>
                </button>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Usage Examples Section */}
      <section className="py-20 px-4 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <BlurFade delay={0.1} inView>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                How to Use
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Just replace the Google Fonts domain with ours. Everything else stays the same.
              </p>
            </div>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="space-y-8">
              {/* HTML Example */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">HTML Link Tag</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Add this to your HTML head section.
                  </p>
                  <CodeBlock 
                    code={`<link href="https://cdn.staticdelivr.com/gfonts/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">`}
                    language="html"
                  />
                </div>
              </div>

              {/* CSS Import Example */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">CSS @import</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Or import directly in your CSS file.
                  </p>
                  <CodeBlock 
                    code={`@import url('https://cdn.staticdelivr.com/gfonts/css2?family=Roboto:wght@400;500;700&display=swap');`}
                    language="css"
                  />
                </div>
              </div>

              {/* Multiple Fonts Example */}
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
                <div className="p-6">
                  <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-lg">Multiple Fonts</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    Load multiple font families in a single request.
                  </p>
                  <CodeBlock 
                    code={`<link href="https://cdn.staticdelivr.com/gfonts/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@500;700&display=swap" rel="stylesheet">`}
                    language="html"
                  />
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
              Ready to Switch?
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8">
              It takes less than a minute. Just find and replace the domain in your code.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs/getting-started"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-zinc-900 font-semibold rounded-lg hover:bg-zinc-100 transition-colors"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/migrate"
                className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 text-white font-semibold rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Migration Tools
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GoogleFontsPage;
