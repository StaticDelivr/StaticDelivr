import React, { useCallback, useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { 
  Server, Wifi, Activity, Terminal, 
  ShieldCheck, Network, Layers,
  Map as MapIcon, Box
} from 'lucide-react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

// Set Mapbox token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

// --- Types ---
interface PoPLocation {
  city: string;
  coordinates: [number, number];
  provider: string;
}

interface Provider {
  name: string;
  dotColor: string; // Tailwind classes
}

// --- Animation Wrapper ---
const FadeIn = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

const NetworkPage = () => {
  // --- Map State ---
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [is3D, setIs3D] = useState(true); // Default to 3D
  const [popLocations, setPopLocations] = useState<PoPLocation[]>([]);
  const [providers, setProviders] = useState<Record<string, Provider>>({});
  const [nodeCount, setNodeCount] = useState(577); // Default fallback

  // --- Data Fetching ---
  useEffect(() => {
    const fetchPoPData = async () => {
      try {
        const response = await fetch('/data/pop_locations.json');
        if(response.ok) {
           const data: PoPLocation[] = await response.json();
           setPopLocations(data);
           setNodeCount(data.length);
        }
      } catch(e) { console.error("Failed to load PoPs", e); }
    };

    const fetchProviderData = async () => {
      try {
        const response = await fetch('/data/providers.json');
        if(response.ok) {
           const data: Record<string, Provider> = await response.json();
           setProviders(data);
        }
      } catch(e) { console.error("Failed to load Providers", e); }
    };

    fetchPoPData();
    fetchProviderData();
  }, []);

  // --- Map Initialization ---
  useEffect(() => {
    if (map || !mapContainer.current) return;

    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [10, 20], 
      zoom: 1.5,
      pitch: 45, // Slight initial pitch
      projection: 'globe', 
      attributionControl: false, // Hides the bottom-right text
      logoPosition: 'bottom-left'
    });
    
    // Add atmosphere and fog
    newMap.on('style.load', () => {
        newMap.setFog({
            color: 'rgb(255, 255, 255)', 
            'high-color': 'rgb(200, 200, 225)', 
            'horizon-blend': 0.1, 
            'space-color': 'rgb(250, 250, 250)', 
            'star-intensity': 0 
        });
    });

    setMap(newMap);

    return () => newMap.remove();
  }, [mapContainer]);

  // --- Markers Logic ---
  const addMarkers = useCallback(() => {
    if (!map || popLocations.length === 0 || Object.keys(providers).length === 0) return;

    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());

    popLocations.forEach((pop) => {
      const provider = providers[pop.provider];
      if (!provider) return;

      const el = document.createElement('div');
      el.className = `w-2.5 h-2.5 rounded-full border border-white/80 shadow-[0_0_8px_rgba(0,0,0,0.15)] cursor-pointer hover:scale-150 transition-transform duration-200 ${provider.dotColor}`;

      const popup = new mapboxgl.Popup({ offset: 15, closeButton: false })
        .setHTML(`
          <div class="px-3 py-2 font-sans text-zinc-800">
            <h3 class="font-bold text-sm leading-none mb-1">${pop.city}</h3>
            <p class="text-[10px] text-zinc-500 uppercase tracking-wide">${provider.name}</p>
          </div>
        `);

      new mapboxgl.Marker(el)
        .setLngLat(pop.coordinates)
        .setPopup(popup)
        .addTo(map);
    });
  }, [map, popLocations, providers]);

  useEffect(() => {
    addMarkers();
  }, [popLocations, map, providers, addMarkers]);

  // --- Toggle View Logic ---
  const toggleView = () => {
    if (!map) return;
    const newIs3D = !is3D;
    setIs3D(newIs3D);

    if (newIs3D) {
       map.easeTo({ pitch: 45, bearing: 0, zoom: 1.5, duration: 1500 });
       map.setProjection('globe');
    } else {
       map.easeTo({ pitch: 0, bearing: 0, zoom: 1.2, duration: 1500 });
       map.setProjection('mercator');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black selection:bg-teal-500/30 font-sans">
      <Head>
        <title>Network Map | StaticDelivr</title>
        <meta name="description" content="View our global edge locations and network topology." />
        <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
        {/* CSS to hide Mapbox logo completely as requested */}
        <style>{`
          .mapboxgl-ctrl-logo {
            display: none !important;
          }
        `}</style>
      </Head>

      <Header />

      <main className="relative pt-32 pb-20 overflow-hidden">
        
        {/* "Tealish" Background Gradient Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-br from-teal-500/10 via-cyan-500/10 to-transparent blur-[100px] rounded-full pointer-events-none" />

        {/* --- Hero Section --- */}
        <section className="px-6 mb-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-600 dark:text-zinc-400 mb-8">
                <Terminal className="w-3 h-3" />
                <span>$ staticdelivr --network --map</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6">
                Global presence.<br />
                <span className="text-zinc-400 dark:text-zinc-600">Local performance.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-10">
                Our multi-CDN architecture routes traffic through extensive points of presence worldwide, ensuring your content is always served from the closest available node.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* --- Map Wrapper --- */}
        <section className="px-6 mb-32 relative z-10">
           <div className="max-w-7xl mx-auto">
              
              <FadeIn delay={0.1} className="relative w-full h-[700px] rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-900">
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/50 to-white/50 dark:from-zinc-900/50 dark:to-zinc-950/50 pointer-events-none z-0" />
                
                {/* Actual Map Canvas */}
                <div ref={mapContainer} className="w-full h-full relative z-0" />

                {/* --- Stats HUD (Back inside the map, Top Right) --- */}
                <div className="absolute top-6 right-6 z-10 hidden sm:block">
                   <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-sm px-6 py-4 flex gap-8 items-center">
                      <div>
                         <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1">Nodes</div>
                         <div className="text-3xl font-bold text-zinc-900 dark:text-white leading-none">{nodeCount}</div>
                      </div>
                      <div className="w-px h-10 bg-zinc-200 dark:bg-zinc-700" />
                      <div>
                         <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider mb-1">Status</div>
                         <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500 font-bold text-sm">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Operational
                         </div>
                      </div>
                   </div>
                </div>

                {/* --- Floating UI: View Toggle (Top Left) --- */}
                <div className="absolute top-6 left-6 z-10">
                   <button
                     onClick={toggleView}
                     className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 shadow-sm hover:bg-white dark:hover:bg-zinc-900 transition-all active:scale-95 group"
                   >
                     {is3D ? <MapIcon className="w-4 h-4 text-zinc-500 dark:text-zinc-400" /> : <Box className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />}
                     <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                       {is3D ? '2D Flat View' : '3D Globe View'}
                     </span>
                   </button>
                </div>

                {/* --- Floating UI: Legend (Bottom Left) --- */}
                <div className="absolute bottom-8 left-6 z-10 w-48">
                   <div className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-lg p-5">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">Providers</div>
                      <div className="space-y-3">
                         {Object.entries(providers).map(([key, provider]) => (
                            <div key={key} className="flex items-center gap-3">
                               <div className={`w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-zinc-800 shadow-sm ${provider.dotColor}`} />
                               <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{provider.name}</span>
                            </div>
                         ))}
                         {Object.keys(providers).length === 0 && (
                           <div className="flex items-center gap-2 text-xs text-zinc-400">
                              <span className="w-2 h-2 rounded-full bg-zinc-300 animate-pulse"/> Loading...
                           </div>
                         )}
                      </div>
                   </div>
                </div>

              </FadeIn>
           </div>
        </section>

        {/* --- Network Features Grid --- */}
        <section className="px-6 mb-32">
           <div className="max-w-6xl mx-auto">
              <FadeIn className="text-center mb-16">
                 <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-4">Architecture Features</h2>
                 <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
                    How we maintain high availability and low latency across a fragmented internet.
                 </p>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* Card 1 */}
                 <FadeIn delay={0.1} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
                       <Network className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Smart Routing</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                       Our DNS dynamically routes users to the fastest available provider based on real-time latency metrics from their region.
                    </p>
                 </FadeIn>

                 {/* Card 2 */}
                 <FadeIn delay={0.2} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                       <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Failover Redundancy</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                       If a specific PoP or provider goes down, traffic is instantly rerouted to the next best node. No single point of failure.
                    </p>
                 </FadeIn>

                 {/* Card 3 */}
                 <FadeIn delay={0.3} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                       <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Tiered Caching</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                       Requests that miss the edge are checked against regional mid-tier caches before hitting the origin, reducing load times.
                    </p>
                 </FadeIn>
              </div>
           </div>
        </section>

        {/* --- Final CTA (Updated Style) --- */}
        <section className="px-6 pb-24 relative z-10">
          <FadeIn>
            <div className="max-w-4xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-zinc-900 dark:bg-zinc-950 border border-zinc-800 p-12 md:p-20 text-center shadow-2xl">
              
              {/* Background Glow inside CTA */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-zinc-900 to-transparent opacity-50 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-teal-400 font-medium mb-6">
                   <Wifi className="w-5 h-5" />
                   <span>Join the network</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 tracking-tight">
                   Help us reach every<br />corner of the world.
                </h2>
                
                <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                  We are actively looking for infrastructure partners in underserved regions to improve latency for local communities and reduce performance inequality.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/become-a-sponsor"
                    className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-white px-8 font-medium text-zinc-950 transition-all duration-300 hover:bg-zinc-200 hover:scale-105"
                  >
                    <span className="mr-2">Sponsor a Node</span>
                    <Server className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </Link>
                  <Link
                    href="/stats"
                    className="inline-flex h-12 items-center justify-center rounded-full px-8 font-medium text-white transition-colors hover:text-zinc-300 border border-zinc-700 hover:bg-zinc-800"
                  >
                    View Traffic Stats <Activity className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default NetworkPage;