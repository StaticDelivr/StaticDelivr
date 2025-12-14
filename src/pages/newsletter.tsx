import React, { useState } from 'react';
import Head from 'next/head';
import { Mail, Send, Star, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuroraBackground } from '../components/ui/aurora-background';
import { MagicCard } from '../components/ui/magic-card';
import { BentoGrid } from '../components/ui/bento-grid';
import { BlurFade } from '../components/ui/blur-fade';
import { cn } from '@/lib/utils';

const StarBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Star className="w-48 h-48 text-blue-500 animate-pulse" style={{ animationDuration: "3s" }} />
  </div>
);

const SendBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Send className="w-48 h-48 text-purple-500" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent animate-pulse" />
  </div>
);

const MailBackground = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-10">
    <Mail className="w-48 h-48 text-green-500" />
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

const NewsletterPage = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (email) {
      setSubscribed(true);
      // Reset email after a short delay
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>Newsletter - StaticDelivr</title>
        <meta name="description" content="Stay updated with the latest news, technical insights, and community highlights from StaticDelivr." />
        <meta name="keywords" content="newsletter, StaticDelivr, open source, CDN, community updates" />
        <meta name="robots" content="index, follow" />

        <meta property="og:url" content="https://staticdelivr.com/newsletter" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Newsletter - StaticDelivr" />
        <meta property="og:description" content="Stay updated with the latest news, technical insights, and community highlights from StaticDelivr." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/newsletter" />
        <meta name="twitter:title" content="Newsletter - StaticDelivr" />
        <meta name="twitter:description" content="Stay updated with the latest news, technical insights, and community highlights from StaticDelivr." />
        <meta name="twitter:image" content="" />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[50vh] py-24">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
              StaticDelivr Newsletter
            </h1>
            <div className="prose prose-lg mx-auto">
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
                Stay up to date with the latest updates, features, and insights from StaticDelivr. 
                Our newsletter keeps you informed about open-source innovations, community highlights, 
                and exciting developments in the world of static asset delivery.
              </p>
              <p className="text-lg text-zinc-600 dark:text-zinc-400">
                By subscribing, you&apos;ll receive curated content directly in your inbox, including 
                project updates, technical tips, community spotlights, and exclusive insights from 
                our development team.
              </p>
            </div>
          </div>
        </AuroraBackground>

        {/* Newsletter Signup Section */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-3xl mx-auto">
            <BlurFade delay={0.1} inView>
              <MagicCard
                className="p-10 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                gradientColor={theme === "dark" ? "#262626" : "#E4E4E7"}
              >
                <div className="text-center mb-8">
                  <Mail className="w-12 h-12 mx-auto text-zinc-900 dark:text-white mb-4" />
                  <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">Subscribe to Our Newsletter</h2>
                  <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">
                    Join thousands of developers who stay ahead with StaticDelivr insights.
                  </p>
                </div>
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-grow px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    />
                    <button
                      type="submit"
                      disabled={subscribed}
                      className={`px-6 py-3 rounded-lg transition-colors font-medium flex items-center justify-center ${
                        subscribed 
                          ? 'bg-green-500 text-white cursor-not-allowed'
                          : 'bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900'
                      }`}
                    >
                      {subscribed ? <Check className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                    </button>
                  </div>
                  {subscribed && (
                    <p className="text-green-600 dark:text-green-400 text-center mt-4">
                      Thank you for subscribing!
                    </p>
                  )}
                </form>
              </MagicCard>
            </BlurFade>
          </div>
        </section>

        {/* Newsletter Highlights Section */}
        <section className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.2} inView>
              <h2 className="text-3xl font-bold text-center mb-16 text-zinc-900 dark:text-white">What You&apos;ll Receive</h2>
            </BlurFade>
            <BentoGrid className="max-w-7xl mx-auto">
              <BlurFade delay={0.3} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Project Updates"
                  Icon={Star}
                  background={<StarBackground />}
                  className="h-full"
                >
                  Get the latest news about StaticDelivr&apos;s development, new features, and roadmap insights.
                </CustomBentoCard>
              </BlurFade>
              <BlurFade delay={0.4} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Technical Insights"
                  Icon={Send}
                  background={<SendBackground />}
                  className="h-full"
                >
                  Receive in-depth articles, tutorials, and best practices for static asset delivery and open-source development.
                </CustomBentoCard>
              </BlurFade>
              <BlurFade delay={0.5} inView className="md:col-span-1">
                <CustomBentoCard
                  name="Community Spotlight"
                  Icon={Mail}
                  background={<MailBackground />}
                  className="h-full"
                >
                  Learn about interesting projects, community contributions, and developers making a difference in the open-source world.
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

export default NewsletterPage;