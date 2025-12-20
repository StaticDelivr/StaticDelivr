import React from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Github, Heart, Bug, Terminal,
  GitBranch, FileText, ArrowRight,
  Code2, MessageSquare, ExternalLink
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

const ContributePage = () => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-blue-500/30 font-sans">
      <NextSeo
        title="Contribute to StaticDelivr - Help Build the Future"
        description="Join the community building the future of open source delivery. Contribute code, report bugs, improve documentation, or sponsor infrastructure."
        canonical="https://staticdelivr.com/contribute"
        openGraph={{
          url: 'https://staticdelivr.com/contribute',
          title: 'Contribute to Open Source - StaticDelivr Community',
          description: 'Help us make the web faster and fairer. Join our open source project and contribute to the next generation of content delivery.',
        }}
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
                <Terminal className="w-3 h-3" />
                <span>$ staticdelivr --contribute</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                Build the future of<br />
                <span className="text-zinc-400 dark:text-zinc-600">open source delivery.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                StaticDelivr is community-driven. Whether you're fixing a bug, improving documentation, or sponsoring infrastructure, your contribution helps millions of developers.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="https://github.com/StaticDelivr/StaticDelivr"
                target="_blank"
                className="h-12 px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium flex items-center hover:opacity-90 transition-opacity"
              >
                <Github className="w-4 h-4 mr-2" /> Star on GitHub
              </Link>
              <Link
                href="#ways-to-help"
                className="h-12 px-8 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              >
                View Contribution Guide
              </Link>
            </FadeIn>
          </div>
        </section>

        {/* --- Ways to Contribute Grid --- */}
        <section id="ways-to-help" className="px-6 mb-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            <FadeIn className="mb-12">
              <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">How you can help</h2>
              <p className="text-zinc-500 dark:text-zinc-400">No contribution is too small.</p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-6">

              {/* 1. Code Contribution */}
              <FadeIn delay={0.1}>
                <Link
                  href="https://github.com/StaticDelivr/StaticDelivr"
                  target="_blank"
                  className="group relative block h-full p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-transparent dark:from-zinc-800/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white mb-6 group-hover:scale-110 transition-transform">
                      <Code2 className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Contribute Code</h3>
                      <ExternalLink className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                      Pick up an issue labeled <code>good first issue</code>, optimize our edge logic, maintain our npm packages, or help maintain our WordPress plugin.
                    </p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-semibold text-zinc-500">React</span>
                      <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-semibold text-zinc-500">Next.js</span>
                      <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-semibold text-zinc-500">JavaScript</span>
                      <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-semibold text-zinc-500">TypeScript</span>
                      <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-semibold text-zinc-500">NPM</span>
                      <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-semibold text-zinc-500">PHP</span>
                    </div>
                  </div>
                </Link>
              </FadeIn>

              {/* 2. Bug Reports */}
              <FadeIn delay={0.2}>
                <Link
                  href="https://github.com/StaticDelivr/StaticDelivr/issues"
                  target="_blank"
                  className="group relative block h-full p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/10 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-6 group-hover:scale-110 transition-transform">
                      <Bug className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Report Bugs</h3>
                      <ExternalLink className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                      Found something broken? Detailed bug reports are improved contributions. Help us make the CDN more stable.
                    </p>
                    <div className="mt-auto text-sm font-medium text-orange-600 dark:text-orange-400 flex items-center">
                      Go to Issues <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </FadeIn>

              {/* 3. Documentation */}
              <FadeIn delay={0.3}>
                <Link
                  href="/docs"
                  className="group relative block h-full p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Improve Docs</h3>
                      <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Clear documentation is key to adoption. Fix typos, clarify examples, or write new guides for our integration tools.
                    </p>
                  </div>
                </Link>
              </FadeIn>

              {/* 4. Sponsorship */}
              <FadeIn delay={0.4}>
                <Link
                  href="/become-a-sponsor"
                  className="group relative block h-full p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/10 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-6 group-hover:scale-110 transition-transform">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Support Financially</h3>
                      <ArrowRight className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-rose-500 transition-colors" />
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      Don't have time to code? Sponsoring infrastructure helps keep the network free and fast for everyone.
                    </p>
                  </div>
                </Link>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* --- Community CTA --- */}
        <section className="px-6 pb-24 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 p-12 md:p-20 text-center shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#27272a_0%,_transparent_70%)] opacity-50 pointer-events-none" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-zinc-400 font-medium mb-6">
                  <MessageSquare className="w-5 h-5" />
                  <span>Join the conversation</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                  Got ideas? Let's discuss.
                </h2>
                <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                  The best features start with a discussion. Join our community on GitHub to share your ideas for the next version of StaticDelivr.
                </p>
                <div className="flex justify-center">
                  <Link
                    href="https://github.com/StaticDelivr/StaticDelivr/discussions"
                    target="_blank"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
                  >
                    Join GitHub Discussions <ExternalLink className="ml-2 h-4 w-4" />
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

export default ContributePage;