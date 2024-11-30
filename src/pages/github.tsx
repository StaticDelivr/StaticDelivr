import React, { useState } from 'react';
import Head from 'next/head';
import { AlertCircle, Copy, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Alert, AlertDescription } from '@/components/Alert';

const GitHubConverterPage = () => {
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
    <div>
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
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-white opacity-70 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
              GitHub to CDN Converter
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12">
              Convert your GitHub file URLs to StaticDelivr CDN URLs for faster delivery
              and better performance.
            </p>
          </div>
        </section>

        {/* Converter Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="github-url" className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    id="github-url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/user/repo/blob/branch/file.js"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Convert URL
                </button>
              </form>

              {error && (
                <Alert className="mt-6 bg-red-50 border-red-200">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {convertedUrl && (
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CDN URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={convertedUrl}
                      readOnly
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={handleCopy}
                      className="flex-shrink-0 p-2 text-gray-600 hover:text-blue-600 transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                  {copied && (
                    <p className="mt-2 text-sm text-green-600">
                      Copied to clipboard!
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-lg font-semibold mb-4">How to Use:</h3>
              <ol className="space-y-4 list-decimal pl-5">
                <li className="text-gray-600">
                  Copy your GitHub file URL (either from github.com or raw.githubusercontent.com)
                </li>
                <li className="text-gray-600">
                  Paste the URL into the input field above
                </li>
                <li className="text-gray-600">
                  Click &quot;Convert URL&quot; to get your StaticDelivr CDN URL
                </li>
                <li className="text-gray-600">
                  Use the generated URL in your project for faster content delivery
                </li>
              </ol>

              <div className="mt-8">
                <h4 className="font-semibold mb-2">Supported URL Formats:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• https://github.com/user/repo/blob/branch/path/to/file.js</li>
                  <li>• https://raw.githubusercontent.com/user/repo/branch/path/to/file.js</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GitHubConverterPage;