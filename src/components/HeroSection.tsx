"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, Copy, Check } from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { WordRotate } from '@/components/ui/word-rotate';
import { NumberTicker } from '@/components/ui/number-ticker';
import { ShineBorder } from '@/components/ui/shine-border';
import { AuroraText } from '@/components/ui/aurora-text';

// Format large numbers compactly for mobile
const formatCompactNumber = (num: number): string => {
  if (num >= 1e12) return `${(num / 1e12).toFixed(0)}T+`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(0)}B+`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(0)}M+`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(0)}K+`;
  return num.toString();
};

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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMonthlyRequests(data.total.requests);
      } catch (error) {
        console.error('Error fetching monthly requests data:', error);
        // Set a fallback value to prevent UI issues
        setMonthlyRequests(100000000000); // 100B+ as shown in UI
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
      <div
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        {/* Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold dark:text-white text-zinc-900 tracking-tight leading-tight mb-6">
            The Free CDN for <br />
            <AuroraText className="text-5xl md:text-7xl font-bold">
              Open Source
            </AuroraText>
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
        <div className="w-full max-w-2xl mx-auto mb-16 px-4">
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 md:shadow-xl">
            <ShineBorder
              className="text-center text-2xl font-bold capitalize"
              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              borderWidth={1.5}
            />
            <div className="w-full relative z-10">
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-zinc-900/50 border-b border-zinc-800">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[10px] sm:text-xs text-zinc-200 font-mono">example.html</div>
                <div className="w-8 sm:w-12" /> {/* Spacer for centering */}
              </div>
              <div className="p-3 sm:p-6 font-mono text-[10px] sm:text-sm md:text-base bg-zinc-950">
                <div className="flex items-center justify-between gap-2 sm:gap-4 text-zinc-300">
                  <code className="whitespace-pre-wrap break-all flex-1">
                    <span className="text-blue-400">&lt;script</span> <span className="text-purple-400">src</span>=<span className="text-green-400">&quot;https://cdn.staticdelivr.com/npm/package@version/file&quot;</span><span className="text-blue-400">&gt;&lt;/script&gt;</span>
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="p-1.5 sm:p-2 hover:bg-zinc-800 rounded-md transition-colors text-zinc-400 hover:text-white focus:outline-none flex-shrink-0"
                    title="Copy to clipboard"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" /> : <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full max-w-5xl mx-auto mt-12 sm:mt-20 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6 sm:gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-6 sm:pt-10">
            <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
              <div className="text-xl sm:text-3xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white tracking-tighter">
                {monthlyRequests ? formatCompactNumber(monthlyRequests) : "100B+"}
              </div>
              <div className="text-[9px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider sm:tracking-widest text-center">Requests/Mo</div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
              <div className="text-xl sm:text-3xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white tracking-tighter">
                350+
              </div>
              <div className="text-[9px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider sm:tracking-widest text-center">Global PoPs</div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
              <div className="text-xl sm:text-3xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white tracking-tighter">
                100%
              </div>
              <div className="text-[9px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider sm:tracking-widest text-center">Uptime</div>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
              <div className="text-xl sm:text-3xl md:text-5xl font-mono font-bold text-zinc-900 dark:text-white tracking-tighter">
                ∞
              </div>
              <div className="text-[9px] sm:text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider sm:tracking-widest text-center">Free Bandwidth</div>
            </div>
          </div>
        </div>

      </div>
    </AuroraBackground>
  );
};

export default HeroSection;
