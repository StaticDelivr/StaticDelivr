import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

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
      
      {/* Responsive sponsor grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="flex items-center justify-center p-4">
            <img 
              src={sponsor.logo} 
              alt={`${sponsor.name} Logo`} 
              className="max-h-[50px] w-auto object-contain"
            />
          </div>
        ))}
      </div>
      
      {/* Sponsor CTA Section */}
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-4">Become a Sponsor</h3>
        <p className="text-gray-600 mb-6">
          Support our mission to provide free and reliable CDN services for open-source projects.
        </p>
        <Link
          href="/become-a-sponsor"
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          <Heart className="w-5 h-5 mr-2" />
          Become a Sponsor
        </Link>
      </div>
    </div>
  </section>
);

export default SponsorsSection;