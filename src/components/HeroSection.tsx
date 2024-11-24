import React from 'react';


const HeroSection = () => (
  <section className="pt-32 pb-20 px-4 relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-70"></div>
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10"></div>

    <div className="max-w-7xl mx-auto relative">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Free CDN for
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {" "}Open Source
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Accelerate your Open Source Projects with StaticDelivr&apos;s globally distributed network
        </p>
        <div className="flex justify-center gap-12 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              <span className="text-blue-600">350</span>+
            </div>
            <div className="text-gray-600">Points of Presence</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              <span className="text-purple-600">100</span>M+
            </div>
            <div className="text-gray-600">Monthly Requests</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
