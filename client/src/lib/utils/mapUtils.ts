import { MapLayer } from "../types";

// Calculate color gradient for temperature
export function getTemperatureColor(temp: number): string {
  // Temperature color range from blue (cold) to red (hot)
  // Assuming temperature range from -20°C to 40°C
  const normalizedTemp = Math.max(0, Math.min(1, (temp + 20) / 60));
  
  // Calculate RGB values for gradient
  const r = Math.round(normalizedTemp * 255);
  const b = Math.round((1 - normalizedTemp) * 255);
  const g = Math.round(Math.min(r, b) / 2);
  
  return `rgb(${r}, ${g}, ${b})`;
}

// Calculate color for wind speed
export function getWindSpeedColor(speed: number): string {
  // Wind speed color range from green (calm) to blue (strong)
  // Assuming wind speed range from 0 to 100 km/h
  const normalizedSpeed = Math.max(0, Math.min(1, speed / 100));
  
  // Calculate RGB values for gradient
  const g = Math.round((1 - normalizedSpeed) * 255);
  const b = Math.round(normalizedSpeed * 255);
  
  return `rgb(0, ${g}, ${b})`;
}

// Calculate color for precipitation
export function getPrecipitationColor(precipitation: number): string {
  // Precipitation color range from light blue (light) to dark blue (heavy)
  // Assuming precipitation range from 0 to 50 mm
  const normalizedPrecipitation = Math.max(0, Math.min(1, precipitation / 50));
  
  // Calculate RGB values for gradient (blue with varying intensity)
  const intensity = Math.round(120 + (normalizedPrecipitation * 135));
  const r = Math.round(100 - (normalizedPrecipitation * 100));
  const g = Math.round(150 - (normalizedPrecipitation * 100));
  
  return `rgb(${r}, ${g}, ${intensity})`;
}

// Get layer opacity as a decimal value
export function getLayerOpacity(layer: MapLayer): number {
  return layer.opacity / 100;
}

// Check if coordinates are valid
export function isValidCoordinates(lat: number, lng: number): boolean {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

// Calculate bounding box for a given center point and radius in km
export function getBoundingBox(
  centerLat: number,
  centerLng: number,
  radiusKm: number
): [number, number, number, number] {
  const latRadian = (centerLat * Math.PI) / 180;
  
  // Approximation for kilometers to degrees
  const kmInLongitudeDegree = 111.32 * Math.cos(latRadian);
  const kmInLatitudeDegree = 110.574;
  
  const latDelta = radiusKm / kmInLatitudeDegree;
  const lngDelta = radiusKm / kmInLongitudeDegree;
  
  const minLat = centerLat - latDelta;
  const maxLat = centerLat + latDelta;
  const minLng = centerLng - lngDelta;
  const maxLng = centerLng + lngDelta;
  
  return [minLng, minLat, maxLng, maxLat];
}

// Convert from one coordinate system to another (e.g., for map projections)
export function convertCoordinates(
  lat: number,
  lng: number,
  fromSystem: string,
  toSystem: string
): [number, number] {
  // Simple implementation - in a real app, you'd use a proper projection library
  // This is just a placeholder for the concept
  if (fromSystem === "wgs84" && toSystem === "mercator") {
    const x = lng * 20037508.34 / 180;
    const y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    return [x, y * 20037508.34 / 180];
  }
  
  // Default: return original coordinates
  return [lng, lat];
}
