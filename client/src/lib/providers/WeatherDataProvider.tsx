import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '../queryClient';
import { WeatherData, Location } from '../types';
import { weatherData as mockWeatherData } from '../mockData';
import { DEFAULT_LOCATION } from '../constants';

interface WeatherDataContextType {
  weatherData: WeatherData;
  currentLocation: Location;
  setCurrentLocation: (location: Location) => void;
  isLoading: boolean;
  isError: boolean;
  refreshData: () => void;
}

export const WeatherDataContext = createContext<WeatherDataContextType | undefined>(undefined);

interface WeatherDataProviderProps {
  children: ReactNode;
}

export function WeatherDataProvider({ children }: WeatherDataProviderProps) {
  const [currentLocation, setCurrentLocation] = useState<Location>(DEFAULT_LOCATION);
  
  const { 
    data,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ['/api/weather/current', currentLocation.id],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const forecastQuery = useQuery({
    queryKey: ['/api/weather/forecast', currentLocation.id],
    staleTime: 60 * 60 * 1000, // 1 hour
  });

  const historicalQuery = useQuery({
    queryKey: ['/api/weather/historical', currentLocation.id],
    staleTime: 24 * 60 * 60 * 1000, // 1 day
  });

  // Combine all data
  const weatherData: WeatherData = {
    current: data?.current || mockWeatherData.current,
    forecast: forecastQuery.data?.forecast || mockWeatherData.forecast,
    historical: historicalQuery.data?.historical || mockWeatherData.historical,
  };

  const refreshData = () => {
    refetch();
    forecastQuery.refetch();
    historicalQuery.refetch();
  };

  const value = {
    weatherData,
    currentLocation,
    setCurrentLocation,
    isLoading: isLoading || forecastQuery.isLoading || historicalQuery.isLoading,
    isError: isError || forecastQuery.isError || historicalQuery.isError,
    refreshData,
  };

  return (
    <WeatherDataContext.Provider value={value}>
      {children}
    </WeatherDataContext.Provider>
  );
}
