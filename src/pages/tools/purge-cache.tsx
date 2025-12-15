import React, { useState } from 'react';
import Head from 'next/head';
import { RefreshCw, Check, AlertCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Alert, AlertDescription, AlertTitle } from '@/components/Alert';
import { AuroraBackground } from '../../components/ui/aurora-background';
import { MagicCard } from '../../components/ui/magic-card';
import { BlurFade } from '../../components/ui/blur-fade';

const PurgeCachePage = () => {
  const { theme } = useTheme();
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<null | 'success'>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>Purge CDN Cache Tool | Clear Assets - StaticDelivr</title>
        <meta name="description" content="Instantly purge cached files from StaticDelivr's global CDN network. Ensure users always see the latest version of your assets with our easy cache purge tool." />
        <meta name="keywords" content="purge cache, CDN cache clear, refresh CDN assets, cache invalidation, StaticDelivr cache, clear cached files, update CDN content" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:url" content="https://staticdelivr.com/tools/purge-cache" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Purge CDN Cache Tool | Clear Assets - StaticDelivr" />
        <meta property="og:description" content="Instantly purge cached files from StaticDelivr's global CDN network. Ensure users always see the latest version of your assets." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="StaticDelivr" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/tools/purge-cache" />
        <meta name="twitter:title" content="Purge CDN Cache Tool | Clear Assets - StaticDelivr" />
        <meta name="twitter:description" content="Instantly purge cached files from StaticDelivr's global CDN network. Ensure users always see the latest version of your assets." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[50vh] py-24">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
              Purge Cache
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              Need to update your assets? Use our cache purge tool to ensure your users
              get the latest version of your files.
            </p>
          </div>
        </AuroraBackground>

        {/* Purge Form Section */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-2xl mx-auto">
            <BlurFade delay={0.1} inView>
              <MagicCard
                className="p-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mb-8"
                gradientColor={theme === "dark" ? "#262626" : "#E4E4E7"}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="url" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Asset URL
                    </label>
                    <input
                      type="url"
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://cdn.staticdelivr.com/your/asset/path"
                      className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 text-zinc-900 dark:text-white placeholder-zinc-400"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-6 py-3 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:bg-zinc-400 dark:disabled:bg-zinc-600 text-white dark:text-zinc-900 font-medium rounded-lg transition-colors"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Purge Cache
                      </>
                    )}
                  </button>
                </form>
              </MagicCard>
            </BlurFade>

            {status === 'success' && (
              <BlurFade delay={0.2} inView>
                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 mb-8">
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-800 dark:text-green-300">Success</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    Cache purge request submitted successfully. Changes should reflect shortly.
                  </AlertDescription>
                </Alert>
              </BlurFade>
            )}

            <BlurFade delay={0.3} inView>
              <div className="mt-12 bg-zinc-50 dark:bg-zinc-900 rounded-xl p-8 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">Important Notes:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-zinc-600 dark:text-zinc-300">Cache purging may take up to 5 minutes to propagate across all edge locations.</p>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-zinc-600 dark:text-zinc-300">Make sure to include the complete URL path to the asset you want to purge.</p>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-zinc-600 dark:text-zinc-300">For bulk purge requests or wildcard purging, please use our API.</p>
                  </li>
                </ul>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PurgeCachePage;