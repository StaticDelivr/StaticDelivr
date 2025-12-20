import React, { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
   Package, Search, Copy, Check, Terminal,
   Zap, Globe, Layers, ArrowRight, Code2,
   Box, ExternalLink, FileJson
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

// --- Types ---
interface Suggestion {
   name: string;
   description: string;
   version: string;
}

// Popular packages for quick access
const POPULAR_PACKAGES = [
   { name: 'react', version: 'latest', file: 'umd/react.production.min.js' },
   { name: 'vue', version: 'latest', file: 'dist/vue.global.prod.js' },
   { name: 'axios', version: 'latest', file: 'dist/axios.min.js' },
   { name: 'gsap', version: 'latest', file: 'dist/gsap.min.js' },
   { name: 'three', version: 'latest', file: 'build/three.min.js' },
];

const NpmPage = () => {
   // --- State ---
   const [packageInput, setPackageInput] = useState('');
   const [generatedUrl, setGeneratedUrl] = useState('');
   const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
   const [showSuggestions, setShowSuggestions] = useState(false);
   const [isSearching, setIsSearching] = useState(false);
   const [copiedUrl, setCopiedUrl] = useState(false);
   const [copiedScript, setCopiedScript] = useState(false);
   const [activeTab, setActiveTab] = useState<'url' | 'script' | 'esm'>('url');

   // --- Logic: Search ---
   useEffect(() => {
      const searchPackages = async () => {
         const searchTerm = packageInput.split('@')[0].split('/')[0];
         if (!searchTerm || searchTerm.length < 2) {
            setSuggestions([]);
            return;
         }

         setIsSearching(true);
         try {
            const response = await fetch(
               `https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(searchTerm)}&size=5`
            );
            if (response.ok) {
               const data = await response.json();
               setSuggestions(
                  data.objects.map((obj: any) => ({
                     name: obj.package.name,
                     description: obj.package.description || '',
                     version: obj.package.version,
                  }))
               );
            }
         } catch (error) {
            console.error('Error searching npm:', error);
         } finally {
            setIsSearching(false);
         }
      };

      const debounceTimer = setTimeout(searchPackages, 300);
      return () => clearTimeout(debounceTimer);
   }, [packageInput]);

   // --- Logic: Generate URL ---
   const generateCdnUrl = useCallback((input: string) => {
      if (!input.trim()) {
         setGeneratedUrl('');
         return;
      }

      let packageName = input.trim();
      let version = 'latest';
      let file = '';

      // Handle @scope/pkg logic vs pkg@version logic
      // Simplistic parser for display purposes
      if (packageName.includes('@') && !packageName.startsWith('@')) {
         const parts = packageName.split('@');
         packageName = parts[0];
         const rest = parts[1]; // version/file
         if (rest.includes('/')) {
            const slashIdx = rest.indexOf('/');
            version = rest.substring(0, slashIdx);
            file = rest.substring(slashIdx + 1);
         } else {
            version = rest;
         }
      } else if (packageName.startsWith('@')) {
         // Scoped package logic would go here, simplified for now
      }

      // Default URL construction
      let url = `https://cdn.staticdelivr.com/npm/${input}`;
      // If user typed bare name, append latest
      if (!input.includes('@') && !input.includes('/')) {
         url = `https://cdn.staticdelivr.com/npm/${input}@latest`;
      }

      setGeneratedUrl(url);
   }, []);

   useEffect(() => {
      generateCdnUrl(packageInput);
   }, [packageInput, generateCdnUrl]);

   // --- Handlers ---
   const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   const selectPackage = (name: string, version: string, file?: string) => {
      let val = `${name}@${version}`;
      if (file) val += `/${file}`;
      setPackageInput(val);
      setShowSuggestions(false);
   };

   return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-red-500/30 font-sans">
         <NextSeo
            title="npm CDN - Search & Serve npm Packages"
            description="Instant access to 2M+ npm packages via our global edge network. Search, find files, and get production-ready CDN links in seconds."
            canonical="https://staticdelivr.com/npm"
            openGraph={{
               url: 'https://staticdelivr.com/npm',
               title: 'npm CDN - Search & Serve npm Packages | StaticDelivr',
               description: 'The fastest way to load npm packages in the browser. Always free, zero configuration, global delivery.',
            }}
         />

         <Header />

         <main className="relative pt-32 pb-20 overflow-hidden">

            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-red-500/10 dark:bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* --- Hero Section --- */}
            <section className="px-6 mb-16 relative z-10">
               <div className="max-w-4xl mx-auto text-center">

                  <FadeIn>
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                        <Terminal className="w-3 h-3" />
                        <span>$ staticdelivr --npm --registry</span>
                     </div>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                        The edge registry for<br />
                        <span className="text-zinc-400 dark:text-zinc-600">frontend packages.</span>
                     </h1>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                     <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                        Instantly serve files from any NPM package. No build tools, no configuration.
                        Just use the URL and we handle the caching and compression.
                     </p>
                  </FadeIn>
               </div>
            </section>

            {/* --- Main Tool Section --- */}
            <section className="px-6 mb-32 relative z-10">
               <div className="max-w-3xl mx-auto">
                  <FadeIn delay={0.3}>

                     {/* Search Container */}
                     <div className="relative z-20 mb-8">
                        <div className="relative group">
                           <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                           <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden">

                              {/* Input Area */}
                              <div className="flex items-center px-6 py-4">
                                 <Search className="w-5 h-5 text-zinc-400 mr-4" />
                                 <input
                                    type="text"
                                    value={packageInput}
                                    onChange={(e) => {
                                       setPackageInput(e.target.value);
                                       setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                    placeholder="react@18.2.0/umd/react.production.min.js"
                                    className="w-full bg-transparent border-none focus:ring-0 text-lg text-zinc-900 dark:text-white placeholder:text-zinc-400 font-mono"
                                 />
                                 {isSearching && <div className="animate-spin w-4 h-4 border-2 border-zinc-300 border-t-zinc-600 rounded-full" />}
                              </div>

                              {/* Suggestions Dropdown */}
                              <AnimatePresence>
                                 {showSuggestions && suggestions.length > 0 && (
                                    <motion.div
                                       initial={{ height: 0 }}
                                       animate={{ height: 'auto' }}
                                       exit={{ height: 0 }}
                                       className="border-t border-zinc-100 dark:border-zinc-800"
                                    >
                                       {suggestions.map((suggestion) => (
                                          <button
                                             key={suggestion.name}
                                             onClick={() => selectPackage(suggestion.name, suggestion.version)}
                                             className="w-full text-left px-6 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 flex items-center justify-between group/item transition-colors"
                                          >
                                             <div>
                                                <div className="font-medium text-zinc-900 dark:text-white flex items-center gap-2">
                                                   {suggestion.name}
                                                   <span className="text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">{suggestion.version}</span>
                                                </div>
                                                <div className="text-xs text-zinc-500 truncate max-w-sm mt-0.5">{suggestion.description}</div>
                                             </div>
                                             <ArrowRight className="w-4 h-4 text-zinc-300 group-hover/item:text-red-500 transition-colors" />
                                          </button>
                                       ))}
                                    </motion.div>
                                 )}
                              </AnimatePresence>
                           </div>
                        </div>

                        {/* Popular Tags */}
                        <div className="mt-4 flex flex-wrap gap-2 items-center justify-center">
                           <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider mr-2">Popular:</span>
                           {POPULAR_PACKAGES.map(pkg => (
                              <button
                                 key={pkg.name}
                                 onClick={() => selectPackage(pkg.name, pkg.version, pkg.file)}
                                 className="px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-600 dark:text-zinc-400 hover:border-red-500/50 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                              >
                                 {pkg.name}
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Code Output Block */}
                     <div className="relative rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden">
                        {/* Header / Tabs */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/50">
                           <div className="flex items-center gap-1">
                              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                           </div>
                           <div className="flex gap-1 bg-zinc-950 p-1 rounded-lg">
                              {['url', 'script', 'esm'].map((tab) => (
                                 <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${activeTab === tab
                                       ? 'bg-zinc-800 text-white'
                                       : 'text-zinc-500 hover:text-zinc-300'
                                       }`}
                                 >
                                    {tab.toUpperCase()}
                                 </button>
                              ))}
                           </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 font-mono text-sm overflow-x-auto">
                           {generatedUrl ? (
                              <>
                                 {activeTab === 'url' && (
                                    <div className="text-zinc-300 break-all">{generatedUrl}</div>
                                 )}
                                 {activeTab === 'script' && (
                                    <div className="text-zinc-400 break-all">
                                       <span className="text-purple-400">&lt;script</span> <span className="text-blue-400">src</span>=<span className="text-green-400">"{generatedUrl}"</span><span className="text-purple-400">&gt;&lt;/script&gt;</span>
                                    </div>
                                 )}
                                 {activeTab === 'esm' && (
                                    <div className="text-zinc-400 break-all">
                                       <span className="text-purple-400">import</span> <span className="text-yellow-400">pkg</span> <span className="text-purple-400">from</span> <span className="text-green-400">"{generatedUrl}/+esm"</span>;
                                    </div>
                                 )}
                              </>
                           ) : (
                              <div className="text-zinc-600 italic select-none">
                            // Search for a package above to generate snippets...
                              </div>
                           )}
                        </div>

                        {/* Copy Action */}
                        {generatedUrl && (
                           <div className="absolute top-[52px] right-4">
                              <button
                                 onClick={() => {
                                    const text = activeTab === 'url' ? generatedUrl :
                                       activeTab === 'script' ? `<script src="${generatedUrl}"></script>` :
                                          `import pkg from "${generatedUrl}/+esm";`;
                                    copyToClipboard(text, setCopiedUrl);
                                 }}
                                 aria-label="Copy code snippet"
                                 className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
                              >
                                 {copiedUrl ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                              </button>
                           </div>
                        )}
                     </div>

                  </FadeIn>
               </div>
            </section>

            {/* --- Stats Section --- */}
            <section className="px-6 mb-32 relative z-10">
               <div className="max-w-6xl mx-auto border-y border-zinc-200 dark:border-zinc-800 py-12">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                     <FadeIn delay={0.1} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-1">2M+</div>
                        <div className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Packages</div>
                     </FadeIn>
                     <FadeIn delay={0.2} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-1">&lt;50ms</div>
                        <div className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Global Latency</div>
                     </FadeIn>
                     <FadeIn delay={0.3} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-1">570+</div>
                        <div className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Edge PoPs</div>
                     </FadeIn>
                     <FadeIn delay={0.4} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-1">100%</div>
                        <div className="text-xs uppercase tracking-wider text-zinc-500 font-medium">Free</div>
                     </FadeIn>
                  </div>
               </div>
            </section>

            {/* --- Features Grid --- */}
            <section className="px-6 mb-32">
               <div className="max-w-6xl mx-auto">
                  <div className="grid md:grid-cols-3 gap-6">

                     {/* Feature 1 */}
                     <FadeIn delay={0.1} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center text-orange-600 dark:text-orange-500 mb-6">
                           <Layers className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Version Pinning</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                           Use semver ranges (<code>@^1.0.0</code>), exact versions (<code>@1.2.3</code>), or tags (<code>@latest</code>). We cache immutable versions forever.
                        </p>
                     </FadeIn>

                     {/* Feature 2 */}
                     <FadeIn delay={0.2} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-500 mb-6">
                           <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Smart Optimization</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                           Files are automatically minified and served with Brotli/Gzip compression based on the user's browser capabilities.
                        </p>
                     </FadeIn>

                     {/* Feature 3 */}
                     <FadeIn delay={0.3} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-6">
                           <Code2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">ES Modules</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                           Add <code>/+esm</code> to any URL to get an ES Module ready for modern browser imports, automatically resolving dependencies.
                        </p>
                     </FadeIn>

                  </div>
               </div>
            </section>

            {/* --- URL Structure Diagram --- */}
            <section className="px-6 mb-32">
               <div className="max-w-4xl mx-auto">
                  <FadeIn className="text-center mb-10">
                     <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Understand the Structure</h2>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                     <div className="flex flex-col md:flex-row gap-4 items-center justify-center font-mono text-sm md:text-base">
                        <div className="px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-400">
                           cdn.staticdelivr.com
                        </div>
                        <div className="text-zinc-300">/</div>
                        <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400">
                           npm
                        </div>
                        <div className="text-zinc-300">/</div>
                        <div className="px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30 text-blue-600 dark:text-blue-400">
                           package@version
                        </div>
                        <div className="text-zinc-300">/</div>
                        <div className="px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                           file.js
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
                           <Box className="w-5 h-5" />
                           <span>Ready to ship?</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-8 tracking-tight">
                           Read the full<br />
                           <span className="text-zinc-400">API Documentation</span>
                        </h2>
                        <div className="flex justify-center gap-4">
                           <Link href="/docs" className="h-12 px-8 rounded-full bg-white text-zinc-900 font-medium flex items-center hover:bg-zinc-200 transition-colors">
                              Documentation <ArrowRight className="w-4 h-4 ml-2" />
                           </Link>
                           <Link href="https://github.com/staticdelivr/staticdelivr" target="_blank" className="h-12 px-8 rounded-full border border-zinc-700 text-white font-medium flex items-center hover:bg-zinc-800 transition-colors">
                              GitHub
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

export default NpmPage;