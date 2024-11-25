import React, { useEffect, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl'; // Importing Map type from mapbox-gl
import 'mapbox-gl/dist/mapbox-gl.css';

// Set Mapbox token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface PoPLocation {
  city: string;
  country: string;
  coordinates: [number, number];
  provider: string;
}

interface Provider {
  name: string;
  dotColor: string; // Tailwind classes for color
}

const NetworkMap: React.FC = () => {
  const [map, setMap] = useState<Map | null>(null);
  const [popLocations, setPopLocations] = useState<PoPLocation[]>([]);
  const [providers, setProviders] = useState<Record<string, Provider>>({});

  useEffect(() => {
    // Fetching PoP data from the JSON file
    const fetchPoPData = async () => {
      const response = await fetch('/data/pop_locations.json');
      const data: PoPLocation[] = await response.json();
      setPopLocations(data);
    };

    // Fetching provider data from external source
    const fetchProviderData = async () => {
      const response = await fetch('/data/providers.json'); // Assuming this JSON is in the public folder
      const data: Record<string, Provider> = await response.json();
      setProviders(data);
    };

    fetchPoPData();
    fetchProviderData();

    // Initialize Mapbox map
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [0, 20], // Center the map
        zoom: 2,
      });

      setMap(newMap);
    };

    // Only initialize the map if it's not already initialized
    if (!map && typeof window !== 'undefined') {
      initializeMap();
    }

    // Cleanup function to safely remove map and markers
    return () => {
      if (map) {
        map.remove(); // Safely remove the map if it's initialized
      }
    };
  }, [map]); // Run effect when map changes

  useEffect(() => {
    // If popLocations or providers are empty or map is not initialized yet, return early
    if (!map || popLocations.length === 0 || Object.keys(providers).length === 0) return;

    // Add markers for each PoP location
    popLocations.forEach((pop) => {
      const provider = providers[pop.provider];

      // If the provider data is not available, skip this location
      if (!provider) return;

      const marker = document.createElement('div');
      marker.className = `w-3 h-3 rounded-full ${provider.dotColor}`;

      new mapboxgl.Marker(marker)
        .setLngLat(pop.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="p-2">
                <h3 class="font-bold">${pop.city}</h3>
                <p class="text-sm">${pop.country}</p>
                <p class="text-sm text-gray-600">Provider: ${provider.name}</p>
              </div>
            `),
        )
        .addTo(map);
    });
  }, [popLocations, map, providers]); // Run effect when popLocations, map, or providers change

  return (
    <div className="relative w-full">
      {/* Provider Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-sm p-4 z-10">
        <div className="flex flex-col space-y-2">
          {Object.entries(providers).map(([key, provider]) => (
            <div key={key} className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${provider.dotColor}`}></div>
              <span className="text-sm text-gray-600">{provider.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div id="map" className="w-full h-96 rounded-xl"></div>
    </div>
  );
};

export default NetworkMap;
