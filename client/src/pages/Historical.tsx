import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import HistoricalChart from '@/components/ui/HistoricalChart';
import { ExportModal } from '@/components/modals/ExportModal';
import { useWeatherData } from '@/hooks/use-weather-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DateRange } from '@/lib/types';
import { CHART_TYPES, DATE_RANGES } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatDate, formatTemperature, formatPercentage } from '@/lib/utils/formatters';

export default function Historical() {
  const { weatherData, currentLocation } = useWeatherData();
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState('temperature');
  const [selectedDateRange, setSelectedDateRange] = useState('7d');
  const [customDateRange, setCustomDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    endDate: new Date(),
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleExport = (format: string, dateRange: DateRange) => {
    console.log('Exporting data:', { format, dateRange });
    // In a real implementation, this would trigger an API call to export the data
  };
  
  const filteredHistoricalData = weatherData.historical.filter(item => {
    if (!searchQuery) return true;
    const date = formatDate(item.date, 'long').toLowerCase();
    return date.includes(searchQuery.toLowerCase());
  });
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Historical Analysis"
          breadcrumbs={[{ path: '/', label: 'Dashboard' }, { path: '/historical', label: 'Historical Analysis' }]}
        />
        
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Page Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Historical Weather Analysis</h1>
              <div className="mt-2 sm:mt-0 flex space-x-2">
                <Button 
                  size="sm"
                  onClick={() => setShowExportModal(true)}
                  className="inline-flex items-center"
                >
                  <span className="material-icons text-sm mr-2">file_download</span>
                  Export Data
                </Button>
              </div>
            </div>
            
            {/* Date Range Selector */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Date Range Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                  <div className="grid w-full sm:max-w-sm items-center gap-1.5">
                    <Select 
                      value={selectedDateRange} 
                      onValueChange={setSelectedDateRange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select date range" />
                      </SelectTrigger>
                      <SelectContent>
                        {DATE_RANGES.map(range => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedDateRange === 'custom' && (
                    <div className="flex flex-col sm:flex-row gap-2 w-full">
                      <div className="grid gap-1.5 flex-1">
                        <label htmlFor="start-date" className="text-sm font-medium">
                          Start Date
                        </label>
                        <Input
                          id="start-date"
                          type="date"
                          value={customDateRange.startDate.toISOString().split('T')[0]}
                          onChange={(e) => setCustomDateRange({ 
                            ...customDateRange, 
                            startDate: new Date(e.target.value) 
                          })}
                        />
                      </div>
                      <div className="grid gap-1.5 flex-1">
                        <label htmlFor="end-date" className="text-sm font-medium">
                          End Date
                        </label>
                        <Input
                          id="end-date"
                          type="date"
                          value={customDateRange.endDate.toISOString().split('T')[0]}
                          onChange={(e) => setCustomDateRange({ 
                            ...customDateRange, 
                            endDate: new Date(e.target.value) 
                          })}
                        />
                      </div>
                    </div>
                  )}
                  
                  <Button className="sm:self-end" size="sm">
                    Apply Range
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Charts and Data Display */}
            <Tabs defaultValue="charts">
              <TabsList className="grid w-full md:w-auto grid-cols-2">
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="table">Data Table</TabsTrigger>
              </TabsList>
              
              <TabsContent value="charts" className="space-y-6 mt-6">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h2 className="text-lg font-medium text-slate-900 dark:text-white">Weather Metrics</h2>
                    <div className="mt-2 sm:mt-0 flex space-x-2">
                      <Select 
                        value={selectedChartType} 
                        onValueChange={setSelectedChartType}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select chart type" />
                        </SelectTrigger>
                        <SelectContent>
                          {CHART_TYPES.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="h-80">
                    <HistoricalChart 
                      data={weatherData.historical}
                      type={selectedChartType}
                      height={300}
                    />
                  </div>
                  
                  <div className="flex justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400">
                    <div>
                      <span className="font-medium">Location:</span> {currentLocation.name}
                    </div>
                    <div>
                      <span className="font-medium">Data points:</span> {weatherData.historical.length}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
                    <h3 className="text-md font-medium text-slate-900 dark:text-white mb-4">Temperature Trend</h3>
                    <div className="h-64">
                      <HistoricalChart 
                        data={weatherData.historical}
                        type="temperature"
                        height={240}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
                    <h3 className="text-md font-medium text-slate-900 dark:text-white mb-4">Precipitation History</h3>
                    <div className="h-64">
                      <HistoricalChart 
                        data={weatherData.historical}
                        type="precipitation"
                        height={240}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
                  <h3 className="text-md font-medium text-slate-900 dark:text-white mb-4">Statistical Summary</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Average Temperature</div>
                      <div className="text-2xl font-semibold mt-1 text-slate-900 dark:text-white">
                        {formatTemperature(
                          weatherData.historical.reduce((sum, item) => sum + item.temp, 0) / 
                          weatherData.historical.length
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Max Temperature</div>
                      <div className="text-2xl font-semibold mt-1 text-slate-900 dark:text-white">
                        {formatTemperature(
                          Math.max(...weatherData.historical.map(item => item.temp))
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Min Temperature</div>
                      <div className="text-2xl font-semibold mt-1 text-slate-900 dark:text-white">
                        {formatTemperature(
                          Math.min(...weatherData.historical.map(item => item.temp))
                        )}
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                      <div className="text-sm text-slate-500 dark:text-slate-400">Total Precipitation</div>
                      <div className="text-2xl font-semibold mt-1 text-slate-900 dark:text-white">
                        {weatherData.historical.reduce((sum, item) => sum + item.precipitation, 0).toFixed(1)} mm
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="table" className="space-y-6 mt-6">
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h2 className="text-lg font-medium text-slate-900 dark:text-white">Historical Data</h2>
                    <div className="mt-2 sm:mt-0">
                      <Input
                        placeholder="Search by date..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-64"
                      />
                    </div>
                  </div>
                  
                  <div className="rounded-md border border-slate-200 dark:border-slate-700">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[150px]">Date</TableHead>
                          <TableHead>Temperature</TableHead>
                          <TableHead>Humidity</TableHead>
                          <TableHead>Precipitation</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHistoricalData.map(item => (
                          <TableRow key={item.date}>
                            <TableCell>{formatDate(item.date, 'medium')}</TableCell>
                            <TableCell>{formatTemperature(item.temp)}</TableCell>
                            <TableCell>{formatPercentage(item.humidity)}</TableCell>
                            <TableCell>{item.precipitation} mm</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <span className="material-icons text-sm">visibility</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredHistoricalData.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                              No data found for your search criteria
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="flex justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-sm">
                    <div className="text-slate-500 dark:text-slate-400">
                      Showing {filteredHistoricalData.length} of {weatherData.historical.length} records
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowExportModal(true)}
                      className="inline-flex items-center"
                    >
                      <span className="material-icons text-sm mr-1">file_download</span>
                      Export
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
