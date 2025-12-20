import React, { useState, useRef } from 'react';
import { NextSeo, SoftwareAppJsonLd } from 'next-seo';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
   ArrowRight, Download, Zap,
   Image as ImageIcon, Shield,
   Globe, Check, RefreshCw,
   MousePointerClick, Layers,
   MoveHorizontal, ArrowDown
} from 'lucide-react';
import { SiWordpress } from 'react-icons/si';

import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Data Fetching ---
interface WordPressPageProps {
   versions: {
      wordpress: string;
   };
}

export async function getStaticProps() {
   const props = {
      versions: { wordpress: 'v1.3.0' }
   };

   try {
      // Fetch WordPress Version
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
      revalidate: 2592000 // Revalidate every month
   };
}

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

// --- Comparison Slider Component ---
const CompareSlider = () => {
   const [position, setPosition] = useState(50);
   const containerRef = useRef<HTMLDivElement>(null);
   const [isDragging, setIsDragging] = useState(false);

   const handleMove = (clientX: number) => {
      if (containerRef.current) {
         const rect = containerRef.current.getBoundingClientRect();
         const x = clientX - rect.left;
         const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
         setPosition(percentage);
      }
   };

   const onMouseMove = (e: React.MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
   };

   const onTouchMove = (e: React.TouchEvent) => {
      handleMove(e.touches[0].clientX);
   };

   return (
      <div className="w-full max-w-4xl mx-auto">
         <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-2xl border border-zinc-200 dark:border-zinc-800"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={onMouseMove}
            onTouchMove={onTouchMove}
            onClick={(e) => handleMove(e.clientX)}
         >
            {/* 'After' Image (Background) */}
            <img
               src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=2070&auto=format&fit=crop"
               alt="Optimized"
               className="absolute inset-0 w-full h-full object-cover"
               draggable={false}
            />

            <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full z-10">
               Optimized (WebP) - 45KB
            </div>

            {/* 'Before' Image (Foreground with Clip Path) */}
            <div
               className="absolute inset-0 w-full h-full"
               style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
               <img
                  src="https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=2070&auto=format&fit=crop"
                  alt="Original"
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
               />

               <div className="absolute top-4 left-4 bg-zinc-900/60 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  Original (JPG) - 1.2MB
               </div>
            </div>

            {/* Slider Handle */}
            <div
               role="slider"
               tabIndex={0}
               aria-valuenow={Math.round(position)}
               aria-valuemin={0}
               aria-valuemax={100}
               aria-label="Image comparison slider"
               onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') setPosition(Math.max(0, position - 5));
                  if (e.key === 'ArrowRight') setPosition(Math.min(100, position + 5));
               }}
               className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)] focus:ring-2 focus:ring-blue-500 focus:outline-none"
               style={{ left: `${position}%` }}
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <MoveHorizontal className="w-4 h-4 text-zinc-600" />
               </div>
            </div>
         </div>
         <div className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
            <span className="hidden md:inline">Drag the slider to compare. </span>
            Visually identical, 96% smaller file size.
         </div>
      </div >
   );
};

