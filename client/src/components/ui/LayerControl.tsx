import React from 'react';
import { useMapLayers } from '@/hooks/use-map-layers';
import { MapLayer } from '@/lib/types';

export function LayerControl() {
  const { layers, toggleLayerVisibility, updateLayerOpacity } = useMapLayers();
  
  const handleOpacityChange = (layerId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    updateLayerOpacity(layerId, Number(e.target.value));
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4 h-full">
      <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">Layer Controls</h2>
      
      {/* Active Layers Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">Active Layers</h3>
        
        {Object.values(layers)
          .filter(layer => layer.isVisible)
          .map((layer) => (
            <div key={layer.id} className="flex items-center justify-between mb-3 p-2 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center">
                <span 
                  className="w-2 h-2 rounded-full mr-2" 
                  style={{ backgroundColor: layer.color }}
                ></span>
                <span className="text-sm text-slate-700 dark:text-slate-300">{layer.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative w-16">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={layer.opacity} 
                    onChange={(e) => handleOpacityChange(layer.id, e)}
                    className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                  />
                </div>
                <button 
                  className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700"
                  onClick={() => toggleLayerVisibility(layer.id)}
                >
                  <span className="material-icons text-sm">visibility</span>
                </button>
              </div>
            </div>
          ))}
      </div>
      
      {/* Add Layer Section */}
      <div>
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">Add Layers</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(layers)
            .filter(layer => !layer.isVisible)
            .map((layer) => (
              <button 
                key={layer.id}
                className="flex items-center justify-center space-x-2 p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700"
                onClick={() => toggleLayerVisibility(layer.id)}
              >
                <span className="material-icons text-sm" style={{ color: layer.color }}>
                  {layer.id === 'temperature' ? 'device_thermostat' : 
                   layer.id === 'wind' ? 'air' : 
                   layer.id === 'precipitation' ? 'water_drop' : 
                   layer.id === 'clouds' ? 'cloud' : 
                   layer.id === 'pressure' ? 'compress' : 
                   layer.id === 'visibility' ? 'visibility' : 
                   layer.id === 'uvIndex' ? 'wb_sunny' : 'layers'}
                </span>
                <span className="text-sm text-slate-700 dark:text-slate-300">{layer.name}</span>
              </button>
            ))}
        </div>
      </div>
      
      {/* Location Control */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">Location</h3>
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            defaultValue="New York, NY" 
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
          />
          <button className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
            <span className="material-icons">my_location</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LayerControl;
