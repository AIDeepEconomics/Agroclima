import React, { useState } from 'react';
import { formatTime } from '@/lib/utils/formatters';

interface TimelineControlProps {
  minTime?: string;
  maxTime?: string;
  onTimeChange?: (time: string) => void;
}

export function TimelineControl({
  minTime = "06:00 AM",
  maxTime = "06:00 PM",
  onTimeChange
}: TimelineControlProps) {
  const [value, setValue] = useState<number>(50);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("12:00 PM");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    
    // Calculate time based on slider value
    const timeRange = 12 * 60; // 12 hours in minutes
    const minutesFromStart = (timeRange * newValue) / 100;
    
    // Convert to Date object for formatting
    const date = new Date();
    date.setHours(6 + Math.floor(minutesFromStart / 60));
    date.setMinutes(minutesFromStart % 60);
    
    const formattedTime = formatTime(date.toISOString());
    setCurrentTime(formattedTime);
    
    if (onTimeChange) {
      onTimeChange(formattedTime);
    }
  };
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would trigger a timer
    // that updates the slider position automatically
  };

  return (
    <div className="mt-4">
      <div className="flex items-center justify-between">
        <button 
          className="p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-700"
          onClick={togglePlayback}
        >
          <span className="material-icons">
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
        </button>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={value} 
          onChange={handleChange}
          className="flex-1 mx-4 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
        />
        <div className="text-sm text-slate-500 dark:text-slate-400 font-mono">
          {currentTime}
        </div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
        <span>{minTime}</span>
        <span>{maxTime}</span>
      </div>
    </div>
  );
}

export default TimelineControl;
