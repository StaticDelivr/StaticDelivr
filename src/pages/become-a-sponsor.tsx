import React from 'react';
import Head from 'next/head';
import { Heart, Server, Gift, Code, Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GradientCard from '../components/GradientCard';
import Link from 'next/link';

const BecomeSponsorPage = () => {
  return (
    <div>
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
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-white opacity-70 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
              Become a Sponsor
            </h1>
            <div className="prose prose-lg mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                Join us in making StaticDelivr better by becoming a sponsor today. Your support 
                helps us cover infrastructure expenses and sponsor the development of new features.
              </p>
              <p className="text-lg text-gray-600">
                As an open-source project, we rely on the support of our community and sponsors 
                to maintain and improve our services. Your sponsorship directly contributes to 
                the sustainability and growth of StaticDelivr.
              </p>
            </div>
          </div>
        </section>

        {/* Sponsorship Options Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">How to Sponsor Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <GradientCard
                icon={<Server className="w-6 h-6 text-white" />}
                title="Infrastructure Support"
                description="Provide us with services like CDN, DNS, web hosting, or other infrastructure needs that help us maintain and scale our platform."
                gradient="from-blue-50 to-blue-100"
                iconBg="bg-blue-600"
              />
              <GradientCard
                icon={<Gift className="w-6 h-6 text-white" />}
                title="Monthly Donations"
                description="Support us with monthly donations to help cover development costs, infrastructure expenses, and other operational needs."
                gradient="from-purple-50 to-purple-100"
                iconBg="bg-purple-600"
              />
              <GradientCard
                icon={<Code className="w-6 h-6 text-white" />}
                title="Development Resources"
                description="Contribute development hours from your team to help us improve and maintain the platform."
                gradient="from-green-50 to-green-100"
                iconBg="bg-green-600"
              />
            </div>
          </div>
        </section>

        {/* Sponsorship Platforms Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Ready to Support Us?</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <a
                aria-disabled="true"
                className="flex items-center justify-center px-8 py-4 bg-gray-300 text-gray-500 font-medium rounded-lg transition-colors cursor-not-allowed"
              >
                Sponsor on GitHub (Coming Soon)
              </a>
              <a
                href="https://opencollective.com/staticdelivr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Sponsor on Open Collective
              </a>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-gray-400 mr-2" />
                <h3 className="text-xl font-semibold">Contact Us</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Have questions about sponsorship? Want to discuss custom sponsorship options?
              </p>
              <a
                href="mailto:coozy@staticdelivr.com"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                coozy@staticdelivr.com
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-6">Benefits of Sponsorship</h2>
              <p className="text-lg text-gray-600 mb-8">
                As a sponsor, you&apos;ll receive recognition on our website, access to priority support,
                and the satisfaction of supporting open-source software that benefits developers worldwide.
              </p>
              <Link
                href="/sponsors"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5 mr-2" />
                View Our Current Sponsors
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BecomeSponsorPage;