const WordPressPage: React.FC<WordPressPageProps> = ({ versions }) => {
   const [activeDemoTab, setActiveDemoTab] = useState<'css' | 'img'>('img');

   return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-500/30 font-sans">
         <NextSeo
            title="WordPress CDN Plugin - Free Speed Optimization"
            description="Accelerate your WordPress site in minutes with our free, zero-config CDN plugin. Automatically optimize images, serve assets from the edge, and boost Core Web Vitals."
            canonical="https://staticdelivr.com/wordpress"
            openGraph={{
               url: 'https://staticdelivr.com/wordpress',
               title: 'WordPress Speed Up - Free CDN Plugin | StaticDelivr',
               description: 'The easiest way to make WordPress fast. Zero configuration, automatic image optimization, and global delivery.',
            }}
         />

         <SoftwareAppJsonLd
            name="StaticDelivr WordPress Plugin"
            price="0.00"
            priceCurrency="USD"
            aggregateRating={{ ratingValue: '4.9', ratingCount: '310' }}
            operatingSystem="WordPress"
            applicationCategory="DeveloperApplication"
         />

         <Header />

         <main className="relative pt-32 pb-20 overflow-hidden">

            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* --- Hero Section --- */}
            <section className="px-6 mb-24 relative z-10">
               <div className="max-w-4xl mx-auto text-center">

                  <FadeIn>
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                        <SiWordpress className="w-3 h-3" />
                        <span>Plugin {versions.wordpress}</span>
                     </div>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                        Make WordPress fast.<br />
                        <span className="text-zinc-600 dark:text-zinc-400">No complex config required.</span>
                     </h1>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                     <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                        A lightweight plugin that automatically rewrites your assets to serve them from our global edge network.
                        <strong className="font-semibold text-zinc-900 dark:text-white"> No API keys, no DNS changes.</strong>
                     </p>
                  </FadeIn>

                  <FadeIn delay={0.3} className="flex flex-wrap items-center justify-center gap-4">
                     <Link
                        href="https://wordpress.org/plugins/staticdelivr/"
                        target="_blank"
                        className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                     >
                        <Download className="w-4 h-4 mr-2" /> Download Plugin
                     </Link>
                     <Link
                        href="/docs/wordpress-integration"
                        className="h-12 px-8 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                     >
                        Documentation
                     </Link>
                  </FadeIn>
               </div>
            </section>

            {/* --- "Set It and Forget It" Section --- */}
            <section className="px-6 mb-32 relative z-10">
               <div className="max-w-6xl mx-auto">
                  <FadeIn className="mb-16 text-center">
                     <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">Set It and Forget It</h2>
                     <p className="text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
                        We built this to be boring. Install it once, and your site stays fast forever without maintenance.
                     </p>
                  </FadeIn>

                  <div className="grid md:grid-cols-3 gap-8 relative">
                     {/* Connector Line (Desktop) */}
                     <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent z-0" />

                     {/* Step 1 */}
                     <FadeIn delay={0.1} className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-sm mb-6">
                           <Download className="w-8 h-8 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">1. Install</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs leading-relaxed">
                           Search for "StaticDelivr" in your WordPress admin panel plugins page.
                        </p>
                     </FadeIn>

                     {/* Step 2 */}
                     <FadeIn delay={0.2} className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-sm mb-6">
                           <MousePointerClick className="w-8 h-8 text-purple-500" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">2. Activate</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs leading-relaxed">
                           Click activate. The plugin automatically detects your theme and asset paths.
                        </p>
                     </FadeIn>

                     {/* Step 3 */}
                     <FadeIn delay={0.3} className="relative z-10 flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shadow-sm mb-6">
                           <Zap className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">3. Accelerated</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs leading-relaxed">
                           Your assets are now serving from 570+ edge nodes globally.
                        </p>
                     </FadeIn>
                  </div>
               </div>
            </section>

            {/* --- Image Comparison Slider --- */}
            <section className="px-6 mb-32 bg-zinc-50 dark:bg-zinc-900/30 py-24 border-y border-zinc-200 dark:border-zinc-800">
               <FadeIn>
                  <div className="max-w-4xl mx-auto mb-12 text-center">

                     {/* Visual Emphasis on Savings */}
                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold mb-6 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                        <ArrowDown className="w-4 h-4" />
                        Up to 96% Smaller Files
                     </div>

                     <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-white mb-4">
                        Lossless Compression
                     </h2>
                     <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                        We automatically convert your uploads to WebP or AVIF.
                        Can you spot the difference? Neither can your users.
                     </p>
                  </div>

                  <CompareSlider />
               </FadeIn>
            </section>

            {/* --- URL Rewrite Demo (Tabs) --- */}
            <section className="px-6 mb-32">
               <div className="max-w-4xl mx-auto">
                  <FadeIn className="text-center mb-10">
                     <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">How URLs are Transformed</h2>
                     <p className="text-zinc-500 dark:text-zinc-400 mt-2">The plugin rewrites HTML before it leaves your server.</p>
                  </FadeIn>

                  <FadeIn delay={0.2} className="relative rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">

                     {/* Terminal Header / Tabs */}
                     <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950/50">
                        <div className="flex items-center gap-1.5">
                           <div className="w-3 h-3 rounded-full bg-red-500/20" />
                           <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                           <div className="w-3 h-3 rounded-full bg-green-500/20" />
                        </div>
                        <div className="flex gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                           <button
                              onClick={() => setActiveDemoTab('img')}
                              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${activeDemoTab === 'img' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                                 }`}
                           >
                              Media (Images)
                           </button>
                           <button
                              onClick={() => setActiveDemoTab('css')}
                              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${activeDemoTab === 'css' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300'
                                 }`}
                           >
                              Theme Assets (CSS/JS)
                           </button>
                        </div>
                     </div>

                     {/* Content */}
                     <div className="p-8 font-mono text-sm space-y-8">

                        {/* Before Block */}
                        <div>
                           <div className="text-zinc-500 mb-2 text-xs uppercase tracking-wider flex items-center gap-2">
                              <span className="w-2 h-2 bg-red-500 rounded-full" /> Before (Origin Server)
                           </div>
                           <div className="text-zinc-400 break-all bg-zinc-950/50 p-4 rounded-lg border border-white/5">
                              {activeDemoTab === 'img'
                                 ? 'https://mysite.com/wp-content/uploads/2025/01/hero.jpg'
                                 : 'https://mysite.com/wp-content/themes/twentytwentyfive/style.css?ver=1.4'
                              }
                           </div>
                        </div>

                        {/* Transform Icon */}
                        <div className="flex justify-center">
                           <RefreshCw className="w-5 h-5 text-zinc-600 animate-[spin_3s_linear_infinite]" />
                        </div>

                        {/* After Block */}
                        <div>
                           <div className="text-zinc-500 mb-2 text-xs uppercase tracking-wider flex items-center gap-2">
                              <span className="w-2 h-2 bg-emerald-500 rounded-full" /> After (StaticDelivr CDN)
                           </div>
                           <div className="text-emerald-400 break-all bg-emerald-900/10 p-4 rounded-lg border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                              {activeDemoTab === 'img'
                                 ? 'https://cdn.staticdelivr.com/img/images?url=https://mysite.com/uploads/hero.jpg&q=80&format=auto'
                                 : 'https://cdn.staticdelivr.com/wp/themes/twentytwentyfive/1.4/style.css'
                              }
                           </div>
                        </div>

                     </div>
                  </FadeIn>
               </div>
            </section>

            {/* --- Key Features Grid --- */}
            <section className="px-6 mb-32">
               <div className="max-w-6xl mx-auto">
                  <FadeIn className="mb-12">
                     <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">Plugin capabilities</h2>
                  </FadeIn>

                  <div className="grid md:grid-cols-2 gap-6">

                     {/* Feature 1 */}
                     <FadeIn delay={0.1} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-6">
                           <ImageIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Image Optimization</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                           Automatically converts PNGs and JPGs to modern formats like WebP or AVIF on the fly, reducing file size by up to 90%.
                        </p>
                     </FadeIn>

                     {/* Feature 2 */}
                     <FadeIn delay={0.2} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-500 mb-6">
                           <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Global Edge Network</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                           Offloads static assets (CSS, JS, Fonts) to our multi-CDN infrastructure, reducing load on your origin server.
                        </p>
                     </FadeIn>

                     {/* Feature 3 */}
                     <FadeIn delay={0.3} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center text-purple-600 dark:text-purple-500 mb-6">
                           <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Smart Fallback</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                           If the CDN encounters an issue, assets automatically revert to loading from your origin server. Zero downtime risk.
                        </p>
                     </FadeIn>

                     {/* Feature 4 */}
                     <FadeIn delay={0.4} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center text-orange-600 dark:text-orange-500 mb-6">
                           <Layers className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Theme Compatible</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                           Works seamlessly with popular themes and builders like Elementor, Divi, and Gutenberg right out of the box.
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
                        <div className="inline-flex items-center gap-2 text-zinc-400 font-medium mb-6">
                           <Check className="w-5 h-5 text-emerald-500" />
                           <span>Free & Open Source</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8 tracking-tight">
                           Boost your Core Web Vitals.
                        </h2>
                        <div className="flex justify-center gap-4">
                           <Link href="https://wordpress.org/plugins/staticdelivr/" target="_blank" className="h-12 px-8 rounded-full bg-white text-zinc-900 font-medium flex items-center hover:bg-zinc-200 transition-colors">
                              Get the Plugin <ArrowRight className="w-4 h-4 ml-2" />
                           </Link>
                           <Link href="/docs/wordpress-integration" className="h-12 px-8 rounded-full border border-zinc-700 text-white font-medium flex items-center hover:bg-zinc-800 transition-colors">
                              Setup Guide
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

export default WordPressPage;