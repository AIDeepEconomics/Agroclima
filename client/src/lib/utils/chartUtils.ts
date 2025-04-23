import { HistoricalDataPoint } from "../types";

// Process data for temperature chart
export function processTemperatureData(data: HistoricalDataPoint[]) {
  return data.map(item => ({
    date: item.date,
    temperature: item.temp,
  }));
}

// Process data for precipitation chart
export function processPrecipitationData(data: HistoricalDataPoint[]) {
  return data.map(item => ({
    date: item.date,
    precipitation: item.precipitation,
  }));
}

// Process data for humidity chart
export function processHumidityData(data: HistoricalDataPoint[]) {
  return data.map(item => ({
    date: item.date,
    humidity: item.humidity,
  }));
}

// Get color based on data type for charts
export function getChartColor(dataType: string): string {
  const colors = {
    temperature: "#ef4444", // red
    precipitation: "#3b82f6", // blue
    humidity: "#22c55e", // green
    windSpeed: "#14b8a6", // teal
    pressure: "#f97316", // orange
    visibility: "#a855f7", // purple
    uvIndex: "#ec4899", // pink
  };

  return colors[dataType as keyof typeof colors] || "#64748b"; // gray as default
}

// Calculate min and max for y-axis with padding
export function calculateAxisDomain(data: number[], paddingPercent = 10): [number, number] {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const padding = ((max - min) * paddingPercent) / 100;
  
  return [Math.max(0, min - padding), max + padding];
}

// Format tick values based on data type
export function formatTickValues(value: number, dataType: string): string {
  switch (dataType) {
    case "temperature":
      return `${value}°C`;
    case "precipitation":
      return `${value} mm`;
    case "humidity":
    case "cloudCover":
      return `${value}%`;
    case "windSpeed":
      return `${value} km/h`;
    case "pressure":
      return `${value} hPa`;
    case "visibility":
      return `${value} km`;
    default:
      return `${value}`;
  }
}

// Generate consistent tick values for charts
export function generateTickValues(min: number, max: number, count = 5): number[] {
  const range = max - min;
  const step = range / (count - 1);
  
  return Array.from({ length: count }, (_, i) => {
    return Math.round((min + i * step) * 10) / 10;
  });
}

// Calculate moving average for smoothing data
export function calculateMovingAverage(data: number[], windowSize = 3): number[] {
  if (windowSize < 2) return data;
  
  const result = [];
  
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    let count = 0;
    
    for (let j = Math.max(0, i - Math.floor(windowSize/2)); 
         j <= Math.min(data.length - 1, i + Math.floor(windowSize/2)); 
         j++) {
      sum += data[j];
      count++;
    }
    
    result.push(sum / count);
  }
  
  return result;
}
