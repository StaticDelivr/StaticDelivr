import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Globe, Server, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';

const StatsPage = () => {
  const [statsData, setStatsData] = useState(null);

  // Fetch statistics data on the client-side
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('https://stats.staticdelivr.com/api/stats?month=previous');
        const data = await response.json();

        // Extract the total stats and the change values
        const totalStats = data.total;

        setStatsData({
          requests: totalStats.requests,
          bandwidth: totalStats.bandwidth,
          requestsChange: totalStats.change.requests,
          bandwidthChange: totalStats.change.bandwidth,
        });
      } catch (error) {
        console.error('Error fetching stats data:', error);
        // Optionally, set fallback or error data
        setStatsData(null);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <Head>
        <title>Network Statistics - StaticDelivr</title>
        <meta name="description" content="Explore real-time insights into StaticDelivr's global network performance and usage, including monthly requests, bandwidth, and cache hit rate." />
        <meta name="keywords" content="StaticDelivr, network statistics, CDN performance, bandwidth, cache hit rate" />
        <meta name="robots" content="index, follow" />

        <meta property="og:url" content="https://staticdelivr.com/stats" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Network Statistics - StaticDelivr" />
        <meta property="og:description" content="Discover key metrics of StaticDelivr's performance including monthly requests, bandwidth usage, and cache hit rate." />
        <meta property="og:image" content="" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/stats" />
        <meta name="twitter:title" content="Network Statistics - StaticDelivr" />
        <meta name="twitter:description" content="Discover key metrics of StaticDelivr's performance including monthly requests, bandwidth usage, and cache hit rate." />
        <meta name="twitter:image" content="" />
      </Head>

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
                value={statsData ? statsData.requests : 0} // Use full number
                change={statsData ? statsData.requestsChange : 0} // Use change value for requests
                icon={Globe}
                unit=""
              />
              <StatCard
                title="Total Bandwidth"
                value={statsData ? statsData.bandwidth / 1000000 : 0} // Convert to MB
                change={statsData ? statsData.bandwidthChange : 0} // Use change value for bandwidth
                icon={Server}
                unit="MB"
              />
              <StatCard
                title="Cache Hit Rate"
                value="99.45" // Hardcoded or replace with dynamic data
                icon={Zap}
                unit="%"
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
                      Global Coverage
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
