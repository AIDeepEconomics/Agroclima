import { useContext } from 'react';
import { WeatherDataContext } from '@/lib/providers/WeatherDataProvider';

export function useWeatherData() {
  const context = useContext(WeatherDataContext);
  
  if (context === undefined) {
    throw new Error('useWeatherData must be used within a WeatherDataProvider');
  }
  
  return context;
}
