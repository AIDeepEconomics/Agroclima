export const DEFAULT_LOCATION = {
  id: 1,
  name: "New York, NY",
  latitude: 40.7128,
  longitude: -74.0060,
  isFavorite: true,
};

export const DEFAULT_MAP_LAYERS: Record<string, any> = {
  temperature: {
    id: "temperature",
    name: "Temperature",
    color: "#ef4444", // red
    isVisible: true,
    opacity: 80,
  },
  wind: {
    id: "wind",
    name: "Wind Speed",
    color: "#3b82f6", // blue
    isVisible: true,
    opacity: 60,
  },
  precipitation: {
    id: "precipitation",
    name: "Precipitation",
    color: "#22c55e", // green
    isVisible: true,
    opacity: 70,
  },
  clouds: {
    id: "clouds",
    name: "Clouds",
    color: "#a855f7", // purple
    isVisible: false,
    opacity: 60,
  },
  pressure: {
    id: "pressure",
    name: "Pressure",
    color: "#f97316", // amber
    isVisible: false,
    opacity: 60,
  },
  visibility: {
    id: "visibility",
    name: "Visibility",
    color: "#14b8a6", // teal
    isVisible: false,
    opacity: 60,
  },
  uvIndex: {
    id: "uvIndex",
    name: "UV Index",
    color: "#ef4444", // red
    isVisible: false,
    opacity: 60,
  },
};

export const CHART_TYPES = [
  { value: "temperature", label: "Temperature" },
  { value: "precipitation", label: "Precipitation" },
  { value: "humidity", label: "Humidity" },
  { value: "windSpeed", label: "Wind Speed" },
];

export const DATE_RANGES = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "custom", label: "Custom Range" },
];

export const TEMPERATURE_UNITS = [
  { value: "celsius", label: "Celsius (°C)" },
  { value: "fahrenheit", label: "Fahrenheit (°F)" },
];

export const WIND_SPEED_UNITS = [
  { value: "kmh", label: "km/h" },
  { value: "mph", label: "mph" },
  { value: "ms", label: "m/s" },
];

export const PRESSURE_UNITS = [
  { value: "hPa", label: "hPa" },
  { value: "mmHg", label: "mmHg" },
  { value: "inHg", label: "inHg" },
];

export const MAP_STYLES = [
  { value: "streets", label: "Streets" },
  { value: "satellite", label: "Satellite" },
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
];
