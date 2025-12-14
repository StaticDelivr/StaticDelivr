import React from 'react';
import Head from 'next/head';
import { Building2, Users, UserPlus, Heart, ExternalLink, Rocket } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuroraBackground } from '../components/ui/aurora-background';
import { MagicCard } from '../components/ui/magic-card';
import { BentoGrid } from '../components/ui/bento-grid';
import { BlurFade } from '../components/ui/blur-fade';
import { cn } from '@/lib/utils';

interface CustomBentoCardProps {
  name: string;
  className?: string;
  background: React.ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

const sponsors = [
  { name: "ClouDNS", logo: "/assets/sponsors/cloudns.svg", website: "https://www.cloudns.net/" },
  { name: "Netlify", logo: "/assets/sponsors/netlify.svg", website: "https://www.netlify.com/" },
];

// Background components for Bento Cards
const VisibilityBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Rocket className="w-48 h-48 text-blue-500 animate-pulse" style={{ animationDuration: "3s" }} />
  </div>
);

const CommunityBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Users className="w-48 h-48 text-purple-500" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent animate-pulse" />
  </div>
);

const RecruitmentBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <UserPlus className="w-48 h-48 text-green-500" />
  </div>
);

const HeartBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Heart className="w-48 h-48 text-red-500 animate-pulse" style={{ animationDuration: "1.5s" }} />
  </div>
);

const CustomBentoCard = ({
  name,
  className,
  background,
  Icon,
  children,
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
      <div className="text-zinc-500 dark:text-zinc-400 flex-grow">
        {children}
      </div>
    </div>
  </div>
);

const SponsorsPage = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>Our Sponsors - StaticDelivr</title>
        <meta name="description" content="Meet our amazing sponsors who support StaticDelivr and make free CDN services possible for the open-source community." />
        <meta name="keywords" content="StaticDelivr sponsors, open-source support, CDN sponsorship, tech companies" />
        <meta name="robots" content="index, follow" />

        <meta property="og:url" content="https://staticdelivr.com/sponsors" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Our Sponsors - StaticDelivr" />
        <meta property="og:description" content="Learn more about the sponsors backing StaticDelivr and their contributions to the open-source community." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/sponsors" />
        <meta name="twitter:title" content="Our Sponsors - StaticDelivr" />
        <meta name="twitter:description" content="Discover the incredible companies sponsoring StaticDelivr and supporting the open-source ecosystem." />
        <meta name="twitter:image" content="" />
      </Head>
      
      <Header />
      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[50vh] py-24">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
              Our Sponsors
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              We&apos;re incredibly grateful to our sponsors who make it possible for us to provide 
              free CDN services to the open-source community.
            </p>
          </div>
        </AuroraBackground>

        {/* Current Sponsors Section */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto">
            <BlurFade delay={0.1} inView>
              <h2 className="text-3xl font-bold text-center mb-16 text-zinc-900 dark:text-white">Current Sponsors</h2>
            </BlurFade>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.map((sponsor, index) => (
                <BlurFade key={index} delay={0.2 + index * 0.1} inView>
                  <a 
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <MagicCard
                      className="h-full flex flex-col items-center overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                      gradientColor={theme === "dark" ? "#262626" : "#E4E4E7"}
                    >
                      <div className="w-full h-48 bg-zinc-50 dark:bg-zinc-900 p-8 flex items-center justify-center border-b border-zinc-200 dark:border-zinc-800">
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          className="max-w-full max-h-full object-contain transition-transform duration-200 hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex items-center justify-between w-full">
                        <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">{sponsor.name}</h3>
                        <ExternalLink className="w-5 h-5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" />
                      </div>
                    </MagicCard>
                  </a>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        {/* Why Become a Sponsor Section */}
        <section className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.1} inView>
              <h2 className="text-3xl font-bold text-center mb-16 text-zinc-900 dark:text-white">Why Become a Sponsor?</h2>
            </BlurFade>
            
            <BentoGrid className="max-w-7xl mx-auto">
              <BlurFade delay={0.2} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Visibility and Branding"
                  Icon={Building2}
                  background={<VisibilityBackground />}
                  className="h-full"
                >
                  Get your company logo and name prominently displayed on our website, social media channels, and event materials. Reach millions of developers worldwide.
                </CustomBentoCard>
              </BlurFade>

              <BlurFade delay={0.3} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Access to Community"
                  Icon={Users}
                  background={<CommunityBackground />}
                  className="h-full"
                >
                  Connect with a network of like-minded professionals and access exclusive events and opportunities to collaborate and share knowledge.
                </CustomBentoCard>
              </BlurFade>

              <BlurFade delay={0.4} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Recruitment Opportunities"
                  Icon={UserPlus}
                  background={<RecruitmentBackground />}
                  className="h-full"
                >
                  Showcase your company&apos;s commitment to open source and attract top talent in the industry. Connect with passionate developers who align with your values.
                </CustomBentoCard>
              </BlurFade>

              <BlurFade delay={0.5} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Supporting a Good Cause"
                  Icon={Heart}
                  background={<HeartBackground />}
                  className="h-full"
                >
                  Help support the development and maintenance of valuable open source projects that benefit the wider community. Make a lasting impact on the future of software.
                </CustomBentoCard>
              </BlurFade>
            </BentoGrid>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-3xl mx-auto text-center">
            <BlurFade delay={0.2} inView>
              <MagicCard
                className="p-12 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                gradientColor={theme === "dark" ? "#262626" : "#E4E4E7"}
              >
                <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Ready to Make an Impact?</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">
                  Join our community of sponsors and help shape the future of open-source software delivery.
                </p>
                <Link
                  href="/become-a-sponsor"
                  className="inline-flex items-center px-8 py-4 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium rounded-lg transition-colors"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Become a Sponsor
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

export default SponsorsPage;