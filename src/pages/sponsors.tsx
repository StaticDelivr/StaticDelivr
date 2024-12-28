import React from 'react';
import Head from 'next/head';
import { Building2, Users, UserPlus, Heart, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GradientCard from '../components/GradientCard';
import Link from 'next/link';

const sponsors = [
  { name: "ClouDNS", logo: "/assets/sponsors/cloudns.svg", website: "https://www.cloudns.net/" },
  { name: "Netlify", logo: "/assets/sponsors/netlify.svg", website: "https://www.netlify.com/" },
];

const SponsorsPage = () => {
  return (
    <div>
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
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-white opacity-70 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
              Our Sponsors
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12">
              We&apos;re incredibly grateful to our sponsors who make it possible for us to provide 
              free CDN services to the open-source community.
            </p>
          </div>
        </section>

        {/* Current Sponsors Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Current Sponsors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sponsors.map((sponsor, index) => (
                <a 
                  key={index} 
                  href={sponsor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                >
                  <div className="w-full h-48 bg-gray-50 p-8 flex items-center justify-center border-b">
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="p-6 flex items-center justify-between w-full">
                    <h3 className="font-semibold text-lg text-gray-900">{sponsor.name}</h3>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-100 rounded-xl transition-colors duration-200"></div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Why Become a Sponsor Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">Why Become a Sponsor?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <GradientCard
                icon={<Building2 className="w-6 h-6 text-white" />}
                title="Visibility and Branding"
                description="Get your company logo and name prominently displayed on our website, social media channels, and event materials. Reach millions of developers worldwide."
                gradient="from-blue-50 to-blue-100"
                iconBg="bg-blue-600"
              />
              <GradientCard
                icon={<Users className="w-6 h-6 text-white" />}
                title="Access to Community"
                description="Connect with a network of like-minded professionals and access exclusive events and opportunities to collaborate and share knowledge."
                gradient="from-purple-50 to-purple-100"
                iconBg="bg-purple-600"
              />
              <GradientCard
                icon={<UserPlus className="w-6 h-6 text-white" />}
                title="Recruitment Opportunities"
                description="Showcase your company&apos;s commitment to open source and attract top talent in the industry. Connect with passionate developers who align with your values."
                gradient="from-green-50 to-green-100"
                iconBg="bg-green-600"
              />
              <GradientCard
                icon={<Heart className="w-6 h-6 text-white" />}
                title="Supporting a Good Cause"
                description="Help support the development and maintenance of valuable open source projects that benefit the wider community. Make a lasting impact on the future of software."
                gradient="from-yellow-50 to-yellow-100"
                iconBg="bg-yellow-600"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
              <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join our community of sponsors and help shape the future of open-source software delivery.
              </p>
              <Link
                href="/become-a-sponsor"
                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <Heart className="w-5 h-5 mr-2" />
                Become a Sponsor
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SponsorsPage;