import React from 'react';
import Head from 'next/head';
import { Github, Heart, Bug } from 'lucide-react';
import GradientCard from '../components/GradientCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContributePage = () => {
  return (
    <div>
      <Head>
        <title>Contribute - StaticDelivr</title>
        <meta name="description" content="Join us in improving StaticDelivr by contributing code, documentation, or supporting us." />
        <meta name="keywords" content="contribute, StaticDelivr, open source, open-source contribution, contribute code, contribute documentation, support open source, StaticDelivr contributors, open-source projects, developer contributions, improving StaticDelivr" />
        <meta name="robots" content="index, follow" />

        <meta property="og:url" content="https://staticdelivr.com/contribute" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contribute - StaticDelivr" />
        <meta property="og:description" content="Join us in improving StaticDelivr by contributing code, documentation, or supporting us." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/contribute" />
        <meta name="twitter:title" content="Contribute - StaticDelivr" />
        <meta name="twitter:description" content="Join us in improving StaticDelivr by contributing code, documentation, or supporting us." />
        <meta name="twitter:image" content="" />
      </Head>

      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-white opacity-70 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
              Contribute to StaticDelivr
            </h1>
            <div className="prose prose-lg mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                We welcome contributions from developers around the world to help make StaticDelivr 
                better for everyone. Whether you&apos;re interested in fixing a bug, adding a new feature, 
                or just improving the documentation, we would love to have your help!
              </p>
              <p className="text-lg text-gray-600 mb-8">
                There are many ways to contribute to StaticDelivr, and no contribution is too small. 
                You can help us by:
              </p>
              <ul className="list-disc text-lg text-gray-600 mb-8 pl-6">
                <li className="mb-2">Submitting bug reports and feature requests</li>
                <li className="mb-2">Improving our documentation and website</li>
                <li className="mb-2">Contributing code to our open-source projects</li>
                <li className="mb-2">Donating to help fund our development efforts</li>
              </ul>
              <p className="text-lg text-gray-600 mb-8">
                By contributing to StaticDelivr, you can help make a difference in the open-source 
                community and support the development of tools and resources that developers rely 
                on every day.
              </p>
            </div>
          </div>
        </section>

        {/* Support Options Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">More Ways to Support Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <GradientCard
                icon={<Github className="w-6 h-6 text-white" />}
                title="GitHub"
                description="Check out our code on GitHub and contribute to our open source projects."
                gradient="from-gray-50 to-gray-100"
                iconBg="bg-gray-800"
                action={{
                  text: "Visit GitHub",
                  href: "https://github.com/Coozywana/StaticDelivr",
                }}
              />
              <GradientCard
                icon={<Heart className="w-6 h-6 text-white" />}
                title="Support Us"
                description="Become a sponsor or make a donation to support our work."
                gradient="from-blue-50 to-blue-100"
                iconBg="bg-blue-600"
                action={{
                  text: "Become a Sponsor",
                  href: "/become-a-sponsor",
                }}
              />
              <GradientCard
                icon={<Bug className="w-6 h-6 text-white" />}
                title="Submit a Bug Report"
                description="Found a bug? Let us know by submitting a bug report."
                gradient="from-purple-50 to-purple-100"
                iconBg="bg-purple-600"
                action={{
                  text: "Report Bug",
                  href: "https://github.com/coozywana/StaticDelivr/issues",
                }}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContributePage;
