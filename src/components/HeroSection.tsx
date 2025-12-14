"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Copy, Check } from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { WordRotate } from '@/components/ui/word-rotate';
import { NumberTicker } from '@/components/ui/number-ticker';
import { ShineBorder } from '@/components/ui/shine-border';

const HeroSection = () => {
  const [monthlyRequests, setMonthlyRequests] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchMonthlyRequests = async () => {
      try {
        const response = await fetch('https://stats.staticdelivr.com/api/stats?month=previous');
        const data = await response.json();
        setMonthlyRequests(data.total.requests);
      } catch (error) {
        console.error('Error fetching monthly requests data:', error);
      }
    };
    fetchMonthlyRequests();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText('https://cdn.staticdelivr.com/npm/package@version/file');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AuroraBackground className="h-auto min-h-screen py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-zinc-900 tracking-tight leading-tight mb-6">
            The Free CDN for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Open Source
            </span>
          </h1>
          
          <div className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-10 flex flex-col sm:block items-center">
            <span>Serve your </span>
            <div className="inline-flex align-bottom min-w-[140px] justify-center sm:justify-start font-semibold text-zinc-900 dark:text-white">
              {mounted ? (
                <WordRotate
                  words={['npm packages', 'GitHub files', 'Google Fonts', 'WordPress plugins']}
                  className="text-left"
                  duration={3000}
                />
              ) : (
                <span>npm packages</span>
              )}
            </div>
            <span> with lightning-fast global delivery.</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
          <Link
            href="/docs/getting-started"
            className="h-12 px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium flex items-center gap-2 hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/network"
            className="h-12 px-8 rounded-full bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white font-medium flex items-center gap-2 hover:bg-white/80 dark:hover:bg-zinc-800/80 transition-colors backdrop-blur-sm"
          >
            <Globe className="w-4 h-4" />
            View Network
          </Link>
        </div>

        {/* Code Snippet / Terminal */}
        <div className="w-full max-w-2xl mx-auto mb-16">
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 md:shadow-xl">
            <ShineBorder
              className="text-center text-2xl font-bold capitalize"
              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              borderWidth={1.5}
            />
            <div className="w-full relative z-10">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs text-zinc-500 font-mono">example.html</div>
                <div className="w-12" /> {/* Spacer for centering */}
              </div>
              <div className="p-6 font-mono text-sm md:text-base overflow-x-auto bg-zinc-950">
                <div className="flex items-center justify-between gap-4 text-zinc-300">
                  <code className="whitespace-nowrap">
                    <span className="text-blue-400">&lt;script</span> <span className="text-purple-400">src</span>=<span className="text-green-400">&quot;https://cdn.staticdelivr.com/npm/package@version/file&quot;</span><span className="text-blue-400">&gt;&lt;/script&gt;</span>
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-white focus:outline-none"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full max-w-5xl mx-auto mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-10">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-4xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white tracking-tighter">
                {monthlyRequests ? (
                  <NumberTicker value={monthlyRequests} className="text-zinc-900 dark:text-white" />
                ) : (
                  "100B+"
                )}
              </div>
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Requests / Mo</div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-4xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white tracking-tighter">
                <NumberTicker value={350} className="text-zinc-900 dark:text-white" />+
              </div>
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Global PoPs</div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-4xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white tracking-tighter">
                <NumberTicker value={100} className="text-zinc-900 dark:text-white" />%
              </div>
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Uptime</div>
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <div className="text-4xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white tracking-tighter">
                ∞
              </div>
              <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Free Bandwidth</div>
            </div>
          </div>
        </div>

      </motion.div>
    </AuroraBackground>
  );
};

export default HeroSection;
