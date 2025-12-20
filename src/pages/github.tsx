import React, { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, ArrowRight, Copy, Check,
  ExternalLink, Globe, Zap, Shield,
  Terminal, AlertCircle, Clock
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

const GitHubPage = () => {
  // --- State ---
  const [inputUrl, setInputUrl] = useState('');
  const [outputUrl, setOutputUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // --- Logic: Convert URL ---
  const convertUrl = useCallback((url: string): string => {
    if (!url.trim()) return '';

    const cdn = 'https://cdn.staticdelivr.com';

    // 1. GitHub Blob
    const blobMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)/);
    if (blobMatch) {
      const [, user, repo, branch, file] = blobMatch;
      return `${cdn}/gh/${user}/${repo}/${branch}/${file}`;
    }

    // 2. GitHub Raw
    const rawGhMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/raw\/([^/]+)\/(.+)/);
    if (rawGhMatch) {
      const [, user, repo, branch, file] = rawGhMatch;
      return `${cdn}/gh/${user}/${repo}/${branch}/${file}`;
    }

    // 3. Raw Domain
    const rawMatch = url.match(/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)/);
    if (rawMatch) {
      const [, user, repo, branch, file] = rawMatch;
      return `${cdn}/gh/${user}/${repo}/${branch}/${file}`;
    }

    throw new Error('Invalid GitHub URL format');
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
      if (inputUrl.length > 20) {
        setError('Please enter a valid GitHub file URL (blob or raw).');
      }
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

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-purple-500/30 font-sans">
      <NextSeo
        title="GitHub to CDN Converter - Production-ready Assets"
        description="Stop using raw.githubusercontent.com. Turn any GitHub file into a fast, production-ready CDN asset with global delivery and proper caching."
        canonical="https://staticdelivr.com/github"
        openGraph={{
          url: 'https://staticdelivr.com/github',
          title: 'GitHub to CDN Converter - Fast & Reliable | StaticDelivr',
          description: 'The easiest way to serve GitHub files in production. Global edge network, automated caching, and correct MIME types.',
        }}
      />

      <Header />

      <main className="relative pt-32 pb-20 overflow-hidden">

        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* --- Hero Section --- */}
        <section className="px-6 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                <Github className="w-3 h-3" />
                <span>$ staticdelivr --github --convert</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                Production-ready<br />
                <span className="text-zinc-500 dark:text-zinc-400">GitHub assets.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                Stop using <code>raw.githubusercontent.com</code> for production.
                Serve files directly from our global edge network with proper caching and compression.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* --- Converter Tool --- */}
        <section className="px-6 mb-32 relative z-10">
          <div className="max-w-3xl mx-auto">
            <FadeIn delay={0.3}>

              {/* Input Card */}
              <div className="relative z-20 mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden p-2">
                    <div className="flex items-center px-4 py-2">
                      <Github className="w-5 h-5 text-zinc-400 mr-4" />
                      <input
                        type="text"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        placeholder="https://github.com/user/repo/blob/main/style.css"
                        className="w-full bg-transparent border-none focus:ring-0 text-zinc-900 dark:text-white placeholder:text-zinc-400 font-mono text-sm h-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-2 text-rose-500 text-sm mt-3 px-4"
                    >
                      <AlertCircle className="w-4 h-4" /> {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Output Card (Terminal Style) */}
              <AnimatePresence>
                {outputUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="relative rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      </div>
                      <div className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">CDN Ready</div>
                    </div>

                    {/* Content */}
                    <div className="p-6 font-mono text-sm break-all text-green-400">
                      {outputUrl}
                    </div>

                    {/* Actions */}
                    <div className="px-4 py-3 border-t border-white/10 bg-white/5 flex justify-end gap-2">
                      <a
                        href={outputUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" /> Open
                      </a>
                      <button
                        onClick={copyToClipboard}
                        aria-label="Copy CDN URL"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-zinc-900 hover:bg-zinc-200 transition-colors"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'Copied' : 'Copy URL'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </FadeIn>
          </div>
        </section>

        {/* --- Features Grid (with Links) --- */}
        <section className="px-6 mb-32" aria-labelledby="features-heading">
          <div className="max-w-6xl mx-auto">
            <h2 id="features-heading" className="sr-only">Infrastructure Features</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Feature 1 */}
              <FadeIn delay={0.1}>
                <Link href="/network" className="group block h-full p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/10 flex items-center justify-center text-purple-600 dark:text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">570+ Global PoPs</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                    Your files are replicated across hundreds of edge nodes, ensuring sub-50ms latency for users anywhere in the world.
                  </p>
                  <div className="text-sm font-medium text-purple-600 dark:text-purple-400 flex items-center mt-auto">
                    View Network Map <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </FadeIn>

              {/* Feature 2 */}
              <FadeIn delay={0.2}>
                <Link href="/docs/caching-performance" className="group block h-full p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Permanent Cache</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                    Files are cached permanently. Even if you delete the file from GitHub, our edge nodes retain a copy for stability.
                  </p>
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400 flex items-center mt-auto">
                    Read Docs <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </FadeIn>

              {/* Feature 3 */}
              <FadeIn delay={0.3}>
                <Link href="/about" className="group block h-full p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-6 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Multi-CDN Failover</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                    If one provider fails, traffic automatically routes to another. 99.99% uptime guaranteed.
                  </p>
                  <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center mt-auto">
                    Our Infrastructure <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              </FadeIn>

              {/* Feature 4 */}
              <FadeIn delay={0.4}>
                <div className="group block h-full p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-lg">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center text-orange-600 dark:text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Proper Headers</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-4">
                    Raw GitHub files serve incorrect Content-Types. We serve the correct MIME types with optimized cache-control headers.
                  </p>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* --- URL Format Examples (Restored) --- */}
        <section className="px-6 mb-32">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-10">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                URL Format
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">

                {/* Visual Structure */}
                <div className="p-8 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/30">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-6 uppercase tracking-wider opacity-70">Structure</h3>
                  <div className="flex flex-wrap gap-2 text-sm font-mono">
                    <span className="text-zinc-400">https://cdn.staticdelivr.com</span>
                    <span className="text-zinc-300">/</span>
                    <span className="px-2 py-1 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold">gh</span>
                    <span className="text-zinc-300">/</span>
                    <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">user</span>
                    <span className="text-zinc-300">/</span>
                    <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">repo</span>
                    <span className="text-zinc-300">/</span>
                    <span className="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold">branch</span>
                    <span className="text-zinc-300">/</span>
                    <span className="px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">path/to/file</span>
                  </div>
                </div>

                {/* Concrete Examples */}
                <div className="p-8">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-6 uppercase tracking-wider opacity-70">Examples</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 mb-2 flex items-center gap-2">
                        <Github className="w-3 h-3" /> Input (GitHub)
                      </div>
                      <code className="block p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-sm font-mono text-zinc-600 dark:text-zinc-400 break-all border border-zinc-200 dark:border-zinc-800">
                        https://github.com/jquery/jquery/blob/3.6.4/dist/jquery.min.js
                      </code>
                    </div>

                    <div className="flex justify-center">
                      <ArrowRight className="w-5 h-5 text-zinc-300 rotate-90 md:rotate-0" />
                    </div>

                    <div>
                      <div className="text-xs font-medium text-zinc-500 dark:text-zinc-500 mb-2 flex items-center gap-2">
                        <Globe className="w-3 h-3" /> Output (CDN)
                      </div>
                      <code className="block p-4 bg-zinc-900 rounded-lg text-sm font-mono text-green-400 break-all border border-zinc-800 shadow-inner">
                        https://cdn.staticdelivr.com/gh/jquery/jquery/3.6.4/dist/jquery.min.js
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="px-6 pb-24 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 p-12 md:p-20 text-center shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#27272a_0%,_transparent_70%)] opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-zinc-400 font-medium mb-6">
                  <Terminal className="w-5 h-5" />
                  <span>Developer Tools</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8 tracking-tight">
                  Explore our NPM Registry.
                </h2>
                <p className="text-zinc-400 max-w-lg mx-auto mb-10">
                  Need to serve React, Vue, or other libraries? Use our dedicated NPM endpoint.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/npm" className="h-12 px-8 rounded-full bg-white text-zinc-900 font-medium flex items-center hover:bg-zinc-200 transition-colors">
                    Go to NPM CDN <ArrowRight className="w-4 h-4 ml-2" />
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

export default GitHubPage;