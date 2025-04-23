export interface CurrentWeather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  pressure: number;
  visibility: number;
  uvIndex: number;
}

export interface ForecastItem {
  day: string;
  date: string;
  temp: number;
  tempMin: number;
  icon: string;
  precipitation: number;
  condition: string;
}

export interface HistoricalDataPoint {
  date: string;
  temp: number;
  humidity: number;
  precipitation: number;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastItem[];
  historical: HistoricalDataPoint[];
}

export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  isFavorite: boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  temperatureUnit: 'celsius' | 'fahrenheit';
  windSpeedUnit: 'kmh' | 'mph' | 'ms';
  defaultLocation: number;
  favoriteLocations: number[];
}

export type MapLayer = {
  id: string;
  name: string;
  color: string;
  isVisible: boolean;
  opacity: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}
