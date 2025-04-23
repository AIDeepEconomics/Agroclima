import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import WeatherCard from '@/components/ui/WeatherCard';
import MapContainer from '@/components/ui/MapContainer';
import LayerControl from '@/components/ui/LayerControl';
import ForecastItem from '@/components/ui/ForecastItem';
import HistoricalChart from '@/components/ui/HistoricalChart';
import { ExportModal } from '@/components/modals/ExportModal';
import { useWeatherData } from '@/hooks/use-weather-data';
import { formatTemperature, formatPercentage } from '@/lib/utils/formatters';
import { Button } from '@/components/ui/button';
import { DateRange } from '@/lib/types';

export default function Dashboard() {
  const { weatherData, currentLocation, refreshData } = useWeatherData();
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState('temperature');
  
  const handleExport = (format: string, dateRange: DateRange) => {
    console.log('Exporting data:', { format, dateRange });
    // In a real implementation, this would trigger an API call to export the data
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Weather Dashboard"
          breadcrumbs={[{ path: '/', label: 'Dashboard' }]}
        />
        
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Page Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Weather Dashboard</h1>
              <div className="mt-2 sm:mt-0 flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={refreshData}
                  className="inline-flex items-center"
                >
                  <span className="material-icons text-sm mr-2">refresh</span>
                  Refresh Data
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setShowExportModal(true)}
                  className="inline-flex items-center"
                >
                  <span className="material-icons text-sm mr-2">file_download</span>
                  Export
                </Button>
              </div>
            </div>
            
            {/* Weather Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <WeatherCard 
                title="Temperature"
                value={formatTemperature(weatherData.current.temperature)}
                change={{ value: 2, direction: 'up' }}
                icon="device_thermostat"
                iconColor="red"
                min={18}
                max={28}
                current={weatherData.current.temperature}
                gradientColors={{ from: 'from-blue-500', to: 'to-red-500' }}
              />
              
              <WeatherCard 
                title="Humidity"
                value={formatPercentage(weatherData.current.humidity)}
                change={{ value: 3, direction: 'down' }}
                icon="water_drop"
                iconColor="blue"
                min={0}
                max={100}
                current={weatherData.current.humidity}
                gradientColors={{ from: 'from-slate-300', to: 'to-blue-500' }}
                minLabel="Dry"
                maxLabel="Humid"
              />
              
              <WeatherCard 
                title="Wind"
                value={`${weatherData.current.windSpeed} km/h`}
                unit="SW"
                icon="air"
                iconColor="teal"
                min={0}
                max={30}
                current={weatherData.current.windSpeed}
                gradientColors={{ from: 'from-green-500', to: 'to-teal-500' }}
                minLabel="Calm"
                maxLabel="Strong"
              />
              
              <WeatherCard 
                title="Precipitation"
                value={`${weatherData.current.precipitation} mm`}
                change={{ value: 5, direction: 'down' }}
                icon="water_drop"
                iconColor="indigo"
                min={0}
                max={25}
                current={weatherData.current.precipitation}
                gradientColors={{ from: 'from-indigo-300', to: 'to-indigo-500' }}
                minLabel="0mm"
                maxLabel="25mm"
              />
            </div>
            
            {/* Map and Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Map Area */}
              <div className="lg:col-span-8">
                <MapContainer location={currentLocation.name} />
              </div>
              
              {/* Control Panel */}
              <div className="lg:col-span-4">
                <LayerControl />
              </div>
            </div>
            
            {/* Forecast & Historical Data */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weather Forecast */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-slate-900 dark:text-white">7-Day Forecast</h2>
                  <Button variant="link" size="sm">View Detailed Forecast</Button>
                </div>
                <div className="space-y-4">
                  {weatherData.forecast.slice(0, 3).map((day) => (
                    <ForecastItem key={day.date} forecast={day} />
                  ))}
                  
                  <Button variant="link" className="w-full py-2">
                    View Extended Forecast
                  </Button>
                </div>
              </div>
              
              {/* Historical Data Chart */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium text-slate-900 dark:text-white">Historical Trends</h2>
                  <div className="flex space-x-2">
                    <select 
                      className="text-sm border border-slate-300 rounded-md px-2 py-1 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                      value={selectedChartType}
                      onChange={(e) => setSelectedChartType(e.target.value)}
                    >
                      <option value="temperature">Temperature</option>
                      <option value="precipitation">Precipitation</option>
                      <option value="humidity">Humidity</option>
                      <option value="windSpeed">Wind Speed</option>
                    </select>
                    <Button variant="link" size="sm">
                      View Analysis
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Charts Container */}
                  <div className="grid grid-cols-1 gap-4">
                    <HistoricalChart 
                      data={weatherData.historical}
                      type={selectedChartType}
                      height={240}
                    />
                  </div>
                  
                  {/* Date Range Controls */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-500 dark:text-slate-400">Date Range:</span>
                      <select className="text-sm border border-slate-300 rounded-md px-2 py-1 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Last 90 Days</option>
                        <option>Custom Range</option>
                      </select>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowExportModal(true)}
                      className="inline-flex items-center"
                    >
                      <span className="material-icons text-sm mr-1">file_download</span>
                      Export Data
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {showExportModal && (
        <ExportModal 
          open={showExportModal} 
          onClose={() => setShowExportModal(false)} 
          onExport={handleExport}
        />
      )}
    </div>
  );
}
