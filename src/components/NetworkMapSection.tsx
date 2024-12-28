import React from 'react';
import Link from 'next/link';
import { StaticDelivrImage } from 'staticdelivr';

const NetworkMapSection = () => (
  <section className="py-20 px-4 bg-gray-50">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Global Network Coverage</h2>
      <p className="text-gray-600 mb-12">
        Our CDN spans 350+ Points of Presence worldwide for unparalleled coverage.
      </p>
      <div className="relative group cursor-pointer">
        <Link href="/network">
          <div className="relative">
            <StaticDelivrImage 
              src="/assets/img/network-map.png"
              alt="World Map showing CDN nodes"
              className="w-full rounded-lg shadow-lg brightness-50 transition-all duration-300 group-hover:brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 px-8 py-4 rounded-lg shadow-md transform transition-transform duration-300 group-hover:scale-105">
                <span className="text-lg font-semibold text-gray-800">
                  View Our Network Map
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </section>
);

export default NetworkMapSection;