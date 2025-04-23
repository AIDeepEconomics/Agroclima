import React, { useEffect, useRef, useState } from 'react';
import { useMapLayers } from '@/hooks/use-map-layers';
import { useWeatherData } from '@/hooks/use-weather-data';
import { MapDetailsModal } from '@/components/modals/MapDetailsModal';

interface WeatherMapProps {
  location: string;
}

export function WeatherMap({ location }: WeatherMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { layers } = useMapLayers();
  const { weatherData } = useWeatherData();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<{lat: number, lng: number} | null>(null);

  // This would be replaced with actual map initialization logic
  // using MapboxGL or Leaflet in a real implementation
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Placeholder for map initialization
    const mockMapElement = document.createElement('div');
    mockMapElement.className = 'absolute inset-0 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center';
    mockMapElement.innerHTML = `
      <div class="absolute inset-0 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1618173745439-3d0a4a18e6c3?ixlib=rb-4.0.3" 
             alt="Weather map visualization" 
             class="w-full h-full object-cover opacity-60" />
      </div>
      <div class="absolute flex flex-col items-center justify-center bg-white/80 dark:bg-slate-800/80 p-6 rounded-lg">
        <span class="material-icons text-5xl text-primary-500 mb-2">public</span>
        <p class="text-center text-slate-700 dark:text-slate-200">
          Interactive Weather Map<br/>
          ${location}
        </p>
      </div>
    `;
    
    // Simulate map click event
    mockMapElement.addEventListener('click', () => {
      setSelectedPoint({ lat: 40.7128, lng: -74.0060 });
      setShowDetailsModal(true);
    });
    
    // Clean up previous content and add new map
    mapRef.current.innerHTML = '';
    mapRef.current.appendChild(mockMapElement);
    
    return () => {
      // Cleanup function
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, [location]);

  // In a real implementation, this effect would update map layers
  useEffect(() => {
    console.log('Map layers updated:', layers);
    // Update map layers on the map instance
  }, [layers]);

  return (
    <>
      <div ref={mapRef} className="w-full h-full"></div>
      
      {showDetailsModal && selectedPoint && (
        <MapDetailsModal 
          point={selectedPoint}
          onClose={() => setShowDetailsModal(false)}
          weatherData={weatherData.current}
        />
      )}
    </>
  );
}

export default WeatherMap;
