import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';

const sponsors = [
  { name: "ClouDNS", logo: "/assets/sponsors/cloudns.svg", website: "https://www.cloudns.net/" },
];

const SponsorsSection = () => (
  <section className="py-20 px-4">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Generous Sponsors</h2>
      <p className="text-gray-600 mb-12">
        StaticDelivr is made possible by our primary sponsors:
      </p>
      
      {/* Centered sponsor grid */}
      <div className="flex justify-center mb-16">
        {sponsors.map((sponsor, index) => (
          <div key={index} className="p-4">
            <Link href={sponsor.website} target="_blank" rel="noopener noreferrer">
              <img 
                src={sponsor.logo} 
                alt={`${sponsor.name} Logo`} 
                className="max-h-[50px] w-auto object-contain"
              />
            </Link>
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