import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { TEMPERATURE_UNITS, WIND_SPEED_UNITS, PRESSURE_UNITS, MAP_STYLES } from '@/lib/constants';
import { LayerConfigModal } from '@/components/modals/LayerConfigModal';

export default function Settings() {
  const { theme, toggleTheme, setTheme } = useTheme();
  const [showLayerConfigModal, setShowLayerConfigModal] = useState(false);
  
  // User preferences state
  const [temperatureUnit, setTemperatureUnit] = useState<string>('celsius');
  const [windSpeedUnit, setWindSpeedUnit] = useState<string>('kmh');
  const [pressureUnit, setPressureUnit] = useState<string>('hPa');
  const [mapStyle, setMapStyle] = useState<string>('light');
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [refreshInterval, setRefreshInterval] = useState<number>(15);
  const [notifications, setNotifications] = useState<boolean>(true);
  const [emailAlerts, setEmailAlerts] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  
  // Saved locations
  const [savedLocations, setSavedLocations] = useState([
    { id: 1, name: 'New York', isFavorite: true },
    { id: 2, name: 'London', isFavorite: false },
    { id: 3, name: 'Tokyo', isFavorite: false },
  ]);
  
  const toggleFavorite = (id: number) => {
    setSavedLocations(prev => 
      prev.map(location => 
        location.id === id ? { ...location, isFavorite: !location.isFavorite } : location
      )
    );
  };
  
  const removeLocation = (id: number) => {
    setSavedLocations(prev => prev.filter(location => location.id !== id));
  };
  
  const savePreferences = () => {
    // In a real implementation, this would save preferences to the server
    console.log('Saving preferences:', {
      theme,
      temperatureUnit,
      windSpeedUnit,
      pressureUnit,
      mapStyle,
      autoRefresh,
      refreshInterval,
      notifications,
      emailAlerts,
      email,
      savedLocations,
    });
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Configuration"
          breadcrumbs={[{ path: '/', label: 'Dashboard' }, { path: '/settings', label: 'Configuration' }]}
        />
        
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Page Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Settings</h1>
              <Button onClick={savePreferences} className="mt-2 sm:mt-0">
                Save Preferences
              </Button>
            </div>
            
            <Tabs defaultValue="display">
              <TabsList className="grid w-full md:w-auto grid-cols-3">
                <TabsTrigger value="display">Display</TabsTrigger>
                <TabsTrigger value="units">Units</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
              </TabsList>
              
              {/* Display Settings */}
              <TabsContent value="display" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme Settings</CardTitle>
                    <CardDescription>
                      Customize the application appearance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="theme-toggle">Dark Theme</Label>
                        <p className="text-sm text-muted-foreground">
                          Toggle between light and dark mode
                        </p>
                      </div>
                      <Switch 
                        id="theme-toggle" 
                        checked={theme === 'dark'}
                        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Theme Selection</Label>
                      <RadioGroup defaultValue={theme} onValueChange={setTheme}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="light" id="light" />
                          <Label htmlFor="light">Light</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="dark" id="dark" />
                          <Label htmlFor="dark">Dark</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="system" id="system" />
                          <Label htmlFor="system">System Default</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Map Style</Label>
                      <Select value={mapStyle} onValueChange={setMapStyle}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select map style" />
                        </SelectTrigger>
                        <SelectContent>
                          {MAP_STYLES.map(style => (
                            <SelectItem key={style.value} value={style.value}>
                              {style.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowLayerConfigModal(true)}
                      >
                        Configure Map Layers
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Data Refresh Settings</CardTitle>
                    <CardDescription>
                      Configure how and when data is updated
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-refresh">Auto Refresh</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically refresh weather data
                        </p>
                      </div>
                      <Switch 
                        id="auto-refresh" 
                        checked={autoRefresh}
                        onCheckedChange={setAutoRefresh}
                      />
                    </div>
                    
                    {autoRefresh && (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Refresh Interval (minutes)</Label>
                          <span className="text-sm text-muted-foreground">{refreshInterval} min</span>
                        </div>
                        <Slider 
                          value={[refreshInterval]} 
                          min={5} 
                          max={60} 
                          step={5} 
                          onValueChange={(values) => setRefreshInterval(values[0])}
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Browser Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive alerts for severe weather
                        </p>
                      </div>
                      <Switch 
                        id="notifications" 
                        checked={notifications}
                        onCheckedChange={setNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-alerts">Email Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive daily weather summaries by email
                        </p>
                      </div>
                      <Switch 
                        id="email-alerts" 
                        checked={emailAlerts}
                        onCheckedChange={setEmailAlerts}
                      />
                    </div>
                    
                    {emailAlerts && (
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Units Settings */}
              <TabsContent value="units" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Measurement Units</CardTitle>
                    <CardDescription>
                      Set your preferred units for weather data
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Temperature Units</Label>
                      <Select value={temperatureUnit} onValueChange={setTemperatureUnit}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select temperature unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {TEMPERATURE_UNITS.map(unit => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Wind Speed Units</Label>
                      <Select value={windSpeedUnit} onValueChange={setWindSpeedUnit}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select wind speed unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {WIND_SPEED_UNITS.map(unit => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Pressure Units</Label>
                      <Select value={pressureUnit} onValueChange={setPressureUnit}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pressure unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {PRESSURE_UNITS.map(unit => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Data Display</CardTitle>
                    <CardDescription>
                      Configure how weather data is presented
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>24-Hour Time Format</Label>
                        <p className="text-sm text-muted-foreground">
                          Use 24-hour clock instead of AM/PM
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Precipitation as Chance</Label>
                        <p className="text-sm text-muted-foreground">
                          Display precipitation as percentage chance
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Locations Settings */}
              <TabsContent value="locations" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Locations</CardTitle>
                    <CardDescription>
                      Manage your saved locations and favorites
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savedLocations.map(location => (
                        <div 
                          key={location.id}
                          className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-md"
                        >
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => toggleFavorite(location.id)}
                              className="text-slate-400 hover:text-amber-500 dark:hover:text-amber-400"
                            >
                              <span className="material-icons">
                                {location.isFavorite ? 'star' : 'star_border'}
                              </span>
                            </button>
                            <span>{location.name}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <span className="material-icons">edit</span>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => removeLocation(location.id)}
                            >
                              <span className="material-icons text-red-500">delete</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      {savedLocations.length === 0 && (
                        <div className="text-center py-6 text-muted-foreground">
                          No saved locations yet. Search for a location to save it.
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <Label>Add New Location</Label>
                      <div className="flex space-x-2">
                        <Input placeholder="Enter city name" />
                        <Button>Add</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Default Location</CardTitle>
                    <CardDescription>
                      Set your primary location for weather data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select defaultValue="1">
                      <SelectTrigger>
                        <SelectValue placeholder="Select default location" />
                      </SelectTrigger>
                      <SelectContent>
                        {savedLocations.map(location => (
                          <SelectItem key={location.id} value={location.id.toString()}>
                            {location.name} {location.isFavorite && '⭐'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Use Location Services</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically detect your location
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      
      <LayerConfigModal 
        open={showLayerConfigModal} 
        onClose={() => setShowLayerConfigModal(false)} 
      />
    </div>
  );
}
