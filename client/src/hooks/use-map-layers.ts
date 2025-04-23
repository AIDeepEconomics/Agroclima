import { useState, useCallback } from 'react';
import { MapLayer } from '@/lib/types';
import { DEFAULT_MAP_LAYERS } from '@/lib/constants';

export function useMapLayers() {
  const [layers, setLayers] = useState<Record<string, MapLayer>>(() => {
    return JSON.parse(JSON.stringify(DEFAULT_MAP_LAYERS));
  });

  const toggleLayerVisibility = useCallback((layerId: string) => {
    setLayers(prev => {
      if (!prev[layerId]) return prev;
      
      return {
        ...prev,
        [layerId]: {
          ...prev[layerId],
          isVisible: !prev[layerId].isVisible,
        },
      };
    });
  }, []);

  const updateLayerOpacity = useCallback((layerId: string, opacity: number) => {
    setLayers(prev => {
      if (!prev[layerId]) return prev;
      
      return {
        ...prev,
        [layerId]: {
          ...prev[layerId],
          opacity: Math.max(0, Math.min(100, opacity)),
        },
      };
    });
  }, []);

  const getVisibleLayers = useCallback(() => {
    return Object.values(layers).filter(layer => layer.isVisible);
  }, [layers]);

  const resetLayers = useCallback(() => {
    setLayers(JSON.parse(JSON.stringify(DEFAULT_MAP_LAYERS)));
  }, []);

  return {
    layers,
    toggleLayerVisibility,
    updateLayerOpacity,
    getVisibleLayers,
    resetLayers,
  };
}
