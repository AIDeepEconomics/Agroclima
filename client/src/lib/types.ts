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

// Agricultural types
export type CropType = 'soybean' | 'corn' | 'wheat' | 'barley';

export interface Crop {
  id: number;
  name: string;
  scientificName?: string;
  type: CropType;
  description?: string;
  iconPath?: string;
  color?: string; // Color code for visualization
}

export interface CropStage {
  id: number;
  cropId: number;
  name: string; // Stage code (e.g., "V1", "R1")
  label: string; // Display label (e.g., "Emergence")
  description?: string;
  dayRangeStart?: number; // Days from planting (min)
  dayRangeEnd?: number; // Days from planting (max)
  isCritical: boolean; // Whether it's a critical stage
  temperatureMin?: number; // Min temperature for optimal growth
  temperatureMax?: number; // Max temperature for optimal growth
  waterRequirement?: number; // Water need in mm/day
  iconPath?: string;
  sortOrder: number; // For visualization ordering
}

export interface Field {
  id: number;
  userId: number;
  name: string;
  description?: string;
  area?: number; // Area in hectares
  geometry?: any; // GeoJSON polygon
}

export interface CropPlanting {
  id: number;
  fieldId: number;
  cropId: number;
  crop?: Crop;
  plantingDate: Date;
  harvestDate?: Date;
  variety?: string;
  seedingRate?: number; // Kg/ha or seeds/ha
  notes?: string;
  currentStage?: CropStage;
}

export type RiskType = 'drought' | 'frost' | 'hail' | 'flood' | 'heat' | 'disease';

export interface AgriculturalRisk {
  id: number;
  locationId: number;
  cropId: number;
  cropStageId?: number;
  crop?: Crop;
  cropStage?: CropStage;
  date: Date;
  riskType: RiskType;
  riskLevel: number; // 0-100
  probability: number; // 0-1
  details?: any; // Additional details
}

export interface AgronomicRecommendation {
  id: number;
  riskId: number;
  title: string;
  description: string;
  priority: number; // 1-5 priority
  actionType?: 'preventive' | 'corrective';
  source?: string; // Source of recommendation (e.g., "INIA")
}

export interface RegionalRiskSummary {
  regionName: string;
  risks: {
    drought: number;
    frost: number;
    hail: number;
    flood: number;
    heat: number;
    disease: number;
  };
  highestRisk: RiskType;
  highestRiskLevel: number;
}

export interface WaterBalanceData {
  date: string;
  precipitation: number;
  evapotranspiration: number;
  deficit: number;
  surplus: number;
  balance: number;
}
