import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import {
   Eraser, AlertTriangle, Terminal,
   Zap, Clock, Globe, ShieldAlert,
   ArrowRight, Lock
} from 'lucide-react';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
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

const PurgeCachePage = () => {
   const [url, setUrl] = useState('');

   return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-orange-500/30 font-sans">
         <NextSeo
            title="Purge Cache | StaticDelivr"
            description="Instant cache invalidation for your static assets. Ensure your users always receive the latest version of your files."
            canonical="https://staticdelivr.com/tools/purge-cache"
            openGraph={{
               url: 'https://staticdelivr.com/tools/purge-cache',
               title: 'Purge Cache | StaticDelivr',
               description: 'Instant cache invalidation for your static assets. Ensure your users always receive the latest version of your files.',
            }}
         />

         <Header />

         <main className="relative pt-32 pb-20 overflow-hidden">

            {/* Background Gradients (Orange/Amber) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-orange-500/10 dark:bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* --- Hero Section --- */}
            <section className="px-6 mb-16 relative z-10">
               <div className="max-w-4xl mx-auto text-center">

                  <FadeIn>
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                        <Terminal className="w-3 h-3" />
                        <span>$ staticdelivr --tools --purge</span>
                     </div>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                        Instant global<br />
                        <span className="text-zinc-500 dark:text-zinc-400">invalidation.</span>
                     </h1>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                     <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                        Need to force an update? Purge files from our edge network instantly.
                        Ensure your users always receive the latest version of your assets.
                     </p>
                  </FadeIn>
               </div>
            </section>

            {/* --- Tool Section (Disabled Mode) --- */}
            <section className="px-6 mb-32 relative z-10">
               <div className="max-w-3xl mx-auto">
                  <FadeIn delay={0.3}>

                     {/* Maintenance Notice */}
                     <div className="mb-6 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-4 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-500 shrink-0 mt-0.5" />
                        <div>
                           <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-400">System Maintenance</h3>
                           <p className="text-xs text-orange-700/80 dark:text-orange-500/80 mt-1 leading-relaxed">
                              The Purge API is currently undergoing scheduled upgrades to improve propagation speed. Please use versioning (e.g., <code>style.v2.css</code>) to bust cache in the meantime.
                           </p>
                        </div>
                     </div>

                     {/* Main Card */}
                     <div className="relative rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden opacity-75 grayscale-[0.5] pointer-events-none select-none">

                        {/* Overlay to reinforce disabled state */}
                        <div className="absolute inset-0 z-20 bg-zinc-50/10 dark:bg-black/10" />

                        <div className="p-6 md:p-8 space-y-6 relative z-10">
                           <div>
                              <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                                 Asset URL
                              </label>
                              <div className="relative">
                                 <input
                                    type="text"
                                    disabled
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    placeholder="https://cdn.staticdelivr.com/npm/package@1.0.0/file.js"
                                    className="w-full h-12 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-400 font-mono text-sm cursor-not-allowed"
                                 />
                                 <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                              </div>
                           </div>

                           <div className="pt-2">
                              <button
                                 disabled
                                 className="w-full h-12 rounded-xl bg-zinc-900 dark:bg-white text-zinc-500 dark:text-zinc-400 font-medium flex items-center justify-center gap-2 cursor-not-allowed opacity-50"
                              >
                                 <Eraser className="w-4 h-4" /> Purge Cache
                              </button>
                           </div>
                        </div>

                        {/* Fake Terminal Output */}
                        <div className="bg-zinc-950 border-t border-zinc-800 p-4">
                           <div className="flex gap-1.5 mb-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                           </div>
                           <div className="font-mono text-xs text-zinc-600">
                              System offline. Waiting for input...
                           </div>
                        </div>
                     </div>

                  </FadeIn>
               </div>
            </section>

            {/* --- Information Grid --- */}
            <section className="px-6 mb-32">
               <div className="max-w-6xl mx-auto">
                  <FadeIn className="mb-12 text-center">
                     <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">How purging works</h2>
                  </FadeIn>

                  <div className="grid md:grid-cols-3 gap-6">

                     {/* Feature 1 */}
                     <FadeIn delay={0.1} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center text-orange-600 dark:text-orange-500 mb-6">
                           <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Global Propagation</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                           When you submit a purge request, we broadcast an invalidation signal to all 570+ edge nodes simultaneously.
                        </p>
                     </FadeIn>

                     {/* Feature 2 */}
                     <FadeIn delay={0.2} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/10 flex items-center justify-center text-red-600 dark:text-red-500 mb-6">
                           <Clock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">30-Second</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                           Most files are cleared from the cache worldwide within 30 seconds of the request being processed.
                        </p>
                     </FadeIn>

                     {/* Feature 3 */}
                     <FadeIn delay={0.3} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/10 flex items-center justify-center text-amber-600 dark:text-amber-500 mb-6">
                           <ShieldAlert className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Rate Limits</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                           To prevent abuse, anonymous purges are limited. For high-volume needs, please use our API with an API key.
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
                           <Globe className="w-5 h-5" />
                           <span>API Access</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8 tracking-tight">
                           Automate your invalidations.
                        </h2>
                        <div className="flex justify-center gap-4">
                           <Link href="/docs/api-tools" className="h-12 px-8 rounded-full bg-white text-zinc-900 font-medium flex items-center hover:bg-zinc-200 transition-colors">
                              Read API Docs <ArrowRight className="w-4 h-4 ml-2" />
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

export default PurgeCachePage;