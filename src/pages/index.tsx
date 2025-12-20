import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Terminal, ArrowRight, Heart, Zap, Globe,
    Package, Shield, GitBranch, Copy, Check,
    Activity, Leaf, ExternalLink, Code2, Sparkles,
    Server, Cpu
} from 'lucide-react';
import { SiNpm, SiWordpress, SiReact, SiGooglefonts, SiGithub } from 'react-icons/si';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from '@/components/ui/code-block';

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

// --- Number Ticker ---
const NumberTicker = ({ value }: { value: number }) => (
    <span className="tabular-nums tracking-tight">
        {new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)}
    </span>
);

// --- Data Fetching ---
interface HomePageProps {
    stats: { requests: number };
    versions: { npm: string; wordpress: string };
}

export async function getStaticProps() {
    const props: HomePageProps = {
        stats: { requests: 800000000 },
        versions: { npm: 'v1.0.0', wordpress: 'v1.3.0' }
    };

    try {
        const statsRes = await fetch('https://stats.staticdelivr.com/api/stats?month=previous');
        const statsData = await statsRes.json();
        if (statsData?.total?.requests) {
            props.stats.requests = statsData.total.requests;
        }

        const npmRes = await fetch('https://registry.npmjs.org/staticdelivr');
        const npmData = await npmRes.json();
        if (npmData?.['dist-tags']?.latest) {
            props.versions.npm = `v${npmData['dist-tags'].latest}`;
        }

        const wpRes = await fetch('https://api.wordpress.org/plugins/info/1.0/staticdelivr.json');
        const wpData = await wpRes.json();
        if (wpData?.version) {
            props.versions.wordpress = `v${wpData.version}`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    return { props, revalidate: 2592000 };
}

// --- Rotating Words Component ---
const words = ["npm packages", "GitHub files", "WordPress plugins", "Google Fonts"];

const RotatingWords = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="inline-flex justify-center min-w-[140px]">
            <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="font-semibold text-zinc-900 dark:text-white truncate"
            >
                {words[index]}
            </motion.span>
        </span>
    );
};

