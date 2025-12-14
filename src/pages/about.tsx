import React from 'react';
import Head from 'next/head';
import { Code2, Users, Zap, Share2, Shield, Globe2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuroraBackground } from '../components/ui/aurora-background';
import { BentoGrid, BentoCard } from '../components/ui/bento-grid';
import { BlurFade } from '../components/ui/blur-fade';

// Background components for Bento Cards
const CodeBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute top-4 left-4 text-blue-500 font-mono text-xs opacity-50">
        <div>import &#123; future &#125; from 'open-source';</div>
        <div className="ml-4">const build = async () =&gt; &#123;</div>
        <div className="ml-8">await collaborate();</div>
        <div className="ml-4">&#125;;</div>
      </div>
      <Code2 className="absolute -bottom-8 -right-8 w-48 h-48 text-blue-500/20" />
    </div>
  </div>
);

const ZapBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20">
    <svg className="absolute top-0 left-1/4 w-16 h-32 text-yellow-500 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
    <svg className="absolute top-8 right-1/4 w-12 h-24 text-yellow-400 animate-pulse" style={{ animationDelay: "0.3s" }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  </div>
);

const ShareBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-15">
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent" />
      <Share2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-green-500/20" />
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-green-500 rounded-full animate-ping" />
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-green-500 rounded-full animate-ping" style={{ animationDelay: "0.5s" }} />
    </div>
  </div>
);

const ServerBackground = () => (
  <div className="absolute inset-0 overflow-hidden opacity-15">
    <div className="absolute top-4 left-4 right-4 grid grid-cols-4 gap-2">
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="h-3 rounded-sm bg-purple-500 animate-pulse"
          style={{ animationDelay: `${i * 0.1}s`, animationDuration: "1.5s" }}
        />
      ))}
    </div>
  </div>
);

const features = [
  {
    Icon: Code2,
    name: "Open-Source Development",
    description: "We believe in the power of open-source development and are committed to supporting the community with our platform.",
    href: "/contribute",
    cta: "Contribute",
    background: <CodeBackground />,
    className: "col-span-1",
  },
  {
    Icon: Zap,
    name: "Developer Experience",
    description: "We strive to make the developer experience as seamless as possible by integrating with popular package managers and providing reliable and fast delivery of assets.",
    href: "/docs",
    cta: "Read Docs",
    background: <ZapBackground />,
    className: "col-span-1",
  },
  {
    Icon: Share2,
    name: "Collaboration and Sharing",
    description: "We are dedicated to providing a platform for developers to collaborate and share their projects with the world.",
    href: "/github",
    cta: "Join Us",
    background: <ShareBackground />,
    className: "col-span-1",
  },
  {
    Icon: Users,
    name: "Performance and Reliability",
    description: "We know how important it is to have fast and reliable delivery of your assets. That's why we're committed to delivering your assets quickly and securely.",
    href: "/network",
    cta: "View Network",
    background: <ServerBackground />,
    className: "col-span-1",
  },
];

const AboutPage = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>About - StaticDelivr</title>
        <meta name="description" content="Learn about StaticDelivr, a free CDN for open-source projects that ensures fast and reliable delivery of assets, libraries, and resources worldwide." />
        <meta name="keywords" content="StaticDelivr, free CDN, open source CDN, content delivery network, CDN for open-source projects, fast CDN, reliable CDN, open-source assets delivery, web performance, content delivery, global CDN, infrastructure for open-source, fast delivery of resources" />
        <meta name="robots" content="index, follow" />

        <meta property="og:url" content="https://staticdelivr.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About - StaticDelivr" />
        <meta property="og:description" content="Learn about StaticDelivr, a free CDN for open-source projects that ensures fast and reliable delivery of assets, libraries, and resources worldwide." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/about" />
        <meta name="twitter:title" content="About - StaticDelivr" />
        <meta name="twitter:description" content="Learn about StaticDelivr, a free CDN for open-source projects that ensures fast and reliable delivery of assets, libraries, and resources worldwide." />
        <meta name="twitter:image" content="" />
      </Head>

      <Header />
      
      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[60vh] py-32">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
              About StaticDelivr
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              We are committed to making open-source projects more accessible 
              and easier to use for developers worldwide.
            </p>
          </div>
        </AuroraBackground>

        {/* Main Content */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-3xl mx-auto prose prose-lg prose-zinc dark:prose-invert">
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              At StaticDelivr, we are committed to making open-source projects more accessible 
              and easier to use for developers worldwide. Our platform provides an efficient 
              and reliable way to deliver assets, libraries, and resources for open-source projects.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              As an open-source enthusiast, you know how critical it is to have a fast and 
              efficient way to deliver your projects to users. With StaticDelivr, you can 
              deliver your assets with ease, no matter the size or complexity of your project. 
              Plus, our platform integrates seamlessly with popular package managers like npm 
              and GitHub, making it easy for developers to integrate your project into their workflow.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              Our team is dedicated to supporting the open-source community by providing a free 
              and open platform for developers to share and collaborate on their projects. With 
              StaticDelivr, you can be confident that your assets are being delivered quickly 
              and securely to developers worldwide.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We believe that open-source development is the future of software development, 
              and we are committed to providing the tools and resources that developers need 
              to make their projects successful. Join us today and see how StaticDelivr can 
              help you take your open-source project to the next level.
            </p>
          </div>
        </section>

        {/* Focus Areas Section */}
        <section className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.1} inView>
              <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-16">
                What We Are Focused On
              </h2>
            </BlurFade>
            
            <BlurFade delay={0.2} inView>
              <BentoGrid className="grid-cols-1 md:grid-cols-2 auto-rows-[20rem]">
                {features.map((feature) => (
                  <BentoCard key={feature.name} {...feature} />
                ))}
              </BentoGrid>
            </BlurFade>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;