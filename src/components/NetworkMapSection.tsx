"use client";

import React from 'react';
import Link from 'next/link';
import { StaticDelivrImage } from 'staticdelivr';
import { MagicCard } from '@/components/ui/magic-card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';

const NetworkMapSection = () => {
  const { theme } = useTheme();
  
  return (
    <section className="py-24 px-4 bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            <span>Global Infrastructure</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            Global Network Coverage
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Our multi-CDN architecture spans 350+ Points of Presence worldwide, 
            ensuring <span className="text-zinc-900 dark:text-white font-semibold">sub-50ms latency</span> for users everywhere.
          </p>
        </div>

        <div className="relative group">
          <MagicCard 
            className="overflow-hidden rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
          >
            <div className="relative aspect-[2/1] w-full overflow-hidden">
               {/* Overlay gradient */}
               <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent dark:from-black/40 dark:to-transparent z-10 pointer-events-none" />
               
               <StaticDelivrImage 
                src="/assets/img/network-map.png"
                alt="World Map showing CDN nodes"
                width={1090}
                height={455}
                quality={75}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 dark:opacity-60 grayscale hover:grayscale-0"
              />
              
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <Link href="/network">
                  <Button 
                    size="lg" 
                    className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-full px-8 h-12 text-base font-medium shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                  >
                    Explore Network Map
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </MagicCard>
          
          {/* Decorative background glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 border-t border-zinc-100 dark:border-zinc-800 pt-16">
            <div className="text-center">
                <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1 font-mono">Free</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">For Open Source</div>
            </div>
            <div className="text-center">
                <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1 font-mono">Unlimited</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Traffic & Requests</div>
            </div>
             <div className="text-center">
                <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1 font-mono">Multi-CDN</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Redundant Network</div>
            </div>
             <div className="text-center">
                <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-1 font-mono">100%</div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">Uptime Guarantee</div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default NetworkMapSection;