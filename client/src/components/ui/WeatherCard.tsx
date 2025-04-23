import React from 'react';

interface WeatherCardProps {
  title: string;
  value: string;
  unit?: string;
  change?: {
    value: number;
    direction: 'up' | 'down';
  };
  icon: string;
  iconColor: string;
  min?: number;
  max?: number;
  current?: number;
  gradientColors?: {
    from: string;
    to: string;
  };
  minLabel?: string;
  maxLabel?: string;
}

export function WeatherCard({
  title,
  value,
  unit,
  change,
  icon,
  iconColor,
  min,
  max,
  current,
  gradientColors = { from: 'from-blue-500', to: 'to-red-500' },
  minLabel = 'Min',
  maxLabel = 'Max',
}: WeatherCardProps) {
  const normalizedPercentage = min !== undefined && max !== undefined && current !== undefined
    ? ((current - min) / (max - min)) * 100
    : 0;

  const changeIcon = change?.direction === 'up' ? 'arrow_upward' : 'arrow_downward';
  const changeColor = change?.direction === 'up' ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold font-mono text-slate-900 dark:text-white">
              {value}
              {unit && <span className="text-lg ml-1">{unit}</span>}
            </p>
            {change && (
              <span className={`ml-2 text-sm ${changeColor} flex items-center`}>
                <span className="material-icons text-sm">{changeIcon}</span>
                {change.value}
                {unit && unit}
              </span>
            )}
          </div>
        </div>
        <div className={`p-2 bg-${iconColor}-50 dark:bg-${iconColor}-900/20 rounded-lg`}>
          <span className={`material-icons text-${iconColor}-500 dark:text-${iconColor}-400`}>
            {icon}
          </span>
        </div>
      </div>
      
      {min !== undefined && max !== undefined && (
        <div className="mt-4">
          <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-1 bg-gradient-to-r ${gradientColors.from} ${gradientColors.to} rounded-full`}
              style={{ width: `${normalizedPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-500 dark:text-slate-400">
            <span>{minLabel}: {min}{unit}</span>
            <span>{maxLabel}: {max}{unit}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherCard;
