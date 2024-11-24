import React from 'react';

const sponsors = [
  { name: "Company A", logo: "/api/placeholder/120/60" },
  { name: "Company B", logo: "/api/placeholder/120/60" },
  { name: "Company C", logo: "/api/placeholder/120/60" },
];

const SponsorsSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Generous Sponsors</h2>
      <p className="text-gray-600 mb-12">
        We’re grateful to our sponsors for supporting free and open-source projects.
      </p>
      <div className="flex justify-center gap-8">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="p-4">
            <img 
              src={sponsor.logo} 
              alt={`${sponsor.name} Logo`} 
              className="h-16 mx-auto"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SponsorsSection;
