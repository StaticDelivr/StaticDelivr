import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Package, Download, Terminal,
  Code, Zap, Layers, Image as ImageIcon,
  Copy, Check, ArrowRight, Star, TrendingUp, Calendar
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';

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

// --- Simple Code Snippet Component ---
const CodeSnippet = ({ code, language = 'bash' }: { code: string, language?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-lg group">
      <div className="flex items-center justify-between px-4 py-2 bg-zinc-950/50 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
        </div>
        <span className="text-[10px] uppercase font-medium text-zinc-500">{language}</span>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm text-zinc-300">
          <code>{code}</code>
        </pre>
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-2.5 right-3 p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>
    </div>
  );
};

interface NpmStats {
  weekly: number;
  monthly: number;
  yearly: number;
  lastUpdated: string;
}

interface PackagePageProps {
  npmStats?: NpmStats;
  versions?: {
    npm: string;
  };
}

const PackagePage: React.FC<PackagePageProps> = ({ npmStats, versions }) => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-emerald-500/30 font-sans">
      <NextSeo
        title="React Image Component | StaticDelivr"
        description="Automatic image optimization for React. Drop-in replacement for next/image with AVIF/WebP support and global edge delivery."
        canonical="https://staticdelivr.com/package"
        openGraph={{
          url: 'https://staticdelivr.com/package',
          title: 'React Image Component | StaticDelivr',
          description: 'Automatic image optimization for React. Drop-in replacement for next/image with AVIF/WebP support and global edge delivery.',
        }}
      />

      <Header />

      <main className="relative pt-32 pb-20 overflow-hidden">

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* --- Hero Section --- */}
        <section className="px-6 mb-24 relative z-10">
          <div className="max-w-5xl mx-auto text-center">

            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                <Package className="w-3 h-3" />
                <span>$ npm install staticdelivr</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                Image optimization<br />
                <span className="text-zinc-400 dark:text-zinc-600">made simple.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                A lightweight React component for automatic WebP/AVIF conversion, resizing, and global CDN delivery. No complex config required.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="https://www.npmjs.com/package/staticdelivr"
                target="_blank"
                className="h-12 px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium flex items-center hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4 mr-2" /> View on NPM
              </Link>
              <Link
                href="/docs/frontend-usage"
                className="h-12 px-8 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                Read Documentation
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* --- Stats Grid --- */}
        <section className="px-6 mb-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Stat 1 */}
              <FadeIn delay={0.1} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center text-center">
                <div className="mb-4 w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-1">
                  {(npmStats?.yearly || 54067).toLocaleString()}+
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Total Downloads</div>
              </FadeIn>

              {/* Stat 2 */}
              <FadeIn delay={0.2} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center text-center">
                <div className="mb-4 w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-500">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-1">
                  {(npmStats?.monthly || 5150).toLocaleString()}+
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Monthly Downloads</div>
              </FadeIn>

              {/* Stat 3 */}
              <FadeIn delay={0.3} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center text-center">
                <div className="mb-4 w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center text-purple-600 dark:text-purple-500">
                  <Star className="w-6 h-6" />
                </div>
                <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-1">{versions?.npm || 'v1.0.0'}</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Stable Release</div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* --- Installation & Usage --- */}
        <section className="px-6 mb-32">
          <div className="max-w-5xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">Get Started in Seconds</h2>
              <p className="text-zinc-500 dark:text-zinc-400">No API keys. No build steps. Just install and import.</p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 items-start">

              {/* Installation */}
              <FadeIn delay={0.1}>
                <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-white font-medium">
                  <Terminal className="w-5 h-5 text-emerald-500" />
                  <h3>1. Install Package</h3>
                </div>
                <CodeSnippet code="npm install staticdelivr" language="bash" />
                <div className="mt-4 text-xs text-zinc-500">
                  Also supports <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">yarn</code> and <code className="bg-zinc-100 dark:bg-zinc-800 px-1 py-0.5 rounded">pnpm</code>
                </div>
              </FadeIn>

              {/* Usage */}
              <FadeIn delay={0.2}>
                <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-white font-medium">
                  <Code className="w-5 h-5 text-blue-500" />
                  <h3>2. Drop in Component</h3>
                </div>
                <CodeSnippet
                  language="jsx"
                  code={`import { StaticDelivrImage } from 'staticdelivr';

export default function Page() {
  return (
    <StaticDelivrImage
      src="https://example.com/hero.jpg"
      width={800}
      height={600}
      alt="Optimized hero image"
    />
  );
}`}
                />
              </FadeIn>

            </div>
          </div>
        </section>

        {/* --- Features Grid --- */}
        <section className="px-6 mb-32">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="mb-12">
              <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">Why use the component?</h2>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Feature 1 */}
              <FadeIn delay={0.1} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Automatic Optimization</h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  We automatically convert images to modern formats like WebP or AVIF based on the user's browser support, often reducing file size by 60-80%.
                </p>
              </FadeIn>

              {/* Feature 2 */}
              <FadeIn delay={0.2} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-500 mb-6">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Framework Agnostic</h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  While it works perfectly as a drop-in replacement for <code>next/image</code>, it is compatible with standard React, Vite, Remix, and Gatsby.
                </p>
              </FadeIn>

              {/* Feature 3 */}
              <FadeIn delay={0.3} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center text-purple-600 dark:text-purple-500 mb-6">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">TypeScript Ready</h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Written in TypeScript from the ground up. Get full autocomplete for props like <code>quality</code>, <code>format</code>, and <code>fit</code>.
                </p>
              </FadeIn>

              {/* Feature 4 */}
              <FadeIn delay={0.4} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center text-orange-600 dark:text-orange-500 mb-6">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">On-the-fly Resizing</h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Request specific dimensions using <code>width</code> and <code>height</code> props. We process resizing at the edge before caching the result.
                </p>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="px-6 pb-24 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 p-12 md:p-20 text-center shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#27272a_0%,_transparent_70%)] opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                  Ready to optimize?
                </h2>
                <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
                  Join thousands of developers using StaticDelivr to serve faster images.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="https://www.npmjs.com/package/staticdelivr" target="_blank" className="h-12 px-8 rounded-full bg-white text-zinc-900 font-medium flex items-center hover:bg-zinc-200 transition-colors">
                    Install Package <Download className="w-4 h-4 ml-2" />
                  </Link>
                  <Link href="/docs/frontend-usage" className="h-12 px-8 rounded-full border border-zinc-700 text-white font-medium flex items-center hover:bg-zinc-800 transition-colors">
                    Read Docs <ArrowRight className="w-4 h-4 ml-2" />
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

