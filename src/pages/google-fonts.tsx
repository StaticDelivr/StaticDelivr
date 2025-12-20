import React, { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
   Type, ArrowRight, Copy, Check,
   ExternalLink, Globe, Zap, ShieldCheck,
   Terminal, AlertCircle, Lock, MousePointerClick,
   Layers, Plus
} from 'lucide-react';
import { SiGooglefonts } from 'react-icons/si';

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

// --- Popular Fonts Data ---
const POPULAR_FONTS = [
   { name: 'Inter', weights: '100..900', label: 'Variable (100-900)' },
   { name: 'Roboto', weights: '100,300,400,500,700,900', label: '100, 300, 400, 500, 700, 900' },
   { name: 'Open Sans', weights: '300..800', label: 'Variable (300-800)' },
   { name: 'Poppins', weights: '100,200,300,400,500,600,700,800,900', label: '100-900 (All Weights)' },
   { name: 'Montserrat', weights: '100..900', label: 'Variable (100-900)' },
   { name: 'Lato', weights: '100,300,400,700,900', label: '100, 300, 400, 700, 900' },
];

const GoogleFontsPage = () => {
   // --- State ---
   const [inputUrl, setInputUrl] = useState('');
   const [outputUrl, setOutputUrl] = useState('');
   const [error, setError] = useState('');

   // UX States
   const [copiedConverter, setCopiedConverter] = useState(false);
   const [copiedMulti, setCopiedMulti] = useState(false);
   const [copiedFontName, setCopiedFontName] = useState<string | null>(null);

   const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');

   // --- Logic: Convert URL ---
   const convertUrl = useCallback((url: string): string => {
      if (!url.trim()) return '';

      const cdn = 'https://cdn.staticdelivr.com';

      // 1. CSS2 API (Handles simple and multiple families)
      const css2Match = url.match(/fonts\.googleapis\.com\/css2\?(.+)/);
      if (css2Match) {
         return `${cdn}/gfonts/css2?${css2Match[1]}`;
      }

      // 2. Legacy CSS API
      const cssMatch = url.match(/fonts\.googleapis\.com\/css\?(.+)/);
      if (cssMatch) {
         return `${cdn}/gfonts/css?${cssMatch[1]}`;
      }

      throw new Error('Invalid Google Fonts URL format');
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
            setError('Please paste a valid fonts.googleapis.com URL.');
         }
         setOutputUrl('');
      }
   }, [inputUrl, convertUrl]);

   // --- Clipboard Helpers ---
   const copyConverter = (text: string) => {
      navigator.clipboard.writeText(text);
      setCopiedConverter(true);
      setTimeout(() => setCopiedConverter(false), 2000);
   };

   const copyMulti = (text: string) => {
      navigator.clipboard.writeText(text);
      setCopiedMulti(true);
      setTimeout(() => setCopiedMulti(false), 2000);
   };

   const copyFont = (text: string, fontName: string) => {
      navigator.clipboard.writeText(text);
      setCopiedFontName(fontName);
      setTimeout(() => setCopiedFontName(null), 2000);
   };

   const generateFontUrl = (fontName: string, weights: string) => {
      const formattedWeights = weights.includes('..')
         ? weights
         : weights.replace(/,/g, ';');

      return `https://cdn.staticdelivr.com/gfonts/css2?family=${fontName.replace(/ /g, '+')}:wght@${formattedWeights}&display=swap`;
   };

   return (
      <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-amber-500/30 font-sans">
         <NextSeo
            title="Google Fonts Proxy - Privacy-focused Font CDN"
            description="Serve Google Fonts with better privacy and speed. Stop tracking, bypass filters, and improve performance with our global font proxy."
            canonical="https://staticdelivr.com/google-fonts"
            openGraph={{
               url: 'https://staticdelivr.com/google-fonts',
               title: 'Google Fonts Proxy - Fast & Private | StaticDelivr',
               description: 'A drop-in replacement for Google Fonts with zero tracking and optimized delivery. GDPR compliant font loading.',
            }}
         />

         <Header />

         <main className="relative pt-32 pb-20 overflow-hidden">

            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

            {/* --- Hero Section --- */}
            <section className="px-6 mb-16 relative z-10">
               <div className="max-w-4xl mx-auto text-center">

                  <FadeIn>
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                        <SiGooglefonts className="w-3 h-3" />
                        <span>$ staticdelivr --fonts --privacy</span>
                     </div>
                  </FadeIn>

                  <FadeIn delay={0.1}>
                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                        Google Fonts,<br />
                        <span className="text-zinc-500 dark:text-zinc-400">minus the tracking.</span>
                     </h1>
                  </FadeIn>

                  <FadeIn delay={0.2}>
                     <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                        A drop-in replacement for Google Fonts. Proxy CSS and font files through our global CDN to strip tracking cookies while maintaining 100% API compatibility.
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
                           <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                           <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden p-2">
                              <div className="flex items-center px-4 py-2">
                                 <Type className="w-5 h-5 text-zinc-400 mr-4" />
                                 <input
                                    type="text"
                                    value={inputUrl}
                                    onChange={(e) => setInputUrl(e.target.value)}
                                    placeholder="Paste Google Fonts URL (e.g. &family=Inter&family=Roboto...)"
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

                     {/* Output Card */}
                     <AnimatePresence>
                        {outputUrl && (
                           <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 20 }}
                              className="relative rounded-2xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden"
                           >
                              {/* Header / Tabs */}
                              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                                 <div className="flex items-center gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                                 </div>
                                 <div className="flex gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                                    <button
                                       onClick={() => setActiveTab('html')}
                                       className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${activeTab === 'html' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-300'
                                          }`}
                                    >
                                       HTML
                                    </button>
                                    <button
                                       onClick={() => setActiveTab('css')}
                                       className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${activeTab === 'css' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-300'
                                          }`}
                                    >
                                       CSS
                                    </button>
                                 </div>
                              </div>

                              {/* Content */}
                              <div className="p-6 font-mono text-sm break-all text-amber-400/90">
                                 {activeTab === 'html' ? (
                                    <span>
                                       <span className="text-blue-400">&lt;link</span> <span className="text-purple-400">href</span>=<span className="text-amber-400">"{outputUrl}"</span> <span className="text-purple-400">rel</span>=<span className="text-green-400">"stylesheet"</span><span className="text-blue-400">&gt;</span>
                                    </span>
                                 ) : (
                                    <span>
                                       <span className="text-purple-400">@import</span> url(<span className="text-amber-400">'{outputUrl}'</span>);
                                    </span>
                                 )}
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
                                    onClick={() => copyConverter(
                                       activeTab === 'html'
                                          ? `<link href="${outputUrl}" rel="stylesheet">`
                                          : `@import url('${outputUrl}');`
                                    )}
                                    aria-label="Copy generated code snippet"
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-zinc-900 hover:bg-zinc-200 transition-colors min-w-[80px] justify-center"
                                 >
                                    {copiedConverter ? (
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
                           </motion.div>
                        )}
                     </AnimatePresence>

                  </FadeIn>
               </div>
            </section>

            {/* --- Popular Fonts Quick Copy --- */}
            <section className="px-6 mb-32">
               <div className="max-w-6xl mx-auto">
                  <FadeIn className="mb-10 text-center">
                     <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Popular Fonts</h2>
                     <p className="text-zinc-500 dark:text-zinc-400 mt-2">Click any card to copy the optimized CDN URL.</p>
                  </FadeIn>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {POPULAR_FONTS.map((font, idx) => {
                        const isCopied = copiedFontName === font.name;
                        return (
                           <FadeIn key={font.name} delay={idx * 0.05}>
                              <button
                                 onClick={() => {
                                    const url = generateFontUrl(font.name, font.weights);
                                    copyFont(url, font.name);
                                 }}
                                 aria-label={`Copy ${font.name} font URL`}
                                 className="w-full h-full p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-amber-400 dark:hover:border-amber-500/50 hover:shadow-lg transition-all text-left group relative overflow-hidden flex flex-col justify-between"
                              >
                                 <div>
                                    <div className="flex justify-between items-start mb-2">
                                       <div className="text-4xl font-normal text-zinc-900 dark:text-white transition-colors group-hover:text-amber-600 dark:group-hover:text-amber-400" style={{ fontFamily: font.name }}>
                                          {font.name}
                                       </div>
                                       <div className={`transition-all duration-300 ${isCopied ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-100'}`}>
                                          {isCopied ? (
                                             <Check className="w-5 h-5 text-emerald-500" />
                                          ) : (
                                             <MousePointerClick className="w-4 h-4 text-amber-500" />
                                          )}
                                       </div>
                                    </div>
                                    <div className="text-sm text-zinc-900 dark:text-white" style={{ fontFamily: font.name }}>
                                       The quick brown fox jumps over the lazy dog.
                                    </div>
                                 </div>

                                 <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-end">
                                    <div>
                                       <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
                                          Weights Included
                                       </span>
                                       <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium">
                                          {font.label}
                                       </span>
                                    </div>
                                    {isCopied && (
                                       <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-pulse">
                                          Copied!
                                       </span>
                                    )}
                                 </div>
                              </button>
                           </FadeIn>
                        );
                     })}
                  </div>
               </div>
            </section>

            {/* --- Feature: Multiple Fonts (SEO Optimised) --- */}
            <section className="px-6 mb-32">
               <div className="max-w-4xl mx-auto">
                  <FadeIn delay={0.1}>
                     <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-8 md:p-10">
                        <div className="grid md:grid-cols-2 gap-10 items-center">
                           <div>
                              <div className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-500 font-medium mb-4">
                                 <Layers className="w-5 h-5" />
                                 <h3>Combined Requests</h3>
                              </div>
                              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                                 Load multiple font families in a single request.
                              </h2>
                              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                                 Don't make your users wait for multiple connections. Combine all your font definitions into one URL to reduce latency and improve PageSpeed scores.
                              </p>
                              <div className="text-sm text-zinc-500">
                                 <strong>Pro Tip:</strong> Paste your multi-family Google URL into the converter above — it works automatically!
                              </div>
                           </div>

                           <div className="bg-white dark:bg-black rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm font-mono text-xs overflow-x-auto">
                              <div className="text-zinc-400 mb-2">// Example: Open Sans + Poppins</div>
                              <div className="whitespace-pre-wrap break-all">
                                 <span className="text-blue-600 dark:text-blue-400">&lt;link</span>{' '}
                                 <span className="text-purple-600 dark:text-purple-400">href</span>=
                                 <span className="text-amber-600 dark:text-amber-400">
                                    "https://cdn.staticdelivr.com/gfonts/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@500;700&display=swap"
                                 </span>{' '}
                                 <span className="text-purple-600 dark:text-purple-400">rel</span>=
                                 <span className="text-green-600 dark:text-green-400">"stylesheet"</span>
                                 <span className="text-blue-600 dark:text-blue-400">&gt;</span>
                              </div>
                              <button
                                 onClick={() => copyMulti('<link href="https://cdn.staticdelivr.com/gfonts/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@500;700&display=swap" rel="stylesheet">')}
                                 aria-label="Copy multi-family font example"
                                 className={`mt-4 flex items-center gap-2 transition-colors ${copiedMulti ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                              >
                                 {copiedMulti ? (
                                    <>
                                       <Check className="w-3 h-3" /> Copied!
                                    </>
                                 ) : (
                                    <>
                                       <Copy className="w-3 h-3" /> Copy Example
                                    </>
                                 )}
                              </button>
                           </div>
                        </div>
                     </div>
                  </FadeIn>
               </div>
            </section>

            {/* --- Why Switch? Features --- */}
            <section className="px-6 mb-32">
               <div className="max-w-6xl mx-auto">
                  <div className="grid md:grid-cols-3 gap-6">
                     <FadeIn delay={0.1} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/10 flex items-center justify-center text-amber-600 dark:text-amber-500 mb-6">
                           <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Privacy First</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                           We strip all user-identifying data and tracking cookies before upstreaming the request to Google. Your users remain anonymous.
                        </p>
                     </FadeIn>

                     <FadeIn delay={0.2} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-500 mb-6">
                           <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">HTTP/3 & Brotli</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                           Files are served over the latest HTTP/3 protocol and compressed with Brotli for faster font loading times.
                        </p>
                     </FadeIn>

                     <FadeIn delay={0.3} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 mb-6">
                           <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">GDPR Compliant</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">
                           Because we act as a privacy shield, you don't need to declare Google Fonts usage in your cookie banner.
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

export default GoogleFontsPage;