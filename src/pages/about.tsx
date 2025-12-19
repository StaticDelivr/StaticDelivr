import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Terminal, ArrowRight, Heart, Code2, 
  Globe, Zap, Leaf, ExternalLink, GitBranch,
  ShieldCheck, Star
} from 'lucide-react';
import { SiNpm, SiWordpress, SiReact, SiGooglefonts } from 'react-icons/si'; 

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

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

// --- Terminal Visual ---
const TerminalVisual = () => (
  <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-xl font-mono text-sm">
    <div className="h-10 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 flex items-center px-4 relative">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-rose-400"></div>
        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-zinc-400 text-xs">terminal</span>
      </div>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="text-emerald-500 font-bold">$</span>
        <span className="text-zinc-700 dark:text-zinc-300">
          curl -s https://cdn.staticdelivr.com/npm/react
        </span>
      </div>
      <div className="space-y-2 pl-4">
        <motion.div 
          initial={{ opacity: 0, x: -5 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400"
        >
          <span>✓</span> Fetched from edge node (2ms)
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -5 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400"
        >
          <span>✓</span> Optimized & compressed
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -5 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-medium"
        >
          <span>✓</span> Delivered globally in 45ms
        </motion.div>
      </div>
    </div>
  </div>
);

// --- Data Fetching ---
interface AboutPageProps {
  stats: { requests: number };
  versions: {
    npm: string;
    wordpress: string;
  };
}

export async function getStaticProps() {
  const props = {
    stats: { requests: 800000000 },
    versions: { npm: 'v1.0.0', wordpress: 'v1.3.0' }
  };

  try {
    // 1. Fetch Stats
    const statsRes = await fetch('https://stats.staticdelivr.com/api/stats?month=previous');
    const statsData = await statsRes.json();
    if (statsData?.total?.requests) {
      props.stats.requests = statsData.total.requests;
    }

    // 2. Fetch NPM Version
    const npmRes = await fetch('https://registry.npmjs.org/staticdelivr');
    const npmData = await npmRes.json();
    if (npmData?.['dist-tags']?.latest) {
      props.versions.npm = `v${npmData['dist-tags'].latest}`;
    }

    // 3. Fetch WordPress Version
    const wpRes = await fetch('https://api.wordpress.org/plugins/info/1.0/staticdelivr.json');
    const wpData = await wpRes.json();
    if (wpData?.version) {
      props.versions.wordpress = `v${wpData.version}`;
    }

  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return { 
    props, 
    revalidate: 3600 // Revalidate every hour
  };
}

const AboutPage: React.FC<AboutPageProps> = ({ stats, versions }) => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-emerald-500/30 font-sans">
      <Head>
        <title>About | StaticDelivr</title>
        <meta name="description" content="Infrastructure for the open source world. Free, fast, and transparent." />
      </Head>

      <Header />

      <main className="relative pt-32 pb-20 overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        {/* --- Hero Section --- */}
        <section className="px-6 mb-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                <Terminal className="w-3 h-3" />
                <span>$ staticdelivr --about</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                Infrastructure for open source.<br />
                <span className="text-zinc-400 dark:text-zinc-600">Built by one, for all.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                StaticDelivr is a <strong className="font-semibold text-zinc-900 dark:text-white">CDN for open source</strong> focused on the outcome that matters: 
                fewer wasted bytes, faster loads, and a modern web that works for everyone.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-wrap items-center justify-center gap-4">
               <Link href="/docs" className="h-10 px-6 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium flex items-center hover:opacity-90 transition-opacity">
                  Read the Docs
               </Link>
               <Link href="/sponsors" className="h-10 px-6 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                  <Heart className="w-4 h-4 mr-2 text-rose-500" /> Support the project
               </Link>
            </FadeIn>
          </div>
        </section>

        {/* --- Stats & Philosophy Grid --- */}
        <section className="px-6 mb-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Primary Stat: Requests */}
              <FadeIn className="md:col-span-2 relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-6 text-emerald-600 dark:text-emerald-500">
                    <Globe className="w-5 h-5" />
                    <span className="font-medium tracking-tight">Proof of scale</span>
                  </div>
                  
                  <div className="text-6xl md:text-8xl font-semibold tracking-tighter text-zinc-900 dark:text-white mb-3">
                    <NumberTicker value={stats.requests} />
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mt-2 text-base font-normal">
                    Requests served in the last 30 days. We might be small, but our infrastructure handles traffic at scale.
                  </p>
                </div>
              </FadeIn>

              {/* Philosophy Card */}
              <FadeIn delay={0.1} className="flex flex-col rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-8 justify-center">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                   Default Stance
                </div>
                <div className="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight mb-2">
                   No Paywalls.<br/>No Tracking.
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                   Public infrastructure should be boring, reliable, and transparent. We don't track your users or upsell features.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* --- Use Cases Grid --- */}
        <section className="px-6 mb-32">
           <div className="max-w-6xl mx-auto">
              <FadeIn className="text-center mb-16">
                 <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">One platform, many use cases</h2>
                 <p className="text-zinc-500 dark:text-zinc-400">Everything we serve is optimized by default.</p>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 
                 {/* 1. React Component (Cyan) */}
                 <FadeIn delay={0.1}>
                    <Link href="/package" className="group relative block h-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-all hover:shadow-lg">
                       <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                       <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-6">
                             <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-900/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                                <SiReact className="w-6 h-6 animate-[spin_10s_linear_infinite]" />
                             </div>
                             <div className="flex flex-col items-end">
                                <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-cyan-500 transition-colors mb-2" />
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                             <h3 className="text-xl font-bold text-zinc-900 dark:text-white">React Component</h3>
                             <span className="px-2 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-[10px] font-semibold text-cyan-700 dark:text-cyan-300 uppercase tracking-wide">
                                {versions.npm}
                             </span>
                          </div>
                          
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                             Drop-in image optimization component. Automatic WebP/AVIF conversion with over <strong className="text-zinc-900 dark:text-white font-medium">54k+ downloads</strong>.
                          </p>

                          <div className="mt-auto pt-2">
                             <div className="rounded-md bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-2 font-mono text-[10px] text-zinc-500 group-hover:border-cyan-200 dark:group-hover:border-cyan-900/50 transition-colors">
                                <span className="text-purple-500">import</span> <span className="text-zinc-900 dark:text-white">{`{ StaticDelivrImage }`}</span>
                             </div>
                          </div>
                       </div>
                    </Link>
                 </FadeIn>

                 {/* 2. WordPress (Blue) */}
                 <FadeIn delay={0.2}>
                    <Link href="/wordpress" className="group relative block h-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-all hover:shadow-lg">
                       <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                       <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-500 group-hover:scale-110 transition-transform duration-300">
                                <SiWordpress className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-full">
                               <Star className="w-3 h-3 fill-emerald-600 dark:fill-emerald-500" />
                               5/5 Stars
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-2">
                             <h3 className="text-xl font-bold text-zinc-900 dark:text-white">WordPress Plugin</h3>
                             <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[10px] font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                                {versions.wordpress}
                             </span>
                          </div>

                          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">
                             Accelerate WordPress in 1 click. No API keys, no DNS changes. Automatically optimizes assets and images on the fly.
                          </p>

                          <div className="mt-auto text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1">
                             Download Free Plugin <ArrowRight className="w-3 h-3" />
                          </div>
                       </div>
                    </Link>
                 </FadeIn>

                 {/* 3. NPM Registry (Red) */}
                 <FadeIn delay={0.3}>
                    <Link href="/npm" className="group relative block h-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-all hover:shadow-lg">
                       <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                       <div className="relative z-10 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-500 group-hover:scale-110 transition-transform duration-300">
                                <SiNpm className="w-8 h-8" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-red-500 transition-colors" />
                          </div>
                          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">NPM Registry CDN</h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                             Fast, global delivery for millions of files from the npm registry. Just replace the hostname to access raw files via our edge network.
                          </p>
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
                          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                             We act as a privacy shield between your users and Google. No tracking cookies, aggressive caching, and faster HTTP/3 delivery.
                          </p>
                       </div>
                    </Link>
                 </FadeIn>

              </div>
           </div>
        </section>

        {/* --- How It Works Section --- */}
        <section className="px-6 mb-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               
               <FadeIn>
                  <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-500 font-medium mb-6">
                    <Zap className="w-5 h-5" />
                    <span>Zero Config</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
                    Drop in a URL.<br />
                    <span className="text-emerald-500">It just works.</span>
                  </h2>
                  <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                    <p>
                      No API keys. No dashboards. No complicated setups. 
                      Just <strong className="font-medium text-zinc-900 dark:text-white">paste a URL</strong> and 
                      your assets are automatically optimized and delivered from the nearest edge.
                    </p>
                    <p>
                      We act as a proxy for the tools you already use, adding a layer of caching, compression, and stability.
                    </p>
                  </div>
               </FadeIn>

               <FadeIn delay={0.2}>
                  <TerminalVisual />
               </FadeIn>
            </div>
          </div>
        </section>

        {/* --- "Green Delivery" Feature Card --- */}
        <section className="px-6 mb-32">
           <div className="max-w-6xl mx-auto">
              <FadeIn>
                <div className="relative overflow-hidden rounded-3xl bg-emerald-900 dark:bg-emerald-950 p-10 md:p-14 text-white">
                   <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                      <div>
                         <div className="inline-flex items-center gap-2 text-emerald-300 font-medium mb-4">
                            <Leaf className="w-5 h-5" />
                            <span>Sustainability</span>
                         </div>
                         <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                            The cleanest byte is the one you don't send.
                         </h2>
                         <p className="text-emerald-100/80 leading-relaxed mb-8 max-w-md">
                            By optimizing images and minifying code at the edge, we drastically reduce data transfer. Less data means less energy used by networks and devices.
                         </p>
                         <Link href="/impact" className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all">
                            View Impact Report <ArrowRight className="w-4 h-4" />
                         </Link>
                      </div>
                      
                      {/* Abstract Visual */}
                      <div className="relative h-full min-h-[200px] flex items-center justify-center">
                         <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
                         <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full max-w-sm">
                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                               <span className="text-xs uppercase tracking-widest text-emerald-200">Transfer Size</span>
                               <span className="text-xs bg-emerald-500/20 text-emerald-200 px-2 py-1 rounded">-90%</span>
                            </div>
                            <div className="space-y-4">
                               <div>
                                  <div className="flex justify-between text-xs mb-1 opacity-70">
                                     <span>Original (PNG)</span>
                                     <span>1.2 MB</span>
                                  </div>
                                  <div className="h-1.5 bg-white/10 rounded-full w-full" />
                               </div>
                               <div>
                                  <div className="flex justify-between text-xs mb-1 text-emerald-300 font-medium">
                                     <span>Optimized (WebP)</span>
                                     <span>120 KB</span>
                                  </div>
                                  <div className="h-1.5 bg-emerald-500 rounded-full w-[10%]" />
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </FadeIn>
           </div>
        </section>

        {/* --- "Open Source" Design --- */}
        <section className="px-6 mb-32">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950 p-10 md:p-16">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }} />
                </div>

                <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                  
                  {/* Left: Copy */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-6">
                      <ShieldCheck className="w-3 h-3" />
                      Transparency
                    </div>
                    <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-white tracking-tight mb-4">
                      Built in the open,<br />for the open web.
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-light">
                      We believe in radical transparency. While our edge network runs on enterprise-grade infrastructure, our integration code, website, and documentation are 100% open source.
                    </p>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                       Fork the docs, improve the logic, or learn from the project structure. We build in public.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        href="https://github.com/staticdelivr/staticdelivr"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium hover:opacity-90 transition-opacity"
                      >
                        <GitBranch className="w-5 h-5" />
                        View on GitHub
                      </Link>
                      <Link
                        href="/docs/contributing"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        Contributing Guide
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* GitHub Stats Mockup */}
                  <div className="hidden md:block">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                          <Code2 className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-zinc-900 dark:text-white">staticdelivr/staticdelivr</div>
                          <div className="text-sm text-zinc-500">Public repository</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                          <div className="text-2xl font-bold text-zinc-900 dark:text-white">7</div>
                          <div className="text-xs text-zinc-500">Stars</div>
                        </div>
                        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                          <div className="text-2xl font-bold text-zinc-900 dark:text-white">0</div>
                          <div className="text-xs text-zinc-500">Forks</div>
                        </div>
                        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                          <div className="text-2xl font-bold text-zinc-900 dark:text-white">1</div>
                          <div className="text-xs text-zinc-500">Contributors</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="px-6 pb-24">
          <FadeIn>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 p-12 md:p-20 text-center shadow-2xl">
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-transparent opacity-55 pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                  Join the movement for a<br className="hidden md:block" />
                  <span className="bg-gradient-to-r from-emerald-400 to-blue-300 bg-clip-text text-transparent">
                    faster, fairer internet.
                  </span>
                </h2>

                <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto font-light">
                  Use StaticDelivr today (no sign-up), and if it helps your users, consider supporting the infrastructure.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/docs"
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-zinc-950 transition-all duration-300 hover:bg-zinc-200 hover:scale-105"
                  >
                    <span className="mr-2">Get Started</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/sponsors"
                    className="inline-flex h-12 items-center justify-center rounded-full px-8 font-medium text-white transition-colors hover:text-zinc-300 border border-zinc-700 hover:bg-zinc-800"
                  >
                    Become a Sponsor <Heart className="ml-2 h-4 w-4 text-rose-500" />
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

export default AboutPage;