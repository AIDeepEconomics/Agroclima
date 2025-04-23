import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  formatDate, 
  formatTemperature, 
  formatPrecipitation, 
  formatPercentage 
} from '@/lib/utils/formatters';
import { 
  processTemperatureData, 
  processPrecipitationData, 
  getChartColor, 
  formatTickValues 
} from '@/lib/utils/chartUtils';
import { HistoricalDataPoint } from '@/lib/types';

interface HistoricalChartProps {
  data: HistoricalDataPoint[];
  type: string;
  height?: number;
}

export function HistoricalChart({ 
  data, 
  type = 'temperature',
  height = 350 
}: HistoricalChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    // Process data based on chart type
    if (type === 'temperature') {
      setChartData(processTemperatureData(data));
    } else if (type === 'precipitation') {
      setChartData(processPrecipitationData(data));
    } else {
      // Default to temperature if type is not recognized
      setChartData(processTemperatureData(data));
    }
  }, [data, type]);
  
  const dataKey = type === 'precipitation' ? 'precipitation' : 'temperature';
  const color = getChartColor(type);
  
  // Customized tooltip to match design
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      let formattedValue;
      
      if (type === 'temperature') {
        formattedValue = formatTemperature(value);
      } else if (type === 'precipitation') {
        formattedValue = formatPrecipitation(value);
      } else if (type === 'humidity') {
        formattedValue = formatPercentage(value);
      } else {
        formattedValue = value;
      }
      
      return (
        <div className="p-3 bg-white dark:bg-slate-800 shadow-md rounded-md border border-slate-200 dark:border-slate-700">
          <p className="text-sm font-medium text-slate-900 dark:text-white">
            {formatDate(label, 'medium')}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
            <span className="font-semibold" style={{ color }}>
              {formattedValue}
            </span>
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  // This is a placeholder for the actual chart rendering
  // In a real implementation, we would use the recharts library
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-2 h-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e2e8f0" 
            className="dark:stroke-slate-700" 
          />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => formatDate(value, 'short')}
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
          />
          <YAxis 
            tickFormatter={(value) => formatTickValues(value, type)}
            stroke="#94a3b8"
            className="dark:stroke-slate-500"
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2}
            dot={{ stroke: color, strokeWidth: 2, r: 4, fill: 'white' }}
            activeDot={{ stroke: color, strokeWidth: 2, r: 6, fill: 'white' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HistoricalChart;
