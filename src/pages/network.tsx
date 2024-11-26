import React from 'react';
import { Globe, Server, Zap, Info } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NetworkMap from '@/components/NetworkMap';

const NetworkPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-white opacity-70 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
              Global Network
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12">
              Our network spans the globe with 350+ Points of Presence, ensuring lightning-fast content delivery worldwide.
            </p>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
              <div className="h-96">
                <NetworkMap></NetworkMap>
              </div>
            </div>

            {/* Network Stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-2">Global Coverage</h3>
                <p className="text-2xl font-bold text-gray-900">350+ Locations</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Server className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-2">Network Capacity</h3>
                <p className="text-2xl font-bold text-gray-900">100 Tbps+</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg bg-blue-50">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-2">Average Response Time</h3>
                <p className="text-2xl font-bold text-gray-900">&lt;50ms</p>
              </div>
            </div>

            {/* Network Features */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Network Features</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Infrastructure</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <Info className="w-5 h-5 text-blue-600 mr-3" />
                      Tier-1 backbone providers
                    </li>
                    <li className="flex items-center">
                      <Info className="w-5 h-5 text-blue-600 mr-3" />
                      Multiple redundant paths
                    </li>
                    <li className="flex items-center">
                      <Info className="w-5 h-5 text-blue-600 mr-3" />
                      Automatic failover
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Security</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <Info className="w-5 h-5 text-blue-600 mr-3" />
                      DDoS protection
                    </li>
                    <li className="flex items-center">
                      <Info className="w-5 h-5 text-blue-600 mr-3" />
                      SSL/TLS encryption
                    </li>
                    <li className="flex items-center">
                      <Info className="w-5 h-5 text-blue-600 mr-3" />
                      24/7 monitoring
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NetworkPage;