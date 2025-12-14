import React, { useState } from 'react';
import Head from 'next/head';
import { AlertCircle, Copy, ArrowRight, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Alert, AlertDescription } from '@/components/Alert';
import { AuroraBackground } from '../components/ui/aurora-background';
import { MagicCard } from '../components/ui/magic-card';
import { BlurFade } from '../components/ui/blur-fade';

const GitHubConverterPage = () => {
  const { theme } = useTheme();
  const [githubUrl, setGithubUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const convertUrl = (inputUrl: string): void => {
    // Regular expressions for GitHub URLs
    const githubRegex = /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/([^/]+)\/(.+)$/;
    const rawGithubRegex = /^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/;
  
    // Test if the input URL matches either pattern
    const githubMatch = inputUrl.match(githubRegex);
    const rawGithubMatch = inputUrl.match(rawGithubRegex);
  
    const match = githubMatch || rawGithubMatch;
  
    if (!match) {
      setError('Please enter a valid GitHub or Raw GitHub URL.');
      setConvertedUrl('');
      return;
    }
  
    // Destructure values safely from the match
    const [, user, repo, branch, file] = match;
  
    const cdn = 'https://cdn.staticdelivr.com';
    const staticDelivrUrl = `${cdn}/gh/${user}/${repo}/${branch}/${file}`;
    
    setConvertedUrl(staticDelivrUrl);
    setError('');
  };  

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    convertUrl(githubUrl.trim());
  };

  const handleCopy = async () => {
    if (convertedUrl) {
      try {
        await navigator.clipboard.writeText(convertedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>Convert from GitHub - StaticDelivr</title>
        <meta name="description" content="Convert GitHub file URLs to StaticDelivr CDN URLs for faster delivery and performance." />
        <meta name="keywords" content="GitHub, StaticDelivr, CDN, convert GitHub files, GitHub to CDN, faster delivery, CDN URLs, performance, StaticDelivr CDN, GitHub assets delivery, open source CDN, GitHub content delivery" />
        <meta name="robots" content="index, follow" />

        <meta property="og:url" content="https://staticdelivr.com/github" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Convert from GitHub - StaticDelivr" />
        <meta property="og:description" content="Convert GitHub file URLs to StaticDelivr CDN URLs for faster delivery and performance." />
        <meta property="og:image" content="" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/github" />
        <meta name="twitter:title" content="Convert from GitHub - StaticDelivr" />
        <meta name="twitter:description" content="Convert GitHub file URLs to StaticDelivr CDN URLs for faster delivery and performance." />
        <meta name="twitter:image" content="" />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[50vh] py-24">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
              GitHub to CDN Converter
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto">
              Convert your GitHub file URLs to StaticDelivr CDN URLs for faster delivery
              and better performance.
            </p>
          </div>
        </AuroraBackground>

        {/* Converter Section */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-3xl mx-auto">
            <BlurFade delay={0.1} inView>
              <MagicCard
                className="p-8 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 mb-8"
                gradientColor={theme === "dark" ? "#262626" : "#E4E4E7"}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="github-url" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      id="github-url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/user/repo/blob/branch/file.js"
                      className="w-full px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 text-zinc-900 dark:text-white placeholder-zinc-400"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center px-6 py-3 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium rounded-lg transition-colors"
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Convert URL
                  </button>
                </form>

                {error && (
                  <Alert className="mt-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <AlertDescription className="text-red-700 dark:text-red-300">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {convertedUrl && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      CDN URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={convertedUrl}
                        readOnly
                        className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-white"
                      />
                      <button
                        onClick={handleCopy}
                        className="flex-shrink-0 p-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    {copied && (
                      <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                        Copied to clipboard!
                      </p>
                    )}
                  </div>
                )}
              </MagicCard>
            </BlurFade>

            {/* Instructions */}
            <BlurFade delay={0.2} inView>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-xl p-8 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-semibold mb-4 text-zinc-900 dark:text-white">How to Use:</h3>
                <ol className="space-y-4 list-decimal pl-5">
                  <li className="text-zinc-600 dark:text-zinc-300">
                    Copy your GitHub file URL (either from github.com or raw.githubusercontent.com)
                  </li>
                  <li className="text-zinc-600 dark:text-zinc-300">
                    Paste the URL into the input field above
                  </li>
                  <li className="text-zinc-600 dark:text-zinc-300">
                    Click &quot;Convert URL&quot; to get your StaticDelivr CDN URL
                  </li>
                  <li className="text-zinc-600 dark:text-zinc-300">
                    Use the generated URL in your project for faster content delivery
                  </li>
                </ol>

                <div className="mt-8">
                  <h4 className="font-semibold mb-2 text-zinc-900 dark:text-white">Supported URL Formats:</h4>
                  <ul className="space-y-2 text-zinc-600 dark:text-zinc-300">
                    <li>• https://github.com/user/repo/blob/branch/path/to/file.js</li>
                    <li>• https://raw.githubusercontent.com/user/repo/branch/path/to/file.js</li>
                  </ul>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GitHubConverterPage;