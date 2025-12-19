import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { 
  Server, Zap, Code2, Heart, ArrowRight, 
  Globe, ShieldCheck, Mail, Terminal, 
  Handshake, BarChart3
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
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

// --- Code Block Visual (With Live Data) ---
const JsonVisual = ({ requests, carbon }: { requests: string, carbon: string }) => (
  <div className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-xl font-mono text-sm">
    <div className="h-10 bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 flex items-center px-4 justify-between">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-rose-400"></div>
        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
      </div>
      <div className="text-xs text-zinc-400">sponsorship_config.json</div>
    </div>
    <div className="p-6 overflow-x-auto">
      <div className="text-zinc-600 dark:text-zinc-400 space-y-1">
        <div><span className="text-purple-600 dark:text-purple-400">"sponsor_goals"</span>: {'{'}</div>
        <div className="pl-4">
          <span className="text-blue-600 dark:text-blue-400">"brand_visibility"</span>: <span className="text-emerald-600 dark:text-emerald-500">true</span>,
        </div>
        <div className="pl-4">
          <span className="text-blue-600 dark:text-blue-400">"sustainability"</span>: <span className="text-emerald-600 dark:text-emerald-500">true</span>,
        </div>
        <div className="pl-4">
          <span className="text-blue-600 dark:text-blue-400">"hiring_pool"</span>: <span className="text-amber-600 dark:text-amber-500">"global_engineers"</span>
        </div>
        <div>{'}'},</div>
        <div><span className="text-purple-600 dark:text-purple-400">"impact_metrics"</span>: {'{'}</div>
        <div className="pl-4">
          <span className="text-blue-600 dark:text-blue-400">"monthly_requests"</span>: <span className="text-rose-500">{requests}</span>,
        </div>
        <div className="pl-4">
          <span className="text-blue-600 dark:text-blue-400">"carbon_avoided"</span>: <span className="text-amber-600 dark:text-amber-500">"{carbon}_annually"</span>
        </div>
        <div>{'}'}</div>
      </div>
    </div>
  </div>
);

// --- Data Fetching (ISR) ---
interface PageProps {
  stats: {
    requests: string;
    carbon: string;
  };
}

export async function getStaticProps() {
  const props = {
    stats: { 
      requests: "800,000,000", 
      carbon: "120t" 
    }
  };

  try {
    // 1. Fetch from API
    const res = await fetch('https://stats.staticdelivr.com/api/stats?month=previous');
    const data = await res.json();
    const totalRequests = data?.total?.requests || 800000000;

    // 2. Format Requests
    props.stats.requests = new Intl.NumberFormat('en-US').format(totalRequests);

    // 3. Calculate Carbon Impact (Logic mirrored from Impact Page)
    // Assumption: 30% of requests are images, saving ~400KB per request vs unoptimized
    const imageReqs = totalRequests * 0.30;
    const bytesSaved = imageReqs * (400 * 1024);
    const gbSaved = bytesSaved / (1024 * 1024 * 1024);
    const kwhSaved = gbSaved * 0.15; // 0.15 kWh per GB
    const kgCo2 = kwhSaved * 0.475; // 0.475 kg CO2 per kWh
    
    // Annualize it (Monthly * 12) and convert to Tonnes
    const annualTonnes = (kgCo2 * 12) / 1000;
    props.stats.carbon = `${Math.round(annualTonnes)}t`;

  } catch (error) {
    console.error("Error fetching stats:", error);
  }

  return { 
    props, 
    revalidate: 3600 // Revalidate every hour
  };
}

const BecomeSponsorPage: React.FC<PageProps> = ({ stats }) => {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-rose-500/30 font-sans">
      <Head>
        <title>Become a Sponsor | StaticDelivr</title>
        <meta name="description" content="Support the infrastructure that powers the open source web." />
      </Head>

      <Header />

      <main className="relative pt-32 pb-20 overflow-hidden">
        
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-rose-500/10 dark:bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* --- Hero Section --- */}
        <section className="px-6 mb-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                <Terminal className="w-3 h-3" />
                <span>$ staticdelivr --sponsor</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                Infrastructure for the<br />
                <span className="text-zinc-400 dark:text-zinc-600">open web.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                We are looking for organizations aligned with our mission to provide <strong className="font-semibold text-zinc-900 dark:text-white">free, fast, and carbon-neutral</strong> delivery for open source projects.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <a 
                 href="mailto:sponsors@staticdelivr.com?subject=Sponsorship%20Inquiry" 
                 className="h-12 px-8 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium flex items-center hover:opacity-90 transition-opacity"
               >
                  <Mail className="w-4 h-4 mr-2" /> Contact Team
               </a>
               <Link 
                 href="/impact" 
                 className="h-12 px-8 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-medium flex items-center hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
               >
                  View Impact Report <ArrowRight className="w-4 h-4 ml-2" />
               </Link>
            </FadeIn>
          </div>
        </section>

        {/* --- The Value Prop (Split Layout) --- */}
        <section className="px-6 mb-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left: Text Content */}
              <FadeIn>
                <div className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-500 font-medium mb-6">
                  <Handshake className="w-5 h-5" />
                  <span>Strategic Alignment</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold text-zinc-900 dark:text-white tracking-tight mb-6 leading-[1.1]">
                  CSR meets <br />
                  <span className="text-zinc-400 dark:text-zinc-600">Engineering.</span>
                </h2>
                <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                  <p>
                    Sponsoring StaticDelivr isn't a donation; it's a strategic alliance. We help you achieve <strong className="text-zinc-900 dark:text-white font-medium">Corporate Social Responsibility</strong> goals by democratizing access and reducing digital carbon footprints.
                  </p>
                  <p>
                    In return, your brand gains visibility among millions of developers and demonstrates technical leadership by powering a global edge network.
                  </p>
                </div>
              </FadeIn>

              {/* Right: Visual */}
              <FadeIn delay={0.2} className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-blue-500/20 blur-3xl rounded-full opacity-50" />
                <JsonVisual requests={stats.requests} carbon={stats.carbon} />
              </FadeIn>

            </div>
          </div>
        </section>

        {/* --- What We Need (Sponsorship Areas) --- */}
        <section className="px-6 mb-32">
           <div className="max-w-6xl mx-auto">
              <FadeIn className="text-center mb-16">
                 <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">How you can contribute</h2>
                 <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                    We prefer <strong className="text-zinc-900 dark:text-white">resources over cash</strong>. 
                    If your company provides infrastructure, observability, or engineering talent, let's integrate.
                 </p>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 
                 {/* 1. Infrastructure */}
                 <FadeIn delay={0.1}>
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-shadow hover:shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                           <Server className="w-6 h-6" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Core Infrastructure</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                           We process petabytes of traffic. We need Edge Nodes (VPS), Object Storage (S3-compatible), and Global DNS services.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-auto">
                           <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-semibold text-zinc-500">Compute</span>
                           <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-semibold text-zinc-500">Bandwidth</span>
                        </div>
                    </div>
                 </FadeIn>

                 {/* 2. Tooling / SaaS */}
                 <FadeIn delay={0.2}>
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-shadow hover:shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/10 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                           <Zap className="w-6 h-6" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Enterprise Tooling</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                           Observability is key to uptime. We need enterprise accounts for log management, error tracking, and security scanning.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-auto">
                           <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-semibold text-zinc-500">Logs</span>
                           <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-semibold text-zinc-500">APM</span>
                        </div>
                    </div>
                 </FadeIn>

                 {/* 3. Engineering */}
                 <FadeIn delay={0.3}>
                    <div className="group relative h-full overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 transition-shadow hover:shadow-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                        
                        <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/10 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-6 group-hover:scale-110 transition-transform">
                           <Code2 className="w-6 h-6" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Engineering Time</h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                           Assign engineering hours to help maintain our open source integrations or sponsor specific plugin development.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-auto">
                           <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-semibold text-zinc-500">Audit</span>
                           <span className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-[10px] uppercase font-semibold text-zinc-500">Dev</span>
                        </div>
                    </div>
                 </FadeIn>

              </div>
           </div>
        </section>

        {/* --- Benefits Grid --- */}
        <section className="px-6 mb-32">
          <div className="max-w-5xl mx-auto">
             <FadeIn className="text-center mb-16">
                <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">Why Sponsor?</h2>
             </FadeIn>
             
             <div className="grid md:grid-cols-2 gap-4">
                <FadeIn delay={0.1} className="flex gap-5 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                   <div className="shrink-0 w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                   </div>
                   <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Brand Visibility</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Top-tier logo placement on our homepage, documentation, and GitHub repository.
                      </p>
                   </div>
                </FadeIn>

                <FadeIn delay={0.2} className="flex gap-5 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                   <div className="shrink-0 w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                   </div>
                   <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Technical Credibility</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Prove your infrastructure's reliability by powering a high-traffic, global CDN.
                      </p>
                   </div>
                </FadeIn>
                
                <FadeIn delay={0.3} className="flex gap-5 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                   <div className="shrink-0 w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                   </div>
                   <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Talent Acquisition</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Appeal to engineers who value open source, performance, and digital equity.
                      </p>
                   </div>
                </FadeIn>

                <FadeIn delay={0.4} className="flex gap-5 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                   <div className="shrink-0 w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-zinc-600 dark:text-zinc-400" />
                   </div>
                   <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Case Studies</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        We write detailed technical blog posts about how our sponsors help solve our scale challenges.
                      </p>
                   </div>
                </FadeIn>
             </div>
          </div>
        </section>

        {/* --- Final CTA --- */}
        <section className="px-6 pb-24 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 p-12 md:p-20 text-center shadow-2xl">
              {/* Glow Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/40 via-zinc-900 to-transparent opacity-50 pointer-events-none" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                  Build a lasting legacy.<br />
                </h2>
                <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                  Your infrastructure support directly translates to a faster, greener, and more accessible internet for millions. Let's make it happen.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="mailto:sponsors@staticdelivr.com?subject=Sponsorship%20Inquiry"
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-zinc-950 transition-all duration-300 hover:bg-zinc-200 hover:scale-105"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    sponsors@staticdelivr.com
                  </a>
                  <Link
                    href="/sponsors"
                    className="inline-flex h-12 items-center justify-center rounded-full px-8 font-medium text-white transition-colors hover:text-zinc-300 border border-zinc-700 hover:bg-zinc-800"
                  >
                    See current sponsors
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

export default BecomeSponsorPage;