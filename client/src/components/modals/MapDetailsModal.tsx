import React from 'react';
import { CurrentWeather } from '@/lib/types';
import { 
  formatTemperature, 
  formatWindSpeed, 
  formatWindDirection, 
  formatPressure 
} from '@/lib/utils/formatters';

interface MapDetailsModalProps {
  onClose: () => void;
  point: { lat: number; lng: number };
  weatherData: CurrentWeather;
}

export function MapDetailsModal({ 
  onClose, 
  point, 
  weatherData 
}: MapDetailsModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">Weather Details</h3>
          <button 
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" 
            aria-label="Close"
            onClick={onClose}
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-full">
              <span className="material-icons text-blue-500 dark:text-blue-400 text-2xl">
                location_on
              </span>
            </div>
            <div>
              <h4 className="text-lg font-medium text-slate-900 dark:text-white">
                Central Park, NY
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {point.lat.toFixed(3)}°N, {point.lng.toFixed(3)}°W
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400">Temperature</p>
              <p className="text-xl font-mono font-medium text-slate-900 dark:text-white">
                {formatTemperature(weatherData.temperature)}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400">Humidity</p>
              <p className="text-xl font-mono font-medium text-slate-900 dark:text-white">
                {weatherData.humidity}%
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400">Wind</p>
              <p className="text-xl font-mono font-medium text-slate-900 dark:text-white">
                {formatWindSpeed(weatherData.windSpeed)} {formatWindDirection(weatherData.windDirection)}
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400">Pressure</p>
              <p className="text-xl font-mono font-medium text-slate-900 dark:text-white">
                {formatPressure(weatherData.pressure)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <button className="inline-flex items-center px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700">
              <span className="material-icons text-sm mr-2">favorite_border</span>
              Save Location
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600">
              <span className="material-icons text-sm mr-2">calendar_today</span>
              View Forecast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
