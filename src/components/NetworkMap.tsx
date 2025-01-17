import React, { useEffect, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl'; // Importing Map type from mapbox-gl
import 'mapbox-gl/dist/mapbox-gl.css';

// Set Mapbox token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

interface PoPLocation {
  city: string;
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
  const [is3D, setIs3D] = useState(false);

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
        style: 'mapbox://styles/mapbox/light-v10',
        center: [0, 20], // Center the map
        zoom: 1,
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

  // Handle view toggle
  const toggleView = () => {
    if (map) {
      const newIs3D = !is3D;
      setIs3D(newIs3D);
      map.setStyle(newIs3D ? 'mapbox://styles/mapbox/light-v11' : 'mapbox://styles/mapbox/light-v10');
      
      // Re-add markers after style change
      map.once('style.load', () => {
        addMarkers();
      });
    }
  };

  // Function to add markers
  const addMarkers = () => {
    if (!map || popLocations.length === 0 || Object.keys(providers).length === 0) return;

    // Remove existing markers if any
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());

    popLocations.forEach((pop) => {
      const provider = providers[pop.provider];

      // If the provider data is not available, skip this location
      if (!provider) return;

      const marker = document.createElement('div');
      marker.className = `w-3 h-3 rounded-full border-2 border-white shadow-md ${provider.dotColor}`;


      new mapboxgl.Marker(marker)
        .setLngLat(pop.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="p-2">
                <h3 class="font-bold">${pop.city}</h3>
                <p class="text-sm text-gray-600">Provider: ${provider.name}</p>
              </div>
            `),
        )
        .addTo(map);
    });
  };

  useEffect(() => {
    addMarkers();
  }, [popLocations, map, providers]); // Run effect when popLocations, map, or providers change

  return (
    <div className="relative w-full">
      {/* Toggle Button */}
      <button
        onClick={toggleView}
        className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-xl z-10 border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">
            {is3D ? '2D View' : '3D View'}
          </span>
          {is3D ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </button>

      {/* Provider Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 z-10 border border-gray-200">
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
