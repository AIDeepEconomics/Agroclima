import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import ForecastItem from '@/components/ui/ForecastItem';
import { useWeatherData } from '@/hooks/use-weather-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEFAULT_LOCATION } from '@/lib/constants';
import { formatDate, formatTemperature, formatWindSpeed } from '@/lib/utils/formatters';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Forecast() {
  const { weatherData, currentLocation, setCurrentLocation } = useWeatherData();
  const [viewMode, setViewMode] = useState('daily');
  const [locationInput, setLocationInput] = useState(currentLocation.name);
  
  const handleLocationSearch = () => {
    // In a real implementation, this would search for the location
    // and update the current location
    console.log('Searching for location:', locationInput);
    
    // For demo purposes, just update with the default location
    setCurrentLocation(DEFAULT_LOCATION);
  };
  
  // Process temperature data for the trend chart
  const temperatureTrend = weatherData.forecast.map(day => ({
    date: day.date,
    temperature: day.temp,
    temperatureMin: day.tempMin,
  }));
  
  // Generate hourly forecast data (mocked for this example)
  const generateHourlyForecast = () => {
    const hours = [];
    const today = new Date();
    
    for (let i = 0; i < 24; i++) {
      const time = new Date(today);
      time.setHours(today.getHours() + i);
      
      // Simple pattern to simulate temperature changes throughout the day
      const baseTemp = 22; // Base temperature
      const hourOfDay = time.getHours();
      let hourlyTemp;
      
      if (hourOfDay >= 6 && hourOfDay <= 14) {
        // Morning to afternoon: rising temperature
        hourlyTemp = baseTemp + (hourOfDay - 6);
      } else if (hourOfDay > 14 && hourOfDay <= 20) {
        // Afternoon to evening: falling temperature
        hourlyTemp = baseTemp + 8 - (hourOfDay - 14);
      } else {
        // Night: cooler temperature
        hourlyTemp = hourOfDay < 6 ? baseTemp - 5 + (hourOfDay / 2) : baseTemp - (hourOfDay - 20);
      }
      
      // Add some random variation
      hourlyTemp += (Math.random() - 0.5) * 2;
      
      // Convert icon based on time
      let icon = 'wb_sunny';
      if (hourOfDay < 7 || hourOfDay > 19) {
        icon = 'nightlight';
      } else if (hourOfDay >= 16) {
        icon = 'wb_twilight';
      } else if (Math.random() > 0.7) {
        icon = 'wb_cloudy';
      }
      
      hours.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temp: Math.round(hourlyTemp * 10) / 10,
        icon,
        precipitation: Math.round(Math.random() * 30),
      });
    }
    
    return hours;
  };
  
  const hourlyForecast = generateHourlyForecast();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Weather Forecast"
          breadcrumbs={[{ path: '/', label: 'Dashboard' }, { path: '/forecast', label: 'Forecast' }]}
        />
        
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Page Title and Location Selector */}
            <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Weather Forecast</h1>
              
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter location..."
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  className="w-full sm:w-64"
                />
                <Button onClick={handleLocationSearch}>
                  <span className="material-icons text-sm mr-2">search</span>
                  Search
                </Button>
              </div>
            </div>
            
            {/* Current Location Card */}
            <Card className="bg-gradient-to-r from-primary-600 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{currentLocation.name}</h2>
                    <p className="text-white/80">
                      {formatDate(new Date().toISOString(), 'long')}
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex items-center">
                    <span className="material-icons text-5xl">
                      {weatherData.forecast[0].icon}
                    </span>
                    <div className="ml-4">
                      <div className="text-4xl font-semibold">
                        {formatTemperature(weatherData.current.temperature)}
                      </div>
                      <div className="text-white/80">
                        {weatherData.forecast[0].condition}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Current weather details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="text-white/80 text-sm">Humidity</div>
                    <div className="text-lg font-semibold">{weatherData.current.humidity}%</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="text-white/80 text-sm">Wind</div>
                    <div className="text-lg font-semibold">{formatWindSpeed(weatherData.current.windSpeed)}</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="text-white/80 text-sm">Precipitation</div>
                    <div className="text-lg font-semibold">{weatherData.current.precipitation} mm</div>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <div className="text-white/80 text-sm">Pressure</div>
                    <div className="text-lg font-semibold">{weatherData.current.pressure} hPa</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Forecast View Tabs */}
            <Tabs defaultValue="daily" value={viewMode} onValueChange={setViewMode}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="daily">Daily Forecast</TabsTrigger>
                  <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
                </TabsList>
                
                <Select defaultValue="celsius">
                  <SelectTrigger className="w-[140px] mt-2 sm:mt-0">
                    <SelectValue placeholder="Units" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celsius">Celsius (°C)</SelectItem>
                    <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Daily Forecast */}
              <TabsContent value="daily">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-5">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>7-Day Forecast</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          {weatherData.forecast.map(day => (
                            <ForecastItem key={day.date} forecast={day} />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="md:col-span-7">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Temperature Trend</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={temperatureTrend}
                              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                              <XAxis 
                                dataKey="date" 
                                tickFormatter={(value) => formatDate(value, 'short')}
                                className="text-slate-500 dark:text-slate-400"
                              />
                              <YAxis 
                                tickFormatter={(value) => `${value}°`}
                                className="text-slate-500 dark:text-slate-400"
                              />
                              <Tooltip 
                                formatter={(value) => [`${value}°C`, 'Temperature']}
                                labelFormatter={(label) => formatDate(label, 'medium')}
                                contentStyle={{ 
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                                  borderColor: 'rgba(226, 232, 240, 1)',
                                  borderRadius: '0.375rem'
                                }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="temperature" 
                                stroke="#ef4444" 
                                strokeWidth={2}
                                name="Max Temp"
                                dot={{ stroke: '#ef4444', strokeWidth: 2, r: 4, fill: 'white' }}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="temperatureMin" 
                                stroke="#3b82f6" 
                                strokeWidth={2}
                                name="Min Temp"
                                dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: 'white' }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              {/* Hourly Forecast */}
              <TabsContent value="hourly">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>24-Hour Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto pb-2">
                      <div className="flex space-x-4 min-w-max">
                        {hourlyForecast.map((hour, index) => (
                          <div 
                            key={index} 
                            className={`flex flex-col items-center p-4 rounded-lg ${
                              index === 0 ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800' : ''
                            }`}
                          >
                            <div className="text-sm font-medium text-slate-500 dark:text-slate-400">
                              {hour.time}
                            </div>
                            <span className="material-icons text-amber-500 dark:text-amber-400 my-2">
                              {hour.icon}
                            </span>
                            <div className="text-lg font-semibold text-slate-900 dark:text-white">
                              {hour.temp}°
                            </div>
                            <div className="flex items-center mt-1 text-xs text-slate-500 dark:text-slate-400">
                              <span className="material-icons text-blue-500 dark:text-blue-400 text-xs mr-1">
                                water_drop
                              </span>
                              {hour.precipitation}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Precipitation Chance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={hourlyForecast.slice(0, 12)}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                            <XAxis 
                              dataKey="time" 
                              className="text-slate-500 dark:text-slate-400"
                            />
                            <YAxis 
                              tickFormatter={(value) => `${value}%`}
                              className="text-slate-500 dark:text-slate-400"
                            />
                            <Tooltip 
                              formatter={(value) => [`${value}%`, 'Chance of Rain']}
                              contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                                borderColor: 'rgba(226, 232, 240, 1)',
                                borderRadius: '0.375rem' 
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="precipitation" 
                              stroke="#3b82f6" 
                              fill="#3b82f6"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Temperature Variation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={hourlyForecast.slice(0, 12)}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                            <XAxis 
                              dataKey="time" 
                              className="text-slate-500 dark:text-slate-400"
                            />
                            <YAxis 
                              tickFormatter={(value) => `${value}°`}
                              className="text-slate-500 dark:text-slate-400"
                            />
                            <Tooltip 
                              formatter={(value) => [`${value}°C`, 'Temperature']}
                              contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                                borderColor: 'rgba(226, 232, 240, 1)',
                                borderRadius: '0.375rem'
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="temp" 
                              stroke="#ef4444" 
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Additional Forecast Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <span className="material-icons text-xl mr-2 text-blue-500">air</span>
                    Wind Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weatherData.forecast.slice(0, 3).map((day, index) => (
                      <div key={index} className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
                        <div className="text-sm font-medium">{day.day}</div>
                        <div className="flex items-center">
                          <span className="material-icons text-slate-400 transform rotate-45">navigation</span>
                          <span className="ml-2">{5 + Math.round(Math.random() * 15)} km/h</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <span className="material-icons text-xl mr-2 text-amber-500">water_drop</span>
                    Humidity Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weatherData.forecast.slice(0, 3).map((day, index) => (
                      <div key={index} className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
                        <div className="text-sm font-medium">{day.day}</div>
                        <div className="flex items-center">
                          <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${55 + Math.round(Math.random() * 30)}%` }}
                            ></div>
                          </div>
                          <span>{55 + Math.round(Math.random() * 30)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <span className="material-icons text-xl mr-2 text-red-500">wb_sunny</span>
                    UV Index
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weatherData.forecast.slice(0, 3).map((day, index) => {
                      const uvIndex = 1 + Math.round(Math.random() * 8);
                      let uvLevel = 'Low';
                      let uvColor = 'text-green-500';
                      
                      if (uvIndex > 5) {
                        uvLevel = 'High';
                        uvColor = 'text-red-500';
                      } else if (uvIndex > 2) {
                        uvLevel = 'Moderate';
                        uvColor = 'text-amber-500';
                      }
                      
                      return (
                        <div key={index} className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-700">
                          <div className="text-sm font-medium">{day.day}</div>
                          <div className="flex items-center">
                            <span className={`mr-2 ${uvColor} font-medium`}>{uvLevel}</span>
                            <span>{uvIndex}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
