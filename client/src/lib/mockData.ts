import { WeatherData } from "./types";

export const weatherData: WeatherData = {
  current: {
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    windDirection: 230,
    precipitation: 0,
    pressure: 1015,
    visibility: 10,
    uvIndex: 4
  },
  forecast: [
    { day: 'Mon', date: '2023-06-01', temp: 24, tempMin: 18, icon: 'wb_sunny', precipitation: 10, condition: 'Sunny' },
    { day: 'Tue', date: '2023-06-02', temp: 23, tempMin: 17, icon: 'wb_cloudy', precipitation: 20, condition: 'Partly Cloudy' },
    { day: 'Wed', date: '2023-06-03', temp: 21, tempMin: 16, icon: 'cloud', precipitation: 60, condition: 'Cloudy' },
    { day: 'Thu', date: '2023-06-04', temp: 19, tempMin: 14, icon: 'water_drop', precipitation: 80, condition: 'Rain' },
    { day: 'Fri', date: '2023-06-05', temp: 20, tempMin: 15, icon: 'cloud', precipitation: 40, condition: 'Cloudy' },
    { day: 'Sat', date: '2023-06-06', temp: 22, tempMin: 16, icon: 'wb_cloudy', precipitation: 20, condition: 'Partly Cloudy' },
    { day: 'Sun', date: '2023-06-07', temp: 25, tempMin: 17, icon: 'wb_sunny', precipitation: 0, condition: 'Sunny' }
  ],
  historical: [
    { date: '2023-06-01', temp: 22, humidity: 60, precipitation: 0 },
    { date: '2023-06-02', temp: 23, humidity: 61, precipitation: 0 },
    { date: '2023-06-03', temp: 22, humidity: 63, precipitation: 10 },
    { date: '2023-06-04', temp: 21, humidity: 70, precipitation: 25 },
    { date: '2023-06-05', temp: 19, humidity: 75, precipitation: 30 },
    { date: '2023-06-06', temp: 20, humidity: 68, precipitation: 5 },
    { date: '2023-06-07', temp: 22, humidity: 65, precipitation: 0 },
  ]
};
