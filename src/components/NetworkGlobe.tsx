"use client";

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import mapboxgl, { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
    Activity,
    Map as MapIcon, Box
} from 'lucide-react';
import { FadeIn } from './FadeIn';

// Set Mapbox token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface PoPLocation {
    city: string;
    coordinates: [number, number];
    provider: string;
}

interface Provider {
    name: string;
    dotColor: string; // Tailwind classes
    provider?: string; // Add this to fix the type overlap issue if needed, but the original interface didn't have it.
    // Actually, looking at the code: providers[pop.provider].
    // The Provider interface is for the *value* in the providers record.
}

const NetworkGlobe = () => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<Map | null>(null);
    const [is3D, setIs3D] = useState(true);
    const [popLocations, setPopLocations] = useState<PoPLocation[]>([]);
    const [providers, setProviders] = useState<Record<string, Provider>>({});
    const [nodeCount, setNodeCount] = useState(577);

    // --- Data Fetching ---
    useEffect(() => {
        const fetchPoPData = async () => {
            try {
                const response = await fetch('/data/pop_locations.json');
                if (response.ok) {
                    const data: PoPLocation[] = await response.json();
                    setPopLocations(data);
                    setNodeCount(data.length);
                }
            } catch (e) { console.error("Failed to load PoPs", e); }
        };

        const fetchProviderData = async () => {
            try {
                const response = await fetch('/data/providers.json');
                if (response.ok) {
                    const data: Record<string, Provider> = await response.json();
                    setProviders(data);
                }
            } catch (e) { console.error("Failed to load Providers", e); }
        };

        // Assuming these files are public/data/... which works from client
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
            pitch: 45,
            projection: 'globe',
            attributionControl: false,
            logoPosition: 'bottom-left'
        });

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
        <FadeIn delay={0.1} className="relative w-full h-[700px] rounded-[2.5rem] overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-900">

            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/50 to-white/50 dark:from-zinc-900/50 dark:to-zinc-950/50 pointer-events-none z-0" />

            {/* Actual Map Canvas */}
            <div ref={mapContainer} className="w-full h-full relative z-0" />

            {/* --- Stats HUD --- */}
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

            {/* --- Floating UI: View Toggle --- */}
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

            {/* --- Floating UI: Legend --- */}
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
                                <span className="w-2 h-2 rounded-full bg-zinc-300 animate-pulse" /> Loading...
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </FadeIn>
    );
};

export default NetworkGlobe;
