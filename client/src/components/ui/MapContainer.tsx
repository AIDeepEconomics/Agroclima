import React from 'react';
import WeatherMap from './WeatherMap';
import TimelineControl from './TimelineControl';

interface MapContainerProps {
  title?: string;
  location?: string;
}

export function MapContainer({ title = "Weather Map", location = "New York, NY" }: MapContainerProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-slate-900 dark:text-white">{title}</h2>
        <div className="flex space-x-2">
          <button className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700">
            <span className="material-icons text-sm">fullscreen</span>
          </button>
          <button className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700">
            <span className="material-icons text-sm">more_vert</span>
          </button>
        </div>
      </div>
      
      {/* Map Container */}
      <div className="w-full h-[28rem] rounded-lg relative">
        <WeatherMap location={location} />
      </div>
      
      {/* Timeline Control */}
      <TimelineControl />
    </div>
  );
}

export default MapContainer;
