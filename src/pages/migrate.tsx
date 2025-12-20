import React, { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
   RefreshCw, ArrowRight, Copy, Check,
   Terminal, AlertCircle, Sparkles,
   Search, ExternalLink
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

const MigratePage = () => {
   // --- State ---
   const [inputUrl, setInputUrl] = useState('');
   const [outputUrl, setOutputUrl] = useState('');
   const [detectedType, setDetectedType] = useState<string | null>(null);
   const [error, setError] = useState('');

   const [copied, setCopied] = useState(false);
   const [activeTab, setActiveTab] = useState<'url' | 'script' | 'esm'>('url');

   // --- Logic: Smart Auto-Convert ---
   const convertUrl = useCallback((url: string) => {
      if (!url.trim()) {
         setOutputUrl('');
         setDetectedType(null);
         setError('');
         return;
      }

      const cdn = 'https://cdn.staticdelivr.com';
      let result = '';
      let type = '';

      try {
         // 1. unpkg (NPM)
         const unpkgMatch = url.match(/unpkg\.com\/(@?[^@/]+)(?:@([^/]+))?(?:\/(.+))?/);
         if (unpkgMatch) {
            const [, pkg, version, file] = unpkgMatch;
            result = `${cdn}/npm/${pkg}${version ? `@${version}` : ''}${file ? `/${file}` : ''}`;
            type = 'unpkg';
         }

         // 2. jsDelivr (NPM)
         else if (url.includes('jsdelivr.net/npm/')) {
            const npmMatch = url.match(/cdn\.jsdelivr\.net\/npm\/(@?[^@/]+)(?:@([^/]+))?(?:\/(.+))?/);
            if (npmMatch) {
               const [, pkg, version, file] = npmMatch;
               result = `${cdn}/npm/${pkg}${version ? `@${version}` : ''}${file ? `/${file}` : ''}`;
               type = 'jsDelivr (NPM)';
            }
         }

         // 3. jsDelivr (GitHub)
         else if (url.includes('jsdelivr.net/gh/')) {
            const ghMatch = url.match(/cdn\.jsdelivr\.net\/gh\/([^/]+)\/([^@/]+)(?:@([^/]+))?(?:\/(.+))?/);
            if (ghMatch) {
               const [, user, repo, version, file] = ghMatch;
               result = `${cdn}/gh/${user}/${repo}/${version || 'main'}/${file || ''}`;
               type = 'jsDelivr (GitHub)';
            }
         }

         // 4. GitHub Raw / Blob
         else if (url.includes('github.com') || url.includes('githubusercontent.com')) {
            // Raw
            const rawMatch = url.match(/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)/);
            if (rawMatch) {
               const [, user, repo, ref, file] = rawMatch;
               result = `${cdn}/gh/${user}/${repo}/${ref}/${file}`;
               type = 'GitHub Raw';
            }
            // Blob
            else {
               const blobMatch = url.match(/github\.com\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)/);
               if (blobMatch) {
                  const [, user, repo, ref, file] = blobMatch;
                  result = `${cdn}/gh/${user}/${repo}/${ref}/${file}`;
                  type = 'GitHub Blob';
               }
            }
         }

         // 5. NPM Registry / Website
         else if (url.includes('npmjs.com') || url.includes('registry.npmjs.org')) {
            const pageMatch = url.match(/(?:www\.)?npmjs\.com\/package\/([^/?#]+)/);
            const regMatch = url.match(/registry\.npmjs\.org\/([^/]+)/);
            const pkgName = pageMatch?.[1] || regMatch?.[1];

            if (pkgName) {
               result = `${cdn}/npm/${pkgName}`;
               type = 'NPM Page';
            }
         }

         if (result) {
            setOutputUrl(result);
            setDetectedType(type);
            setError('');
         } else if (url.length > 15) {
            setError('Could not detect a supported URL format.');
            setDetectedType(null);
            setOutputUrl('');
         } else {
            setError('');
            setDetectedType(null);
            setOutputUrl('');
         }

      } catch (e) {
         setError('Invalid URL format.');
      }
   }, []);

   useEffect(() => {
      convertUrl(inputUrl);
   }, [inputUrl, convertUrl]);

   const copyToClipboard = () => {
      let textToCopy = outputUrl;
      if (activeTab === 'script') {
         textToCopy = `<script src="${outputUrl}"></script>`;
      } else if (activeTab === 'esm') {
         textToCopy = `import pkg from "${outputUrl}/+esm";`;
      }

      if (textToCopy) {
         navigator.clipboard.writeText(textToCopy);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      }
   };

   return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-cyan-500/30 font-sans">
         <NextSeo
            title="Migrate to StaticDelivr | CDN Converter"
            description="Switch from unpkg, jsDelivr, or cdnjs to a reliable multi-CDN infrastructure. Convert your links instantly."
            canonical="https://staticdelivr.com/migrate"
            openGraph={{
               url: 'https://staticdelivr.com/migrate',
               title: 'Migrate to StaticDelivr | CDN Converter',
               description: 'Switch from unpkg, jsDelivr, or cdnjs to a reliable multi-CDN infrastructure. Convert your links instantly.',
            }}
         />

         <Header />

         <main className="relative pt-32 pb-20 overflow-hidden">

            {/* Background Gradients (Cyan) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/10 dark:bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* --- Hero Section --- */}
            <section className="px-6 mb-16 relative z-10">
               <div className="max-w-4xl mx-auto text-center">

                  <FadeIn>
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                        <RefreshCw className="w-3 h-3" />
                        <span>$ staticdelivr --migrate --all</span>
                     </div>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                        Upgrade your<br />
                        <span className="text-zinc-400 dark:text-zinc-600">infrastructure.</span>
                     </h1>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                     <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                        Moving from <strong>unpkg</strong>, <strong>jsDelivr</strong>, or <strong>cdnjs</strong>?
                        Convert your links instantly. Same files, same structure, but delivered via our redundant multi-CDN edge.
                     </p>
                  </FadeIn>
               </div>
            </section>

            {/* --- Smart Converter --- */}
            <section className="px-6 mb-32 relative z-10">
               <div className="max-w-3xl mx-auto">
                  <FadeIn delay={0.3}>

                     {/* Input Card */}
                     <div className="relative z-20 mb-8">
                        <div className="relative group">
                           {/* Cyan Glow */}
                           <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                           <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden p-2">
                              <div className="flex items-center px-4 py-2">
                                 <Search className="w-5 h-5 text-zinc-400 mr-4" />
                                 <input
                                    type="text"
                                    value={inputUrl}
                                    onChange={(e) => setInputUrl(e.target.value)}
                                    placeholder="Paste unpkg, jsDelivr, or GitHub URL..."
                                    className="w-full bg-transparent border-none focus:ring-0 text-zinc-900 dark:text-white placeholder:text-zinc-400 font-mono text-sm h-10"
                                 />
                                 {detectedType && (
                                    <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-100 dark:border-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-xs font-medium whitespace-nowrap">
                                       <Sparkles className="w-3 h-3" />
                                       {detectedType}
                                    </div>
                                 )}
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

                     {/* Output Card */}
                     <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden">
                        {/* Header / Tabs */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                           <div className="flex items-center gap-1.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                           </div>
                           <div className="flex gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                              {(['url', 'script', 'esm'] as const).map((tab) => (
                                 <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-3 py-1 rounded-md text-[10px] font-medium transition-colors uppercase tracking-wider ${activeTab === tab
                                          ? 'bg-zinc-800 text-white'
                                          : 'text-zinc-500 hover:text-zinc-300'
                                       }`}
                                 >
                                    {tab}
                                 </button>
                              ))}
                           </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 font-mono text-sm break-all min-h-[100px] flex items-center">
                           {outputUrl ? (
                              <>
                                 {activeTab === 'url' && (
                                    <span className="text-green-400">{outputUrl}</span>
                                 )}
                                 {activeTab === 'script' && (
                                    <span className="text-zinc-400">
                                       <span className="text-purple-400">&lt;script</span> <span className="text-blue-400">src</span>=<span className="text-green-400">"{outputUrl}"</span><span className="text-purple-400">&gt;&lt;/script&gt;</span>
                                    </span>
                                 )}
                                 {activeTab === 'esm' && (
                                    <span className="text-zinc-400">
                                       <span className="text-purple-400">import</span> <span className="text-yellow-400">pkg</span> <span className="text-purple-400">from</span> <span className="text-green-400">"{outputUrl}/+esm"</span>;
                                    </span>
                                 )}
                              </>
                           ) : (
                              <span className="text-zinc-600 italic select-none">
                            // Waiting for valid input...
                              </span>
                           )}
                        </div>

                        {/* Actions */}
                        {outputUrl && (
                           <div className="px-4 py-3 border-t border-white/10 bg-white/5 flex justify-end gap-2">
                              <a
                                 href={outputUrl}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                 <ExternalLink className="w-3 h-3" /> Test URL
                              </a>
                              <button
                                 onClick={copyToClipboard}
                                 className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-zinc-900 hover:bg-zinc-200 transition-colors min-w-[80px] justify-center"
                              >
                                 {copied ? (
                                    <>
                                       <Check className="w-3 h-3 text-emerald-600" /> Copied
                                    </>
                                 ) : (
                                    <>
                                       <Copy className="w-3 h-3" /> Copy
                                    </>
                                 )}
                              </button>
                           </div>
                        )}
                     </div>

                  </FadeIn>
               </div>
            </section>

            {/* --- Why Migrate Grid (Cyan Accents) --- */}
            <section className="px-6 mb-32">
               <div className="max-w-6xl mx-auto">
                  <FadeIn className="mb-12 text-center">
                     <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">Why make the switch?</h2>
                  </FadeIn>

                  <div className="grid md:grid-cols-3 gap-6">

                     <FadeIn delay={0.1} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-900/10 flex items-center justify-center text-cyan-600 dark:text-cyan-500 mb-6">
                           <RefreshCw className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Auto-Redundancy</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                           We aggregate Cloudflare, Fastly, and Gcore. If one provider fails, we route traffic to another instantly.
                        </p>
                     </FadeIn>

                     <FadeIn delay={0.2} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-500 mb-6">
                           <Sparkles className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Smart Routing</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                           Our DNS steers users to the closest performant PoP, not just the closest datacenter, reducing latency.
                        </p>
                     </FadeIn>

                     <FadeIn delay={0.3} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-6">
                           <Search className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Global Scale</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                           With 570+ PoPs worldwide, we deliver assets from the edge, ensuring consistent speed for global audiences.
                        </p>
                     </FadeIn>

                  </div>
               </div>
            </section>

            {/* --- Batch Migration Reference --- */}
            <section className="px-6 mb-32">
               <div className="max-w-4xl mx-auto">
                  <FadeIn className="text-center mb-10">
                     <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Batch Migration Patterns</h2>
                     <p className="text-zinc-500 dark:text-zinc-400 mt-2">Use "Find & Replace" in your codebase with these patterns.</p>
                  </FadeIn>

                  <div className="space-y-6">

                     {/* jsDelivr Pattern */}
                     <FadeIn delay={0.1} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4 font-semibold text-zinc-900 dark:text-white">
                           <span className="w-2 h-2 rounded-full bg-orange-500" /> jsDelivr (NPM & GitHub)
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                           <code className="flex-1 w-full bg-zinc-100 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-red-500 dark:text-red-400 font-mono text-center">
                              cdn.jsdelivr.net
                           </code>
                           <ArrowRight className="w-5 h-5 text-zinc-300" />
                           <code className="flex-1 w-full bg-zinc-100 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-mono text-center">
                              cdn.staticdelivr.com
                           </code>
                        </div>
                        <p className="text-center text-xs text-zinc-500 mt-3">
                           Works for both <code>/npm/</code> and <code>/gh/</code> paths automatically.
                        </p>
                     </FadeIn>

                     {/* unpkg Pattern */}
                     <FadeIn delay={0.2} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4 font-semibold text-zinc-900 dark:text-white">
                           <span className="w-2 h-2 rounded-full bg-blue-500" /> unpkg
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                           <code className="flex-1 w-full bg-zinc-100 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-red-500 dark:text-red-400 font-mono text-center">
                              unpkg.com/
                           </code>
                           <ArrowRight className="w-5 h-5 text-zinc-300" />
                           <code className="flex-1 w-full bg-zinc-100 dark:bg-zinc-950 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-mono text-center">
                              cdn.staticdelivr.com/npm/
                           </code>
                        </div>
                        <p className="text-center text-xs text-zinc-500 mt-3">
                           Note: You must append <code>/npm/</code> to the replacement URL.
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
                           <Terminal className="w-5 h-5" />
                           <span>Read the full guide</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8 tracking-tight">
                           Need help with a large migration?
                        </h2>
                        <div className="flex justify-center gap-4">
                           <Link href="/docs/getting-started" className="h-12 px-8 rounded-full bg-white text-zinc-900 font-medium flex items-center hover:bg-zinc-200 transition-colors">
                              Read Docs <ArrowRight className="w-4 h-4 ml-2" />
                           </Link>
                           <Link href="/contact" className="h-12 px-8 rounded-full border border-zinc-700 text-white font-medium flex items-center hover:bg-zinc-800 transition-colors">
                              Contact Support
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

export default MigratePage;