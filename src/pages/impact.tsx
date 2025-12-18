import React from 'react';
import Head from 'next/head';
import { Leaf, Globe, Zap, Heart, ArrowRight, TrendingUp, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuroraBackground } from '../components/ui/aurora-background';
import { BlurFade } from '../components/ui/blur-fade';
import { MagicCard } from '../components/ui/magic-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useTheme } from 'next-themes';
import Link from 'next/link';

// Format helper
const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

interface ImpactStats {
  co2: number;
  trees: number;
  bandwidthSavedGB: number;
  requests: number;
}

interface ImpactPageProps {
  stats: ImpactStats;
}


export async function getStaticProps() {
  try {
    // Fetch real-time stats
    const response = await fetch('https://stats.staticdelivr.com/api/stats?month=previous');
    const data = await response.json();

    // Methodology calculations
    const imageReqs = (data.total.requests || 800000000) * 0.30; // 30% estimated image traffic
    const bytesSaved = imageReqs * (400 * 1024); // 400KB saved per optimized image
    const gbSaved = bytesSaved / (1024 * 1024 * 1024);
    const kwhSaved = gbSaved * 0.15; // 0.15 kWh/GB energy intensity
    const kgCo2 = kwhSaved * 0.475; // 0.475 kg CO₂/kWh global average
    const trees = Math.round(kgCo2 / 22); // ~22kg CO₂ per tree/year

    const stats = {
      co2: Math.round(kgCo2),
      trees: trees,
      bandwidthSavedGB: Math.round(gbSaved),
      requests: data.total.requests || 800000000
    };

    return {
      props: { stats },
      revalidate: 86400 // Revalidate daily
    };
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    // Conservative fallbacks
    return {
      props: {
        stats: {
          co2: 150,
          trees: 7,
          bandwidthSavedGB: 2000,
          requests: 800000000
        }
      },
      revalidate: 3600 // Retry hourly on error
    };
  }
}

