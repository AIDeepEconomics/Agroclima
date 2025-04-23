// Format temperature to the desired unit and precision
export function formatTemperature(
  temp: number,
  unit: "celsius" | "fahrenheit" = "celsius",
  precision: number = 0
): string {
  if (unit === "fahrenheit") {
    temp = (temp * 9) / 5 + 32;
  }
  return `${temp.toFixed(precision)}°${unit === "celsius" ? "C" : "F"}`;
}

// Format wind speed to the desired unit
export function formatWindSpeed(
  speed: number,
  unit: "kmh" | "mph" | "ms" = "kmh"
): string {
  let formattedSpeed = speed;
  let unitLabel = "km/h";

  if (unit === "mph") {
    formattedSpeed = speed * 0.621371;
    unitLabel = "mph";
  } else if (unit === "ms") {
    formattedSpeed = speed / 3.6;
    unitLabel = "m/s";
  }

  return `${formattedSpeed.toFixed(1)} ${unitLabel}`;
}

// Format wind direction as compass direction
export function formatWindDirection(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

// Format pressure with unit conversion
export function formatPressure(
  pressure: number,
  unit: "hPa" | "mmHg" | "inHg" = "hPa"
): string {
  let formattedPressure = pressure;
  let unitLabel = "hPa";

  if (unit === "mmHg") {
    formattedPressure = pressure * 0.750062;
    unitLabel = "mmHg";
  } else if (unit === "inHg") {
    formattedPressure = pressure * 0.0295301;
    unitLabel = "inHg";
  }

  return `${formattedPressure.toFixed(unit === "inHg" ? 2 : 0)} ${unitLabel}`;
}

// Format date for display
export function formatDate(dateString: string, format: "short" | "medium" | "long" = "medium"): string {
  const date = new Date(dateString);
  
  if (format === "short") {
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } else if (format === "medium") {
    return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  } else {
    return date.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  }
}

// Format time for display
export function formatTime(dateString: string, showSeconds: boolean = false): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString(undefined, { 
    hour: "2-digit", 
    minute: "2-digit",
    second: showSeconds ? "2-digit" : undefined
  });
}

// Format precipitation as mm with optional timeframe
export function formatPrecipitation(amount: number, timeframe?: string): string {
  const formatted = `${amount.toFixed(1)} mm`;
  return timeframe ? `${formatted}/${timeframe}` : formatted;
}

// Format percentage with % sign
export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

// Format visibility in km/miles
export function formatVisibility(
  visibility: number,
  unit: "km" | "mi" = "km"
): string {
  let formattedVisibility = visibility;
  let unitLabel = "km";

  if (unit === "mi") {
    formattedVisibility = visibility * 0.621371;
    unitLabel = "mi";
  }

  return `${formattedVisibility.toFixed(1)} ${unitLabel}`;
}
