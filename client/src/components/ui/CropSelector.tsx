import React from 'react';
import { Card } from '@/components/ui/card';
import { Crop, CropType } from '@/lib/types';

interface CropSelectorProps {
  crops: Crop[];
  selectedCropId?: number;
  onCropSelect: (cropId: number) => void;
}

export function CropSelector({ crops, selectedCropId, onCropSelect }: CropSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3 p-1">
      {crops.map((crop) => (
        <Card 
          key={crop.id}
          onClick={() => onCropSelect(crop.id)}
          className={`
            flex flex-col items-center justify-center p-3 w-24 h-28 cursor-pointer 
            transition-all duration-200 border-2
            ${selectedCropId === crop.id 
              ? `border-${getCropColorClass(crop.type)} bg-${getCropColorClass(crop.type)}/10`
              : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
            }
          `}
        >
          <div 
            className={`
              w-12 h-12 mb-2 rounded-full flex items-center justify-center
              ${selectedCropId === crop.id 
                ? `bg-${getCropColorClass(crop.type)}/20` 
                : 'bg-gray-100 dark:bg-gray-800'
              }
            `}
          >
            <span className="text-2xl">
              {getCropEmoji(crop.type)}
            </span>
          </div>
          <span className={`
            text-sm font-medium
            ${selectedCropId === crop.id ? `text-${getCropColorClass(crop.type)}` : ''}
          `}>
            {crop.name}
          </span>
        </Card>
      ))}
    </div>
  );
}

// Helper function to get crop emoji (since we don't have SVG icons yet)
function getCropEmoji(cropType: CropType): string {
  switch (cropType) {
    case 'soybean':
      return '🌱';
    case 'corn':
      return '🌽';
    case 'wheat':
      return '🌾';
    case 'barley':
      return '🌿';
    default:
      return '🌿';
  }
}

// Helper function to get crop color class
function getCropColorClass(cropType: CropType): string {
  switch (cropType) {
    case 'soybean':
      return 'emerald-600';
    case 'corn':
      return 'yellow-500';
    case 'wheat':
      return 'amber-500';
    case 'barley':
      return 'orange-700';
    default:
      return 'green-500';
  }
}