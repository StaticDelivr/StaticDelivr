import React from 'react';

const NetworkMapSection = () => (
  <section className="py-20 px-4 bg-gray-50">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Global Network Coverage</h2>
      <p className="text-gray-600 mb-12">
        Our CDN spans 350+ Points of Presence worldwide for unparalleled coverage.
      </p>
      <img 
        src="/api/placeholder/1200/600" 
        alt="World Map showing CDN nodes" 
        className="w-full rounded-lg shadow-lg"
      />
    </div>
  </section>
);

export default NetworkMapSection;
