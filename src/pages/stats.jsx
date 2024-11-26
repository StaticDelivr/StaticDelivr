import React from 'react';
import { TrendingUp, TrendingDown, Globe, Server, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StatCard = ({ title, value, change, icon: Icon }) => {
  const isPositive = change > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-blue-50">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        {change !== undefined && (
          <div className={`flex items-center ${trendColor} text-sm`}>
            <TrendIcon className="w-4 h-4 mr-1" />
            {Math.abs(change)}%
          </div>
        )}
      </div>
    </div>
  );
};

const StatsPage = () => {
  return (
    <div>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-white opacity-70 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">
              Network Statistics
            </h1>
            <p className="text-xl text-gray-600 text-center mb-12">
              Real-time insights into StaticDelivr&apos;s global network performance and usage.
            </p>
          </div>
        </section>

        {/* Stats Grid Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <StatCard
                title="Total Monthly Requests"
                value="148M+"
                change={2.8}
                icon={Globe}
              />
              <StatCard
                title="Total Bandwidth"
                value="5.2 TB"
                change={-1.2}
                icon={Server}
              />
              <StatCard
                title="Cache Hit Rate"
                value="99.45%"
                icon={Zap}
              />
            </div>

            {/* Additional Stats Info */}
            <div className="mt-20 bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold mb-6">Network Information</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Global Coverage</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-600 mr-3"></div>
                      350+ Points of Presence
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-600 mr-3"></div>
                      6 Continents Covered
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-600 mr-3"></div>
                      Multiple Tier-1 Providers
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Performance</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-600 mr-3"></div>
                      &lt;50ms Average Response Time
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-600 mr-3"></div>
                      99.9% Uptime SLA
                    </li>
                    <li className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-600 mr-3"></div>
                      Automatic Failover
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

export default StatsPage;