"use client";

import React from 'react';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const sponsors = [
  { name: "ClouDNS", logo: "/assets/sponsors/cloudns.svg", website: "https://www.cloudns.net/" },
  { name: "Netlify", logo: "/assets/sponsors/netlify.svg", website: "https://www.netlify.com/" },
];

const SponsorsSection = () => {
  return (
    <section className="py-24 px-4 bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
          Our Generous Sponsors
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-16 max-w-2xl mx-auto">
          StaticDelivr is made possible by our primary sponsors who provide the infrastructure and support needed to keep our services free.
        </p>
        
        {/* Centered sponsor grid */}
        <div className="flex flex-wrap justify-center gap-12 items-center mb-24 transition-all duration-500">
          {sponsors.map((sponsor, index) => (
            <Link 
              key={index} 
              href={sponsor.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="opacity-90 hover:opacity-100 transition-opacity"
            >
              <img 
                src={sponsor.logo} 
                alt={`${sponsor.name} Logo`} 
                className="h-12 w-auto object-contain dark:invert"
              />
            </Link>
          ))}
        </div>
        
        {/* Sponsor CTA Section */}
        <div className="max-w-3xl mx-auto">
          <div className="p-8 md:p-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Become a Sponsor</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg leading-relaxed">
                Support our mission to provide free and reliable CDN services for open-source projects. Your sponsorship helps cover infrastructure costs.
              </p>
              <Link href="/become-a-sponsor">
                <Button 
                  size="lg" 
                  className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-full px-8"
                >
                  Become a Sponsor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;