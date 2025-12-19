import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Mail, Send, Terminal, Zap, 
  BookOpen, Users, Lock 
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

const NewsletterPage = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-500/30 font-sans">
      <Head>
        <title>Newsletter | StaticDelivr</title>
        <meta name="description" content="Stay updated with the latest in open source delivery and edge performance." />
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
                <span>$ staticdelivr --newsletter</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                Changelogs, insights,<br />
                <span className="text-zinc-400 dark:text-zinc-600">and edge engineering.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                Join our community of developers. We share monthly updates about CDN performance, new open source integrations, and infrastructure transparency reports.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* --- Disabled Form Section --- */}
        <section className="px-6 mb-32 relative z-10">
          <div className="max-w-2xl mx-auto">
            <FadeIn delay={0.3}>
              <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-12 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
                
                {/* Diagonal Stripe Pattern (Subtle overlay for disabled feel) */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
                     style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%, transparent)' , backgroundSize: '20px 20px' }} 
                />

                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 text-zinc-400">
                    <Lock className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                    Subscriptions Paused
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                    We are currently upgrading our mailing infrastructure. Check back soon or follow us on GitHub for updates.
                  </p>

                  <form className="max-w-md mx-auto opacity-50 pointer-events-none select-none" aria-disabled="true">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="email" 
                        disabled
                        placeholder="you@example.com" 
                        className="flex-1 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-400"
                      />
                      <button 
                        disabled
                        type="button"
                        className="px-6 py-3 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-500 font-medium flex items-center justify-center gap-2"
                      >
                        Subscribe <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- Content Preview Grid --- */}
        <section className="px-6 pb-24 relative z-10">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="text-center mb-12">
               <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">What we usually write about</h2>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <FadeIn delay={0.1}>
                <div className="h-full p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Performance Deep Dives</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Technical breakdowns of how we optimize routing, compression algorithms, and edge caching strategies.
                  </p>
                </div>
              </FadeIn>

              {/* Card 2 */}
              <FadeIn delay={0.2}>
                <div className="h-full p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Project Updates</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Changelogs for our WordPress plugin, NPM registry mirror, and new points of presence (PoPs).
                  </p>
                </div>
              </FadeIn>

              {/* Card 3 */}
              <FadeIn delay={0.3}>
                <div className="h-full p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Community Stories</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    Spotlights on open source projects using StaticDelivr and how they leverage the network.
                  </p>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default NewsletterPage;