// --- Terminal Visual ---
// Adapted from about.tsx for the home page (interactive-looking)
const TerminalHero = () => {
    const [copied, setCopied] = useState(false);
    const codeSnippet = 'https://cdn.staticdelivr.com/npm/react@18.2.0/umd/react.production.min.js';

    const copyToClipboard = () => {
        navigator.clipboard.writeText(codeSnippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-900 shadow-2xl font-mono text-sm max-w-2xl mx-auto">
            <div className="h-10 bg-zinc-800 border-b border-zinc-700 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 text-zinc-400 text-xs hidden sm:block">
                    bash — 80x24
                </div>
                <button
                    onClick={copyToClipboard}
                    aria-label="Copy code snippet"
                    className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
            </div>
            <div className="p-6 space-y-4">
                <div className="flex flex-wrap gap-2 text-zinc-300">
                    <span className="text-emerald-400 font-bold">➜</span>
                    <span className="text-blue-400">~</span>
                    <span>curl -I</span>
                    <span className="break-all">{codeSnippet}</span>
                </div>
                <div className="space-y-1 text-zinc-400">
                    <div>HTTP/2 200 OK</div>
                    <div>content-type: application/javascript</div>
                    <div>cache-control: public, max-age=31536000, immutable</div>
                    <div className="text-emerald-400">x-cache: HIT</div>
                    <div className="text-emerald-400">x-served-by: staticdelivr-edge-syd1</div>
                    <div>timing-allow-origin: *</div>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-4 bg-zinc-500"
                />
            </div>
        </div>
    );
}

import { NextSeo, SoftwareAppJsonLd, OrganizationJsonLd } from 'next-seo';

// --- Main Page Component ---
const HomePage: React.FC<HomePageProps> = ({ stats, versions }) => {

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-emerald-500/30 font-sans">
            <NextSeo
                title="StaticDelivr - The Free Open Source CDN"
                description="A free, fast, and transparent CDN for open source projects. Serve npm packages, GitHub files, WordPress plugins, and Google Fonts from 570+ global edge nodes."
                canonical="https://staticdelivr.com"
                openGraph={{
                    url: 'https://staticdelivr.com',
                    title: 'StaticDelivr - Infrastructure for Open Source',
                    description: 'Serve your npm packages, GitHub files, and WordPress plugins with lightning-fast global delivery. Always free, always fast.',
                    images: [
                        {
                            url: 'https://staticdelivr.com/assets/img/og-image.png',
                            width: 1200,
                            height: 630,
                            alt: 'StaticDelivr - The Free Open Source CDN',
                        },
                    ],
                }}
            />

            <OrganizationJsonLd
                url="https://staticdelivr.com"
                logo="https://staticdelivr.com/assets/img/icons/favicon.svg"
                name="StaticDelivr"
                sameAs={[
                    'https://twitter.com/staticdelivr',
                    'https://github.com/StaticDelivr/StaticDelivr',
                ]}
            />

            <SoftwareAppJsonLd
                name="StaticDelivr CDN"
                price="0.00"
                priceCurrency="USD"
                aggregateRating={{ ratingValue: '4.9', ratingCount: '120' }}
                operatingSystem="Web"
                applicationCategory="DeveloperApplication"
            />

            {/* Inline Styles for Gradient Animation */}
            <style jsx>{`
                @keyframes aurora {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-aurora {
                    background-size: 200% auto;
                    animation: aurora 5s linear infinite;
                    will-change: background-position;
                }
            `}</style>
            <Header />

            <main className="relative pt-32 pb-20 overflow-hidden">

                {/* Background Gradients (Borrowed from About Page for consistency) */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

                {/* --- Hero Section --- */}
                <section className="px-6 mb-24 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">

                        {/* CLI Badge */}
                        <FadeIn>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-800 dark:text-zinc-300 mb-8">
                                <Terminal className="w-3 h-3" />
                                <span>$ staticdelivr --home</span>
                            </div>
                        </FadeIn>

                        {/* Headline */}
                        <FadeIn delay={0.1}>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-8 leading-[1.1]">
                                The free CDN for<br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-600 animate-aurora pb-2">
                                    open source.
                                </span>
                            </h1>
                        </FadeIn>

                        {/* Subheadline with rotating words */}
                        <FadeIn delay={0.2}>
                            <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                                Serve your <RotatingWords /> with enterprise-grade speed and reliability.
                                Built by the community, for the community.
                            </p>
                        </FadeIn>

                        {/* CTAs */}
                        <FadeIn delay={0.3} className="flex flex-wrap items-center justify-center gap-4 mb-20">
                            <Link href="/docs/getting-started" className="h-11 px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium flex items-center hover:opacity-90 transition-all shadow-lg hover:shadow-xl">
                                Start Using It <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                            <Link href="/network" className="h-11 px-8 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 font-medium flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                                <Globe className="w-4 h-4 mr-2" /> View Network
                            </Link>
                        </FadeIn>

                        {/* Terminal Hero Visual */}
                        <FadeIn delay={0.4}>
                            <TerminalHero />
                        </FadeIn>

                    </div>
                </section>

                {/* --- Sponsors Section --- */}
                <section className="px-6 mb-32 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <FadeIn delay={0.5}>
                            <div className="flex flex-col items-center">
                                <p className="text-[10px] md:text-xs font-semibold text-zinc-400 dark:text-zinc-500 mb-8 uppercase tracking-[0.2em]">Infrastructure Sponsors</p>
                                <div className="flex flex-wrap justify-center gap-10 md:gap-16 items-center">
                                    <Link
                                        href="https://www.cloudns.net/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300"
                                    >
                                        <Image src="/assets/sponsors/cloudns.svg" alt="ClouDNS" width={140} height={35} className="h-7 md:h-8 w-auto" />
                                    </Link>
                                    <Link
                                        href="https://www.netlify.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="opacity-70 hover:opacity-100 hover:scale-105 transition-all duration-300"
                                    >
                                        <Image src="/assets/sponsors/netlify.svg" alt="Netlify" width={140} height={35} className="h-7 md:h-8 w-auto" />
                                    </Link>
                                    <Link
                                        href="/sponsors"
                                        className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-dashed border-zinc-200 dark:border-zinc-800 text-[10px] md:text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-105 transition-all"
                                    >
                                        <Heart className="w-3 h-3" /> Your Logo Here
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* --- Stats Section (Card Style) --- */}
                <section className="px-6 mb-32 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Main Stat: Requests */}
                            <FadeIn className="md:col-span-2 relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-6 text-emerald-600 dark:text-emerald-500">
                                        <Activity className="w-5 h-5" />
                                        <span className="font-medium tracking-tight">Scale & Reliability</span>
                                    </div>
                                    <div className="text-6xl md:text-8xl font-semibold tracking-tighter text-zinc-900 dark:text-white mb-3">
                                        <NumberTicker value={stats.requests} />
                                    </div>
                                    <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mt-2 text-base font-normal">
                                        Requests served in the last 30 days with <span className="text-zinc-900 dark:text-white font-medium">100% uptime</span>.
                                    </p>
                                </div>
                            </FadeIn>

                            {/* Secondary Stat: PoPs */}
                            <FadeIn delay={0.1} className="flex flex-col rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-8 justify-center group relative overflow-hidden">
                                {/* Map BG Hint */}
                                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
                                    </svg>
                                </div>

                                <div className="relative z-10">
                                    <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                                        Global Network
                                    </div>
                                    <div className="text-5xl font-semibold text-zinc-900 dark:text-white tracking-tight mb-2">
                                        570<span className="text-emerald-500">+</span>
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                                        Points of Presence across 6 continents. Always close to your users.
                                    </p>
                                </div>
                            </FadeIn>

                        </div>
                    </div>
                </section>

                {/* --- Use Cases / Features Grid (Colorful Cards) --- */}
                <section className="px-6 mb-32">
                    <div className="max-w-6xl mx-auto">
                        <FadeIn className="text-center mb-16">
                            <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">
                                All your assets, one platform.
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400">
                                Optimized delivery for every part of your stack.
                            </p>
                        </FadeIn>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* 1. NPM (Red) */}
                            <FadeIn delay={0.1}>
                                <Link href="/npm" className="group relative block h-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-all hover:shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-500 group-hover:scale-110 transition-transform duration-300">
                                                <SiNpm className="w-8 h-8" />
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-red-500 transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">NPM Registry</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                                            Direct access to billions of files. Just replace the hostname to serve any file from any package at the edge.
                                        </p>
                                        <div className="mt-auto pt-2">
                                            <div className="rounded-md bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-2 font-mono text-[10px] text-zinc-500 group-hover:border-red-200 dark:group-hover:border-red-900/50 transition-colors truncate">
                                                https://cdn.staticdelivr.com/npm/<span className="text-zinc-900 dark:text-white">package</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </FadeIn>

                            {/* 2. GitHub (Black/White) */}
                            <FadeIn delay={0.2}>
                                <Link href="/github" className="group relative block h-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-all hover:shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                                                <SiGithub className="w-6 h-6" />
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">GitHub Repos</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                                            Serve raw files directly from releases, branches, or commits. The perfect way to host small assets or config files.
                                        </p>
                                        <div className="mt-auto pt-2">
                                            <div className="rounded-md bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-2 font-mono text-[10px] text-zinc-500 group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors truncate">
                                                https://cdn.staticdelivr.com/gh/<span className="text-zinc-900 dark:text-white">user/repo</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </FadeIn>

                            {/* 3. WordPress (Blue) */}
                            <FadeIn delay={0.3}>
                                <Link href="/wordpress" className="group relative block h-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-all hover:shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform duration-300">
                                                <SiWordpress className="w-6 h-6" />
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                                                <Activity className="w-3 h-3" />
                                                Plugin
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">WordPress Acceleration</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                                            Offload static assets for your WordPress site. No API keys or complicated setup required.
                                        </p>
                                        <div className="mt-auto pt-2 text-blue-600 dark:text-blue-400 font-medium text-sm flex items-center">
                                            Download Plugin <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </Link>
                            </FadeIn>

                            {/* 4. Google Fonts (Amber) */}
                            <FadeIn delay={0.4}>
                                <Link href="/google-fonts" className="group relative block h-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-all hover:shadow-lg">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-500 group-hover:scale-110 transition-transform duration-300">
                                                <SiGooglefonts className="w-6 h-6" />
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-amber-500 transition-colors" />
                                        </div>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Google Fonts Proxy</h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                                            Enhance privacy and performance by proxying Google Fonts through our network. No tracking, better caching.
                                        </p>
                                        <div className="mt-auto pt-2">
                                            <div className="rounded-md bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-2 font-mono text-[10px] text-zinc-500 group-hover:border-amber-200 dark:group-hover:border-amber-900/50 transition-colors truncate">
                                                https://cdn.staticdelivr.com/gfonts/<span className="text-zinc-900 dark:text-white">css2?family=...</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </FadeIn>

                        </div>
                    </div>
                </section>

                {/* --- Quick Start Section (Tabs) --- */}
                <section className="px-6 py-24 bg-white dark:bg-zinc-950 border-y border-zinc-200 dark:border-zinc-800">
                    <div className="max-w-5xl mx-auto">
                        <FadeIn className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white mb-4">Start in seconds</h2>
                            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-light">
                                Choose your source and start delivering content globally. Click any URL to copy it.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <Tabs defaultValue="npm" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl mb-8">
                                    <TabsTrigger value="npm" className="py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm transition-all font-medium">
                                        <Package className="w-4 h-4 mr-2" /> NPM
                                    </TabsTrigger>
                                    <TabsTrigger value="github" className="py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm transition-all font-medium">
                                        <GitBranch className="w-4 h-4 mr-2" /> GitHub
                                    </TabsTrigger>
                                    <TabsTrigger value="wordpress" className="py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm transition-all font-medium">
                                        <Globe className="w-4 h-4 mr-2" /> WordPress
                                    </TabsTrigger>
                                    <TabsTrigger value="fonts" className="py-3 rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm transition-all font-medium">
                                        <SiGooglefonts className="w-4 h-4 mr-2" /> Fonts
                                    </TabsTrigger>
                                </TabsList>

                                {/* NPM Content */}
                                <TabsContent value="npm">
                                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 md:p-8 space-y-8">
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-zinc-900 dark:text-white">Load any npm package</h3>
                                                <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Template</span>
                                            </div>
                                            <CodeBlock code="https://cdn.staticdelivr.com/npm/package@version/file" language="url" />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-zinc-900 dark:text-white">Example: React</h3>
                                                <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Live</span>
                                            </div>
                                            <CodeBlock code="https://cdn.staticdelivr.com/npm/react@18.2.0/umd/react.production.min.js" language="url" />
                                        </div>
                                        <div className="pt-2">
                                            <Link href="/npm" className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-500 hover:underline">
                                                Read full documentation <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* GitHub Content */}
                                <TabsContent value="github">
                                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 md:p-8 space-y-8">
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-zinc-900 dark:text-white">Load from GitHub</h3>
                                                <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Template</span>
                                            </div>
                                            <CodeBlock code="https://cdn.staticdelivr.com/gh/user/repo@version/file" language="url" />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-zinc-900 dark:text-white">Example: jQuery</h3>
                                                <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Live</span>
                                            </div>
                                            <CodeBlock code="https://cdn.staticdelivr.com/gh/jquery/jquery@3.7.1/dist/jquery.min.js" language="url" />
                                        </div>
                                        <div className="pt-2">
                                            <Link href="/github" className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-500 hover:underline">
                                                Read full documentation <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* WordPress Content */}
                                <TabsContent value="wordpress">
                                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 md:p-8 space-y-8">
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-zinc-900 dark:text-white">WordPress Plugins</h3>
                                                <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Template</span>
                                            </div>
                                            <CodeBlock code="https://cdn.staticdelivr.com/wp/plugins/plugin-name/tags/version/file" language="url" />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-zinc-900 dark:text-white">Example: WooCommerce</h3>
                                                <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Live</span>
                                            </div>
                                            <CodeBlock code="https://cdn.staticdelivr.com/wp/plugins/woocommerce/tags/9.3.3/assets/js/frontend/woocommerce.min.js" language="url" />
                                        </div>
                                        <div className="pt-2">
                                            <Link href="/wordpress" className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-500 hover:underline">
                                                Read full documentation <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Google Fonts Content */}
                                <TabsContent value="fonts">
                                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 md:p-8 space-y-8">
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-zinc-900 dark:text-white">Google Fonts CSS</h3>
                                                <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">Template</span>
                                            </div>
                                            <CodeBlock code="https://cdn.staticdelivr.com/gfonts/css2?family=Inter:wght@400;600&display=swap" language="url" />
                                        </div>
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold text-zinc-900 dark:text-white">HTML Implementation</h3>
                                                <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Snippet</span>
                                            </div>
                                            <CodeBlock code={`<link href="https://cdn.staticdelivr.com/gfonts/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">`} language="html" />
                                        </div>
                                        <div className="pt-2">
                                            <Link href="/google-fonts" className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-500 hover:underline">
                                                Read full documentation <ArrowRight className="w-4 h-4 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </FadeIn>
                    </div>
                </section>

                {/* --- Final CTA --- */}
                <section className="px-6 pb-24">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 p-12 md:p-20 text-center shadow-2xl">
                            {/* Background Glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-transparent opacity-50 pointer-events-none" />

                            <div className="relative z-10">
                                <Link href="/sponsors" className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-medium border border-rose-500/20 hover:bg-rose-500/20 transition-colors">
                                    <Heart className="w-3 h-3 fill-current" />
                                    <span>Community Funded</span>
                                </Link>

                                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                                    Built for performance.<br className="hidden md:block" />
                                    Designed for <span className="text-emerald-400">developers.</span>
                                </h2>

                                <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
                                    Join thousands of projects using StaticDelivr to deliver their content globally.
                                    Free forever for open source.
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        href="/docs/getting-started"
                                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-zinc-950 transition-all duration-300 hover:bg-zinc-200 hover:scale-105"
                                    >
                                        <span className="mr-2">Get Started</span>
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>

                                    <Link
                                        href="/sponsors"
                                        className="inline-flex h-12 items-center justify-center rounded-full px-8 font-medium text-white transition-colors hover:text-zinc-300 border border-zinc-700 hover:bg-zinc-800"
                                    >
                                        Become a Sponsor
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

export default HomePage;