const ImpactPage: React.FC<ImpactPageProps> = ({ stats }) => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Head>
        <title>Sustainability & Impact | StaticDelivr</title>
        <meta name="description" content="How StaticDelivr fights digital exclusion and reduces the web's carbon footprint through edge optimization." />
        <meta name="keywords" content="StaticDelivr, sustainability, carbon footprint, digital inclusion, performance inequality, green web, eco-friendly CDN, bandwidth optimization, environmental impact" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        <meta property="og:url" content="https://staticdelivr.com/impact" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sustainability & Impact | StaticDelivr" />
        <meta property="og:description" content="How StaticDelivr fights digital exclusion and reduces the web's carbon footprint through edge optimization." />
        <meta property="og:image" content="https://staticdelivr.com/assets/img/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="StaticDelivr" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="staticdelivr.com" />
        <meta property="twitter:url" content="https://staticdelivr.com/impact" />
        <meta name="twitter:title" content="Sustainability & Impact | StaticDelivr" />
        <meta name="twitter:description" content="How StaticDelivr fights digital exclusion and reduces the web's carbon footprint through edge optimization." />
        <meta name="twitter:image" content="https://staticdelivr.com/assets/img/og-image.png" />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <AuroraBackground className="h-auto min-h-[60vh] py-32">
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium mb-6">
              <Leaf className="w-4 h-4" />
              <span>Sustainable Web Infrastructure</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">
              Our Environmental Impact
            </h1>

            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto mb-10">
              We don&apos;t just deliver content faster. We fight <strong className="text-zinc-900 dark:text-white">Performance Inequality</strong> and reduce the web&apos;s carbon footprint by optimizing every byte at the edge.
            </p>
          </div>
        </AuroraBackground>

        {/* Environmental Impact Stats */}
        <section className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Our Environmental Impact</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                  Real calculations based on {formatNumber(stats.requests)} requests served this month
                </p>
              </div>
            </BlurFade>

            <BlurFade delay={0.2} inView>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                <Card className="border-zinc-200 dark:border-zinc-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                        <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <CardTitle className="text-lg">Bandwidth Optimized</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 font-mono">
                      {formatNumber(stats.bandwidthSavedGB)}
                      <span className="text-lg text-zinc-500 ml-1">GB</span>
                    </div>
                    <CardDescription className="text-sm">
                      Saved this month through image optimization
                    </CardDescription>
                    <Badge variant="secondary" className="mt-2">
                      Up to 90% reduction per asset
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="border-zinc-200 dark:border-zinc-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                        <Leaf className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <CardTitle className="text-lg">CO₂ Avoided</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 font-mono">
                      {formatNumber(stats.co2)}
                      <span className="text-lg text-zinc-500 ml-1">kg</span>
                    </div>
                    <CardDescription className="text-sm">
                      Carbon emissions prevented monthly
                    </CardDescription>
                    <Badge variant="secondary" className="mt-2">
                      Global grid intensity factored
                    </Badge>
                  </CardContent>
                </Card>

                <Card className="border-zinc-200 dark:border-zinc-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                        <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-lg">Trees Equivalent</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-2 font-mono">
                      {formatNumber(stats.trees)}
                    </div>
                    <CardDescription className="text-sm">
                      Trees planted equivalent
                    </CardDescription>
                    <Badge variant="secondary" className="mt-2">
                      ~22kg CO₂ absorbed per tree annually
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <div className="mt-12 bg-white dark:bg-zinc-950 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 max-w-4xl mx-auto">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-1 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Calculation Methodology</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      We estimate that 30% of CDN traffic is optimizable images, with an average of 400KB saved per optimized image.
                      Using industry-standard energy intensity (0.15 kWh/GB) and global carbon intensity (0.475 kg CO₂/kWh),
                      we calculate the environmental impact of our optimization efforts. These figures are updated daily.
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* Fighting Performance Inequality */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-6xl mx-auto">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Fighting Performance Inequality</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                  The modern web is built for high-speed connections, but billions of users still rely on slow networks and expensive data plans.
                </p>
              </div>
            </BlurFade>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <BlurFade delay={0.2} inView>
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-medium">
                    <Heart className="w-4 h-4" />
                    <span>Digital Inclusion</span>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    Democratizing Web Access
                  </h3>
                  <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <p>
                      A 3MB hero image loads instantly in cities with fiber internet, but becomes a frustrating barrier for the <strong className="text-zinc-900 dark:text-white">40% of users</strong> still on 3G networks or expensive metered connections.
                    </p>
                    <p>
                      StaticDelivr democratizes access by automatically optimizing assets at the edge. Users in rural areas, developing countries, or on budget data plans get the same fast experience as developers in tech hubs.
                    </p>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.3} inView>
                <Card className="border-zinc-200 dark:border-zinc-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      Real-World Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="mt-1">3G Networks</Badge>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        90% smaller payloads enable usable web experiences on slow connections
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="mt-1">Data Caps</Badge>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Saves users money on expensive metered connections in developing regions
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="mt-1">Device Battery</Badge>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Lower CPU usage extends battery life on mobile devices
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* The Energy Equation */}
        <section className="py-20 px-4 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-6xl mx-auto">
            <BlurFade delay={0.1} inView>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">The Energy Equation</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                  Every byte transferred consumes electricity. The most sustainable energy is the energy you never use.
                </p>
              </div>
            </BlurFade>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <BlurFade delay={0.2} inView>
                <Card className="border-zinc-200 dark:border-zinc-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-500" />
                      Energy Savings Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="mt-1">Data Centers</Badge>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Prevent redundant origin server fetches and processing
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="mt-1">Transmission</Badge>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Reduce bandwidth usage by up to 90% on image-heavy pages
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Badge variant="outline" className="mt-1">User Devices</Badge>
                      <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        Lower CPU usage and battery consumption on mobile devices
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>

              <BlurFade delay={0.3} inView>
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium">
                    <Leaf className="w-4 h-4" />
                    <span>Environmental Impact</span>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    Sustainable by Design
                  </h3>
                  <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <p>
                      Every byte transferred across the internet consumes electricity—from data centers to transmission networks to user devices. The most sustainable energy is the energy you <strong className="text-zinc-900 dark:text-white">never use</strong>.
                    </p>
                    <p>
                      By optimizing assets at the edge, we prevent unnecessary data transfer, reducing the web's carbon footprint while making it more accessible to everyone.
                    </p>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white dark:bg-zinc-950">
          <div className="max-w-3xl mx-auto text-center">
            <BlurFade delay={0.2} inView>
              <MagicCard
                className="p-12 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                gradientColor={theme === "dark" ? "#262626" : "#E4E4E7"}
              >
                <h2 className="text-3xl font-bold mb-6 text-zinc-900 dark:text-white">Ready to Make an Impact?</h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-300 mb-8">
                  Help us keep the web fast, free, and green. Your sponsorship directly funds the optimization infrastructure that benefits millions of users worldwide.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/sponsors"
                    className="inline-flex items-center px-8 py-4 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium rounded-lg transition-colors"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Become a Sponsor
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center px-8 py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium rounded-lg transition-colors"
                  >
                    Learn More About Us
                  </Link>
                </div>
              </MagicCard>
            </BlurFade>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default ImpactPage;