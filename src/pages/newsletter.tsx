import React, { useState } from 'react';
import Head from 'next/head';
import { Mail, Send, Star, Check } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GradientCard from '../components/GradientCard';

const NewsletterPage = () => {
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
    <div>
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
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-white opacity-70 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
              StaticDelivr Newsletter
            </h1>
            <div className="prose prose-lg mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                Stay up to date with the latest updates, features, and insights from StaticDelivr. 
                Our newsletter keeps you informed about open-source innovations, community highlights, 
                and exciting developments in the world of static asset delivery.
              </p>
              <p className="text-lg text-gray-600">
                By subscribing, you&apos;ll receive curated content directly in your inbox, including 
                project updates, technical tips, community spotlights, and exclusive insights from 
                our development team.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter Signup Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-10 shadow-sm">
              <div className="text-center mb-8">
                <Mail className="w-12 h-12 mx-auto text-blue-600 mb-4" />
                <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Join thousands of developers who stay ahead with StaticDelivr insights.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    disabled={subscribed}
                    className={`px-6 py-3 rounded-r-lg transition-colors ${
                      subscribed 
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {subscribed ? <Check className="w-5 h-5" /> : <Send className="w-5 h-5" />}
                  </button>
                </div>
                {subscribed && (
                  <p className="text-green-600 text-center mt-4">
                    Thank you for subscribing!
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Newsletter Highlights Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">What You&apos;ll Receive</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <GradientCard
                icon={<Star className="w-6 h-6 text-white" />}
                title="Project Updates"
                description="Get the latest news about StaticDelivr's development, new features, and roadmap insights."
                gradient="from-blue-50 to-blue-100"
                iconBg="bg-blue-600"
              />
              <GradientCard
                icon={<Send className="w-6 h-6 text-white" />}
                title="Technical Insights"
                description="Receive in-depth articles, tutorials, and best practices for static asset delivery and open-source development."
                gradient="from-purple-50 to-purple-100"
                iconBg="bg-purple-600"
              />
              <GradientCard
                icon={<Mail className="w-6 h-6 text-white" />}
                title="Community Spotlight"
                description="Learn about interesting projects, community contributions, and developers making a difference in the open-source world."
                gradient="from-green-50 to-green-100"
                iconBg="bg-green-600"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsletterPage;