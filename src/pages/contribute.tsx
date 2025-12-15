import React from 'react';
import Head from 'next/head';
import { Github, Heart, Bug } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuroraBackground } from '../components/ui/aurora-background';
import { BentoGrid } from '../components/ui/bento-grid';
import { BlurFade } from '../components/ui/blur-fade';
import { cn } from '@/lib/utils';

interface CustomBentoCardProps {
  name: string;
  className?: string;
  background: React.ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  action?: { href: string; text: string; };
}

const GithubBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Github className="w-48 h-48 text-zinc-500 animate-pulse" style={{ animationDuration: "3s" }} />
  </div>
);

const HeartBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Heart className="w-48 h-48 text-red-500" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent animate-pulse" />
  </div>
);

const BugBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Bug className="w-48 h-48 text-orange-500" />
  </div>
);

const CustomBentoCard = ({
  name,
  className,
  background,
  Icon,
  children,
  action,
  ...props
}: CustomBentoCardProps & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-white dark:bg-zinc-900 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
      className
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="p-6 relative z-10 h-full flex flex-col">
      <div className="mb-4 p-2 w-fit rounded-lg bg-zinc-100 dark:bg-zinc-800">
        <Icon className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
      </div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        {name}
      </h3>
      <div className="text-zinc-500 dark:text-zinc-400 flex-grow mb-4">
        {children}
      </div>
      {action && (
        <a
          href={action.href}
          className="inline-flex items-center text-sm font-medium text-zinc-900 dark:text-white hover:underline"
        >
          {action.text}
          <Github className="w-4 h-4 ml-1" />
        </a>
      )}
    </div>
  </div>
);

const ContributePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>Contribute to Open Source CDN | Join StaticDelivr</title>
        <meta name="description" content="Join the StaticDelivr community! Contribute code, documentation, or support to help build the best free CDN for open-source projects." />
        <meta name="keywords" content="contribute open source, StaticDelivr contribution, open source CDN, developer community, code contribution, documentation, GitHub contribution" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:url" content="https://staticdelivr.com/contribute" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contribute to Open Source CDN | Join StaticDelivr" />
        <meta property="og:description" content="Join the StaticDelivr community! Contribute code, documentation, or support to help build the best free CDN." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="StaticDelivr" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/contribute" />
        <meta name="twitter:title" content="Contribute to Open Source CDN | Join StaticDelivr" />
        <meta name="twitter:description" content="Join the StaticDelivr community! Contribute code, documentation, or support to help build the best free CDN." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[50vh] py-24">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
              Contribute to StaticDelivr
            </h1>
            <div className="prose prose-lg mx-auto">
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
                We welcome contributions from developers around the world to help make StaticDelivr 
                better for everyone. Whether you&apos;re interested in fixing a bug, adding a new feature, 
                or just improving the documentation, we would love to have your help!
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                There are many ways to contribute to StaticDelivr, and no contribution is too small. 
                You can help us by:
              </p>
              <ul className="list-disc text-lg text-zinc-600 dark:text-zinc-400 mb-8 pl-6 text-left inline-block">
                <li className="mb-2">Submitting bug reports and feature requests</li>
                <li className="mb-2">Improving our documentation and website</li>
                <li className="mb-2">Contributing code to our open-source projects</li>
                <li className="mb-2">Donating to help fund our development efforts</li>
              </ul>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                By contributing to StaticDelivr, you can help make a difference in the open-source 
                community and support the development of tools and resources that developers rely 
                on every day.
              </p>
            </div>
          </div>
        </AuroraBackground>

        {/* Support Options Section */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.1} inView>
              <h2 className="text-3xl font-bold text-center mb-16 text-zinc-900 dark:text-white">More Ways to Support Us</h2>
            </BlurFade>
            <BentoGrid className="max-w-7xl mx-auto">
              <BlurFade delay={0.2} inView className="md:col-span-1">
                <CustomBentoCard
                  name="GitHub"
                  Icon={Github}
                  background={<GithubBackground />}
                  className="h-full"
                  action={{
                    text: "Visit GitHub",
                    href: "https://github.com/Coozywana/StaticDelivr",
                  }}
                >
                  Check out our code on GitHub and contribute to our open source projects.
                </CustomBentoCard>
              </BlurFade>
              <BlurFade delay={0.3} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Support Us"
                  Icon={Heart}
                  background={<HeartBackground />}
                  className="h-full"
                  action={{
                    text: "Become a Sponsor",
                    href: "/become-a-sponsor",
                  }}
                >
                  Become a sponsor or make a donation to support our work.
                </CustomBentoCard>
              </BlurFade>
              <BlurFade delay={0.4} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Submit a Bug Report"
                  Icon={Bug}
                  background={<BugBackground />}
                  className="h-full"
                  action={{
                    text: "Report Bug",
                    href: "https://github.com/coozywana/StaticDelivr/issues",
                  }}
                >
                  Found a bug? Let us know by submitting a bug report.
                </CustomBentoCard>
              </BlurFade>
            </BentoGrid>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContributePage;
