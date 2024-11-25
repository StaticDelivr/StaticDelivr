import React from 'react';
import { Code2, Users, Zap, Share2 } from 'lucide-react';
import GradientCard from '../components/GradientCard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-70"></div>
          <div className="max-w-4xl mx-auto relative">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
              About StaticDelivr
            </h1>
            <div className="prose prose-lg mx-auto">
              <p className="text-xl text-gray-600 mb-6">
                At StaticDelivr, we are committed to making open-source projects more accessible 
                and easier to use for developers worldwide. Our platform provides an efficient 
                and reliable way to deliver assets, libraries, and resources for open-source projects.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                As an open-source enthusiast, you know how critical it is to have a fast and 
                efficient way to deliver your projects to users. With StaticDelivr, you can 
                deliver your assets with ease, no matter the size or complexity of your project. 
                Plus, our platform integrates seamlessly with popular package managers like npm 
                and GitHub, making it easy for developers to integrate your project into their workflow.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our team is dedicated to supporting the open-source community by providing a free 
                and open platform for developers to share and collaborate on their projects. With 
                StaticDelivr, you can be confident that your assets are being delivered quickly 
                and securely to developers worldwide.
              </p>
              <p className="text-lg text-gray-600">
                We believe that open-source development is the future of software development, 
                and we are committed to providing the tools and resources that developers need 
                to make their projects successful. Join us today and see how StaticDelivr can 
                help you take your open-source project to the next level.
              </p>
            </div>
          </div>
        </section>

        {/* Focus Areas Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-16">What We Are Focused On</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <GradientCard
                icon={<Code2 className="w-6 h-6 text-white" />}
                title="Open-Source Development"
                description="We believe in the power of open-source development and are committed to supporting the community with our platform."
                gradient="from-blue-50 to-blue-100"
                iconBg="bg-blue-600"
              />
              <GradientCard
                icon={<Zap className="w-6 h-6 text-white" />}
                title="Developer Experience"
                description="We strive to make the developer experience as seamless as possible by integrating with popular package managers and providing reliable and fast delivery of assets."
                gradient="from-purple-50 to-purple-100"
                iconBg="bg-purple-600"
              />
              <GradientCard
                icon={<Share2 className="w-6 h-6 text-white" />}
                title="Collaboration and Sharing"
                description="We are dedicated to providing a platform for developers to collaborate and share their projects with the world."
                gradient="from-green-50 to-green-100"
                iconBg="bg-green-600"
              />
              <GradientCard
                icon={<Users className="w-6 h-6 text-white" />}
                title="Performance and Reliability"
                description="We know how important it is to have fast and reliable delivery of your assets. That's why we're committed to delivering your assets quickly and securely."
                gradient="from-yellow-50 to-yellow-100"
                iconBg="bg-yellow-600"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;