import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
  currentSection?: string;
}

export function HelpModal({ open, onClose, currentSection = 'dashboard' }: HelpModalProps) {
  const [activeTab, setActiveTab] = useState(currentSection);

  const helpContent = {
    dashboard: {
      title: 'Dashboard Help',
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Weather Map</h3>
            <p className="text-sm text-muted-foreground">
              The interactive weather map displays current weather conditions. You can:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mt-2 space-y-1">
              <li>Click on any location to see detailed weather information</li>
              <li>Toggle different layers using the layer controls</li>
              <li>Adjust the timeline to see weather changes throughout the day</li>
              <li>Zoom in/out using the controls or mouse scroll</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Layer Controls</h3>
            <p className="text-sm text-muted-foreground">
              Use the layer controls panel to customize what data is displayed on the map:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mt-2 space-y-1">
              <li>Toggle layers on/off by clicking the visibility icon</li>
              <li>Adjust layer opacity using the sliders</li>
              <li>Add new layers from the available options</li>
            </ul>
          </div>
        </div>
      ),
    },
    historical: {
      title: 'Historical Analysis Help',
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Historical Charts</h3>
            <p className="text-sm text-muted-foreground">
              The historical analysis page allows you to view past weather data:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mt-2 space-y-1">
              <li>Select different metrics (temperature, precipitation, etc.) from the dropdown</li>
              <li>Change the date range to view different periods</li>
              <li>Export data for further analysis</li>
              <li>Hover over chart points to see detailed information</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Data Table</h3>
            <p className="text-sm text-muted-foreground">
              The data table shows detailed historical records:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mt-2 space-y-1">
              <li>Sort columns by clicking the column headers</li>
              <li>Filter data using the search box</li>
              <li>Export filtered data to CSV or other formats</li>
            </ul>
          </div>
        </div>
      ),
    },
    forecast: {
      title: 'Forecast Help',
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Forecast View</h3>
            <p className="text-sm text-muted-foreground">
              The forecast page shows predicted weather conditions:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mt-2 space-y-1">
              <li>View daily or hourly forecasts</li>
              <li>Check detailed conditions for each time period</li>
              <li>See precipitation chances and amounts</li>
              <li>Toggle between different forecast models</li>
            </ul>
          </div>
        </div>
      ),
    },
    settings: {
      title: 'Settings Help',
      content: (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">User Preferences</h3>
            <p className="text-sm text-muted-foreground">
              Customize the application to your needs:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground ml-4 mt-2 space-y-1">
              <li>Toggle between light and dark themes</li>
              <li>Set your preferred units (°C/°F, km/h/mph)</li>
              <li>Manage your saved locations</li>
              <li>Configure data display preferences</li>
            </ul>
          </div>
        </div>
      ),
    },
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{helpContent[activeTab as keyof typeof helpContent]?.title || 'Help Center'}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={currentSection} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="historical">Historical</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="pt-4">
            {helpContent.dashboard.content}
          </TabsContent>
          
          <TabsContent value="historical" className="pt-4">
            {helpContent.historical.content}
          </TabsContent>
          
          <TabsContent value="forecast" className="pt-4">
            {helpContent.forecast.content}
          </TabsContent>
          
          <TabsContent value="settings" className="pt-4">
            {helpContent.settings.content}
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
