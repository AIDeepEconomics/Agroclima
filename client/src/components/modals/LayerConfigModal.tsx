import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useMapLayers } from '@/hooks/use-map-layers';
import { MapLayer } from '@/lib/types';

interface LayerConfigModalProps {
  open: boolean;
  onClose: () => void;
}

export function LayerConfigModal({ open, onClose }: LayerConfigModalProps) {
  const { layers, toggleLayerVisibility, updateLayerOpacity, resetLayers } = useMapLayers();
  const [presets, setPresets] = useState<{ name: string, layers: Record<string, MapLayer> }[]>([
    { name: 'Default', layers: JSON.parse(JSON.stringify(layers)) },
  ]);
  const [selectedPreset, setSelectedPreset] = useState('Default');

  const handleSavePreset = () => {
    // Check if we're updating an existing preset
    const existingIndex = presets.findIndex(p => p.name === selectedPreset);
    
    if (existingIndex >= 0) {
      const updatedPresets = [...presets];
      updatedPresets[existingIndex] = { name: selectedPreset, layers: JSON.parse(JSON.stringify(layers)) };
      setPresets(updatedPresets);
    } else {
      // Create a new preset
      const newPresetName = `Preset ${presets.length + 1}`;
      setPresets([...presets, { name: newPresetName, layers: JSON.parse(JSON.stringify(layers)) }]);
      setSelectedPreset(newPresetName);
    }
  };

  const handleLoadPreset = (presetName: string) => {
    const preset = presets.find(p => p.name === presetName);
    if (preset) {
      // In a real implementation, this would update the layers in the map
      // For this example, we just log the operation
      console.log('Loading preset:', preset.name);
      setSelectedPreset(preset.name);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Layer Configuration</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="layers">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="layers">Layer Settings</TabsTrigger>
            <TabsTrigger value="presets">Presets</TabsTrigger>
          </TabsList>
          
          <TabsContent value="layers" className="space-y-4 mt-4">
            {Object.values(layers).map((layer) => (
              <div key={layer.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: layer.color }}
                    ></div>
                    <Label htmlFor={`layer-${layer.id}`}>{layer.name}</Label>
                  </div>
                  <Switch 
                    id={`layer-${layer.id}`} 
                    checked={layer.isVisible}
                    onCheckedChange={() => toggleLayerVisibility(layer.id)}
                  />
                </div>
                {layer.isVisible && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">Opacity:</span>
                    <Slider
                      value={[layer.opacity]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => updateLayerOpacity(layer.id, value[0])}
                      className="flex-1"
                    />
                    <span className="text-sm w-8">{layer.opacity}%</span>
                  </div>
                )}
              </div>
            ))}
            
            <div className="pt-2">
              <Button variant="outline" size="sm" onClick={resetLayers}>
                Reset to Default
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="presets" className="space-y-4 mt-4">
            <div className="grid gap-2">
              <Label>Saved Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <Button 
                    key={preset.name}
                    variant={selectedPreset === preset.name ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleLoadPreset(preset.name)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="pt-2 flex justify-between">
              <Button variant="outline" size="sm" onClick={handleSavePreset}>
                Save Current as Preset
              </Button>
              <Button 
                variant="destructive" 
                size="sm" 
                disabled={presets.length <= 1 || selectedPreset === 'Default'}
                onClick={() => {
                  setPresets(presets.filter(p => p.name !== selectedPreset));
                  setSelectedPreset('Default');
                }}
              >
                Delete Preset
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button onClick={onClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
