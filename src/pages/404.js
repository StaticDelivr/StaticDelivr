import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { Button } from '../components/ui/button';
import { BlurFade } from '../components/ui/blur-fade';

const Custom404 = () => {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <Head>
        <title>404 - Page Not Found | StaticDelivr</title>
        <meta name="description" content="Sorry, the page you are looking for does not exist. Return to StaticDelivr homepage to explore our free open-source CDN." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Header />

      <main className="flex-grow relative flex flex-col items-center justify-center overflow-hidden py-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center px-4">
          <BlurFade delay={0.1}>
            <h1 className="text-8xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tighter">
              404
            </h1>
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="text-2xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-md mx-auto">
              Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
          </BlurFade>

          <BlurFade delay={0.3}>
            <Link href="/">
              <Button size="lg" className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                Go Back Home
              </Button>
            </Link>
          </BlurFade>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Custom404;
