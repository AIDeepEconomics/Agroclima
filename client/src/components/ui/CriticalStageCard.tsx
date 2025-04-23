import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { CropStage } from '@/lib/types';

interface CriticalStageCardProps {
  stage: CropStage;
  onClick?: () => void;
}

export function CriticalStageCard({ stage, onClick }: CriticalStageCardProps) {
  return (
    <Card 
      className={`
        border-l-4 border-l-amber-500 overflow-hidden hover:shadow-md transition-shadow 
        ${onClick ? 'cursor-pointer' : ''}
      `}
      onClick={onClick}
    >
      <CardHeader className="bg-amber-50 dark:bg-amber-950/30 pb-3 pt-4 px-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-bold text-amber-800 dark:text-amber-300">
            {stage.name}: {stage.label}
          </CardTitle>
          <div className="bg-amber-100 dark:bg-amber-900 w-7 h-7 rounded-full flex items-center justify-center border border-amber-300 dark:border-amber-700">
            <span className="text-xs font-bold text-amber-800 dark:text-amber-300">{stage.name}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-3 pb-4 px-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{stage.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Temperatura Óptima</div>
            <div className="flex items-center">
              <span className="material-icons text-red-500 mr-1">thermostat</span>
              <span className="font-medium">{stage.temperatureMin}°C - {stage.temperatureMax}°C</span>
            </div>
          </div>
          
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Requerimiento de Agua</div>
            <div className="flex items-center">
              <span className="material-icons text-blue-500 mr-1">water_drop</span>
              <span className="font-medium">{stage.waterRequirement} mm/día</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-amber-50/50 dark:bg-amber-950/10 pt-3 pb-3 px-4 flex justify-between items-center border-t border-amber-100 dark:border-amber-900">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Días desde siembra: <span className="font-medium">{stage.dayRangeStart}-{stage.dayRangeEnd}</span>
        </div>
        
        <div className="flex items-center text-amber-600 dark:text-amber-400">
          <span className="material-icons text-sm mr-1">warning</span>
          <span className="text-sm font-medium">Etapa Crítica</span>
        </div>
      </CardFooter>
    </Card>
  );
}