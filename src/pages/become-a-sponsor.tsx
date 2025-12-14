import React from 'react';
import Head from 'next/head';
import { Heart, Server, Gift, Code, Mail } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuroraBackground } from '../components/ui/aurora-background';
import { MagicCard } from '../components/ui/magic-card';
import { BentoGrid } from '../components/ui/bento-grid';
import { BlurFade } from '../components/ui/blur-fade';
import { cn } from '@/lib/utils';

const ServerBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Server className="w-48 h-48 text-blue-500 animate-pulse" style={{ animationDuration: "3s" }} />
  </div>
);

const GiftBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Gift className="w-48 h-48 text-purple-500" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent animate-pulse" />
  </div>
);

const CodeBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Code className="w-48 h-48 text-green-500" />
  </div>
);

const CustomBentoCard = ({
  name,
  className,
  background,
  Icon,
  children,
  ...props
}: any) => (
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
      <div className="text-zinc-500 dark:text-zinc-400 flex-grow">
        {children}
      </div>
    </div>
  </div>
);

const BecomeSponsorPage = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>Become a Sponsor - StaticDelivr</title>
        <meta name="description" content="Support StaticDelivr by becoming a sponsor. Help cover infrastructure expenses and support the development of new features for the open-source community." />
        <meta name="keywords" content="become a sponsor, StaticDelivr sponsorship, support open-source, sponsor StaticDelivr, open-source infrastructure, contribute to open-source, StaticDelivr support, open-source community, infrastructure expenses, open-source projects sponsorship" />
        <meta name="robots" content="index, follow" />
        
        <meta property="og:url" content="https://staticdelivr.com/become-sponsor" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Become a Sponsor - StaticDelivr" />
        <meta property="og:description" content="Support StaticDelivr by becoming a sponsor. Help cover infrastructure expenses and support the development of new features for the open-source community." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/become-sponsor" />
        <meta name="twitter:title" content="Become a Sponsor - StaticDelivr" />
        <meta name="twitter:description" content="Support StaticDelivr by becoming a sponsor. Help cover infrastructure expenses and support the development of new features for the open-source community." />
        <meta name="twitter:image" content="" />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[50vh] py-24">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
              Become a Sponsor
            </h1>
            <div className="prose prose-lg mx-auto">
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
                Join us in making StaticDelivr better by becoming a sponsor today. Your support 
                helps us cover infrastructure expenses and sponsor the development of new features.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                As an open-source project, we rely on the support of our community and sponsors 
                to maintain and improve our services. Your sponsorship directly contributes to 
                the sustainability and growth of StaticDelivr.
              </p>
            </div>
          </div>
        </AuroraBackground>

        {/* Sponsorship Options Section */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.1} inView>
              <h2 className="text-3xl font-bold text-center mb-16 text-zinc-900 dark:text-white">How to Sponsor Us</h2>
            </BlurFade>
            <BentoGrid className="max-w-7xl mx-auto">
              <BlurFade delay={0.2} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Infrastructure Support"
                  Icon={Server}
                  background={<ServerBackground />}
                  className="h-full"
                >
                  Provide us with services like CDN, DNS, web hosting, or other infrastructure needs that help us maintain and scale our platform.
                </CustomBentoCard>
              </BlurFade>
              <BlurFade delay={0.3} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Monthly Donations"
                  Icon={Gift}
                  background={<GiftBackground />}
                  className="h-full"
                >
                  Support us with monthly donations to help cover development costs, infrastructure expenses, and other operational needs.
                </CustomBentoCard>
              </BlurFade>
              <BlurFade delay={0.4} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Development Resources"
                  Icon={Code}
                  background={<CodeBackground />}
                  className="h-full"
                >
                  Contribute development hours from your team to help us improve and maintain the platform.
                </CustomBentoCard>
              </BlurFade>
            </BentoGrid>
          </div>
        </section>

        {/* Sponsorship Platforms Section */}
        <section className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-3xl mx-auto text-center">
            <BlurFade delay={0.2} inView>
              <h2 className="text-3xl font-bold mb-12 text-zinc-900 dark:text-white">Ready to Support Us?</h2>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <a
                  aria-disabled="true"
                  className="flex items-center justify-center px-8 py-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium rounded-lg transition-colors cursor-not-allowed"
                >
                  Sponsor on GitHub (Coming Soon)
                </a>
                <a
                  href="https://opencollective.com/staticdelivr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-8 py-4 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium rounded-lg transition-colors"
                >
                  Sponsor on Open Collective
                </a>
              </div>
              <MagicCard
                className="p-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                gradientColor={theme === "dark" ? "#262626" : "#E4E4E7"}
              >
                <div className="flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-zinc-400 mr-2" />
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Contact Us</h3>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 mb-4">
                  Have questions about sponsorship? Want to discuss custom sponsorship options?
                </p>
                <a
                  href="mailto:coozy@staticdelivr.com"
                  className="text-zinc-900 dark:text-white hover:underline font-medium"
                >
                  coozy@staticdelivr.com
                </a>
              </MagicCard>
            </BlurFade>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-3xl mx-auto text-center">
            <BlurFade delay={0.3} inView>
              <MagicCard
                className="p-12 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                gradientColor={theme === "dark" ? "#262626" : "#E4E4E7"}
              >
                <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Benefits of Sponsorship</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">
                  As a sponsor, you&apos;ll receive recognition on our website, access to priority support,
                  and the satisfaction of supporting open-source software that benefits developers worldwide.
                </p>
                <Link
                  href="/sponsors"
                  className="inline-flex items-center px-8 py-4 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  View Our Current Sponsors
                </Link>
              </MagicCard>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeSponsorPage;