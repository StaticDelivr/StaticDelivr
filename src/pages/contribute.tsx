import React from 'react';
import { Github, Heart, Bug } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContributePage = () => {
  return (
    <div>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-70"></div>
          <div className="max-w-4xl mx-auto relative">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
              Contribute to StaticDelivr
            </h1>
            <div className="prose prose-lg mx-auto">
              <p className="text-xl text-gray-600 mb-8">
                We welcome contributions from developers around the world to help make StaticDelivr 
                better for everyone. Whether you're interested in fixing a bug, adding a new feature, 
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
              <SupportCard 
                icon={<Github className="w-6 h-6 text-white" />}
                title="GitHub"
                description="Check out our code on GitHub and contribute to our open source projects."
                buttonText="Visit GitHub"
                buttonLink="https://github.com/Coozywana/StaticDelivr"
                gradient="from-gray-50 to-gray-100"
                iconBg="bg-gray-800"
              />
              
              <SupportCard 
                icon={<Heart className="w-6 h-6 text-white" />}
                title="Support Us"
                description="Become a sponsor or make a donation to support our work."
                buttonText="Become a Sponsor"
                buttonLink="https://staticdelivr.com/become-a-sponsor"
                gradient="from-blue-50 to-blue-100"
                iconBg="bg-blue-600"
              />
              
              <SupportCard 
                icon={<Bug className="w-6 h-6 text-white" />}
                title="Submit a Bug Report"
                description="Found a bug? Let us know by submitting a bug report."
                buttonText="Report Bug"
                buttonLink="https://github.com/coozywana/StaticDelivr/issues"
                gradient="from-purple-50 to-purple-100"
                iconBg="bg-purple-600"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface SupportCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  gradient: string;
  iconBg: string;
}

const SupportCard = ({ 
  icon, 
  title, 
  description, 
  buttonText, 
  buttonLink,
  gradient,
  iconBg 
}: SupportCardProps) => (
  <div className={`p-8 rounded-xl bg-gradient-to-br ${gradient}`}>
    <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-4`}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    <a
      href={buttonLink}
      className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 text-gray-800 font-medium rounded-lg transition-colors border border-gray-200"
    >
      {buttonText}
    </a>
  </div>
);

export default ContributePage;