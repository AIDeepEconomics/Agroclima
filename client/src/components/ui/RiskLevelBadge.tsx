import React from 'react';
import { Badge } from '@/components/ui/badge';
import { RiskType } from '@/lib/types';

interface RiskLevelBadgeProps {
  riskType: RiskType;
  riskLevel: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskLevelBadge({ 
  riskType, 
  riskLevel, 
  showLabel = true,
  size = 'md'
}: RiskLevelBadgeProps) {
  return (
    <Badge 
      className={`
        ${getRiskColorClass(riskType, riskLevel)} 
        ${size === 'sm' ? 'text-xs px-2 py-0.5' : 
          size === 'md' ? 'text-sm px-2.5 py-0.5' : 
          'text-base px-3 py-1'
        }
        ${showLabel ? 'min-w-[80px]' : 'min-w-[40px]'}
        font-medium
      `}
    >
      {showLabel ? (
        <>
          {getRiskLabel(riskType)} <span className="ml-1 font-bold">{riskLevel}</span>
        </>
      ) : (
        <>{riskLevel}</>
      )}
    </Badge>
  );
}

// Helper function to get risk color class based on level
export function getRiskColorClass(riskType: RiskType, level: number): string {
  // Base risk-specific background colors
  const baseColors: Record<RiskType, string> = {
    drought: 'bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800',
    frost: 'bg-blue-50 text-blue-900 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800',
    hail: 'bg-indigo-50 text-indigo-900 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-200 dark:border-indigo-800',
    flood: 'bg-cyan-50 text-cyan-900 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-200 dark:border-cyan-800',
    heat: 'bg-red-50 text-red-900 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800',
    disease: 'bg-purple-50 text-purple-900 border-purple-200 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-800'
  };

  // Risk level based classes
  if (level >= 75) {
    // High risk - more saturated color
    return baseColors[riskType].replace('-50', '-100').replace('-900', '-900').replace('-200', '-300')
      .replace('-950', '-900').replace('-800', '-700');
  } else if (level >= 50) {
    // Medium risk - base color
    return baseColors[riskType];
  } else {
    // Low risk - less saturated
    return baseColors[riskType].replace('-50', '-50/70').replace('-200', '-200/70');
  }
}

// Helper function to get risk label
export function getRiskLabel(riskType: RiskType): string {
  switch (riskType) {
    case 'drought':
      return 'Sequía';
    case 'frost':
      return 'Helada';
    case 'hail':
      return 'Granizo';
    case 'flood':
      return 'Inundación';
    case 'heat':
      return 'Calor';
    case 'disease':
      return 'Enfermedad';
    default:
      return 'Riesgo';
  }
}

// Helper function to get risk icon
export function getRiskIcon(riskType: RiskType): string {
  switch (riskType) {
    case 'drought':
      return 'water_drop_off';
    case 'frost':
      return 'ac_unit';
    case 'hail':
      return 'grain';
    case 'flood':
      return 'water';
    case 'heat':
      return 'local_fire_department';
    case 'disease':
      return 'coronavirus';
    default:
      return 'warning';
  }
}