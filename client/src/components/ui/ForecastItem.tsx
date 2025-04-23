import React from 'react';
import { ForecastItem as ForecastItemType } from '@/lib/types';

interface ForecastItemProps {
  forecast: ForecastItemType;
}

export function ForecastItem({ forecast }: ForecastItemProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
      <div className="flex items-center space-x-4">
        <div className="w-10 text-center">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {forecast.day}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="material-icons text-amber-500 dark:text-amber-400">
            {forecast.icon}
          </span>
          <span className="text-sm text-slate-700 dark:text-slate-300">
            {forecast.condition}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <span className="material-icons text-blue-500 dark:text-blue-400 text-sm">
            water_drop
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {forecast.precipitation}%
          </span>
        </div>
        <div className="w-20 text-right">
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {forecast.temp}°
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400 ml-1">
            {forecast.tempMin}°
          </span>
        </div>
      </div>
    </div>
  );
}

export default ForecastItem;
