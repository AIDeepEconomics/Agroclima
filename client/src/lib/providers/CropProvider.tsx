import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { Crop, CropStage, CropType, AgriculturalRisk } from '../types';
import { crops, soybeanStages, agriculturalRisks } from '../mockData/agricultural';

// Context types
interface CropContextType {
  availableCrops: Crop[];
  selectedCrop: Crop | null;
  cropStages: CropStage[];
  criticalStages: CropStage[];
  currentStage: CropStage | null;
  cropRisks: AgriculturalRisk[];
  selectCrop: (cropId: number) => void;
  selectStage: (stageId: number) => void;
}

// Create context
const CropContext = createContext<CropContextType | undefined>(undefined);

// Provider props
interface CropProviderProps {
  children: ReactNode;
}

// Provider component
export function CropProvider({ children }: CropProviderProps) {
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
  const [selectedStageId, setSelectedStageId] = useState<number | null>(null);
  
  // Available crops
  const availableCrops = useMemo(() => crops, []);
  
  // Selected crop
  const selectedCrop = useMemo(() => {
    if (!selectedCropId) return null;
    return availableCrops.find(c => c.id === selectedCropId) || null;
  }, [availableCrops, selectedCropId]);
  
  // Crop stages based on selected crop
  const cropStages = useMemo(() => {
    if (!selectedCrop) return [];
    
    // Currently only have soybean stages in mock data
    if (selectedCrop.type === 'soybean') {
      return soybeanStages;
    }
    
    // For other crops, return empty array for now
    return [];
  }, [selectedCrop]);
  
  // Critical stages
  const criticalStages = useMemo(() => {
    return cropStages.filter(stage => stage.isCritical);
  }, [cropStages]);
  
  // Current stage
  const currentStage = useMemo(() => {
    if (!selectedStageId) {
      // If no stage is selected, find a default "current" stage
      // For demo purposes, select a critical stage in the middle
      const criticalStage = criticalStages[1] || null;
      if (criticalStage) {
        setSelectedStageId(criticalStage.id);
        return criticalStage;
      }
      return null;
    }
    
    return cropStages.find(s => s.id === selectedStageId) || null;
  }, [cropStages, criticalStages, selectedStageId]);
  
  // Crop risks
  const cropRisks = useMemo(() => {
    if (!selectedCrop) return [];
    
    return agriculturalRisks.filter(risk => risk.cropId === selectedCrop.id);
  }, [selectedCrop]);
  
  // Select crop function
  const selectCrop = (cropId: number) => {
    setSelectedCropId(cropId);
    // Reset selected stage when changing crops
    setSelectedStageId(null);
  };
  
  // Select stage function
  const selectStage = (stageId: number) => {
    setSelectedStageId(stageId);
  };
  
  // Context value
  const value = {
    availableCrops,
    selectedCrop,
    cropStages,
    criticalStages,
    currentStage,
    cropRisks,
    selectCrop,
    selectStage
  };
  
  return (
    <CropContext.Provider value={value}>
      {children}
    </CropContext.Provider>
  );
}

// Hook for using crop context
export function useCrop() {
  const context = useContext(CropContext);
  
  if (context === undefined) {
    throw new Error('useCrop must be used within a CropProvider');
  }
  
  return context;
}