export default PackagePage;

// --- ISR Data Fetching ---
export async function getStaticProps() {
  try {
    const [weeklyRes, monthlyRes, yearlyRes, npmVersionRes] = await Promise.all([
      fetch('https://api.npmjs.org/downloads/point/last-week/staticdelivr'),
      fetch('https://api.npmjs.org/downloads/point/last-month/staticdelivr'),
      fetch('https://api.npmjs.org/downloads/point/last-year/staticdelivr'),
      fetch('https://registry.npmjs.org/staticdelivr')
    ]);

    const [weekly, monthly, yearly, npmData] = await Promise.all([
      weeklyRes.json(),
      monthlyRes.json(),
      yearlyRes.json(),
      npmVersionRes.json()
    ]);

    return {
      props: {
        npmStats: {
          weekly: weekly.downloads || 1200,
          monthly: monthly.downloads || 5000,
          yearly: yearly.downloads || 54000,
          lastUpdated: new Date().toISOString()
        },
        versions: {
          npm: npmData?.['dist-tags']?.latest ? `v${npmData['dist-tags'].latest}` : 'v1.0.0'
        }
      },
      revalidate: 86400 // Revalidate once per day
    };
  } catch (error) {
    console.error('Failed to fetch npm stats:', error);
    // Fallback data
    return {
      props: {
        npmStats: {
          weekly: 1200,
          monthly: 5100,
          yearly: 54000,
          lastUpdated: new Date().toISOString()
        },
        versions: {
          npm: 'v1.0.0'
        }
      },
      revalidate: 86400
    };
  }
}