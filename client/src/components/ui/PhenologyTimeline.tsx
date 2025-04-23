import React from 'react';
import { Card } from '@/components/ui/card';
import { CropStage } from '@/lib/types';

interface PhenologyTimelineProps {
  stages: CropStage[];
  currentStage?: CropStage;
  onStageSelect?: (stage: CropStage) => void;
}

export function PhenologyTimeline({ stages, currentStage, onStageSelect }: PhenologyTimelineProps) {
  // Sort stages by sortOrder
  const sortedStages = [...stages].sort((a, b) => a.sortOrder - b.sortOrder);
  
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-max p-2 pb-4">
        {sortedStages.map((stage, index) => {
          const isCurrentStage = currentStage?.id === stage.id;
          const isCritical = stage.isCritical;
          
          return (
            <div key={stage.id} className="flex flex-col items-center">
              {/* Stage dot and connecting line */}
              <div className="flex items-center w-24">
                {index > 0 && (
                  <div className={`h-0.5 w-full ${
                    isCritical ? 'bg-amber-300 dark:bg-amber-700' : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                )}
                <div 
                  className={`
                    w-7 h-7 rounded-full flex items-center justify-center cursor-pointer
                    transition-all duration-300
                    ${isCurrentStage ? 'ring-4 ring-primary-400 ring-opacity-50' : ''}
                    ${isCritical 
                      ? 'bg-amber-100 border-2 border-amber-500 text-amber-800 dark:bg-amber-900 dark:border-amber-600 dark:text-amber-200' 
                      : 'bg-gray-100 border-2 border-gray-400 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300'
                    }
                  `}
                  onClick={() => onStageSelect && onStageSelect(stage)}
                >
                  <span className="text-xs font-bold">{stage.name}</span>
                </div>
                {index < sortedStages.length - 1 && (
                  <div className={`h-0.5 w-full ${
                    sortedStages[index + 1].isCritical 
                      ? 'bg-amber-300 dark:bg-amber-700' 
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}></div>
                )}
              </div>
              
              {/* Days indicator */}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center w-full">
                {stage.dayRangeStart}-{stage.dayRangeEnd} días
              </div>
              
              {/* Stage label */}
              <div className={`
                mt-1 px-2 py-1 rounded text-center text-xs w-24
                ${isCurrentStage ? 'font-bold' : 'font-medium'}
                ${isCritical 
                  ? 'text-amber-800 dark:text-amber-200' 
                  : 'text-gray-700 dark:text-gray-300'
                }
              `}>
                {stage.label}
              </div>
              
              {/* Critical indicator */}
              {isCritical && (
                <div className="mt-1 text-xs text-amber-600 dark:text-amber-400 flex items-center">
                  <span className="material-icons text-xs mr-0.5">warning</span>
                  Crítico
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}