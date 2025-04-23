import React, { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { RiskLevelBadge, getRiskIcon } from '@/components/ui/RiskLevelBadge';
import { RegionalRiskSummary, RiskType } from '@/lib/types';

interface RegionalRiskTableProps {
  data: RegionalRiskSummary[];
  onRegionSelect?: (regionName: string) => void;
}

export function RegionalRiskTable({ data, onRegionSelect }: RegionalRiskTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof RegionalRiskSummary['risks'] | 'region'>('region');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: keyof RegionalRiskSummary['risks'] | 'region') => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (sortColumn === 'region') {
      return sortDirection === 'asc' 
        ? a.regionName.localeCompare(b.regionName)
        : b.regionName.localeCompare(a.regionName);
    } else {
      return sortDirection === 'asc'
        ? a.risks[sortColumn as keyof RegionalRiskSummary['risks']] - b.risks[sortColumn as keyof RegionalRiskSummary['risks']]
        : b.risks[sortColumn as keyof RegionalRiskSummary['risks']] - a.risks[sortColumn as keyof RegionalRiskSummary['risks']];
    }
  });

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
              onClick={() => handleSort('region')}
            >
              <div className="flex items-center">
                Región
                {sortColumn === 'region' && (
                  <span className="material-icons ml-1 text-sm">
                    {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
              onClick={() => handleSort('drought')}
            >
              <div className="flex items-center justify-center">
                <span className="material-icons text-amber-600 mr-1">
                  {getRiskIcon('drought')}
                </span>
                {sortColumn === 'drought' && (
                  <span className="material-icons ml-1 text-sm">
                    {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
              onClick={() => handleSort('frost')}
            >
              <div className="flex items-center justify-center">
                <span className="material-icons text-blue-600 mr-1">
                  {getRiskIcon('frost')}
                </span>
                {sortColumn === 'frost' && (
                  <span className="material-icons ml-1 text-sm">
                    {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
              onClick={() => handleSort('hail')}
            >
              <div className="flex items-center justify-center">
                <span className="material-icons text-indigo-600 mr-1">
                  {getRiskIcon('hail')}
                </span>
                {sortColumn === 'hail' && (
                  <span className="material-icons ml-1 text-sm">
                    {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
              onClick={() => handleSort('flood')}
            >
              <div className="flex items-center justify-center">
                <span className="material-icons text-cyan-600 mr-1">
                  {getRiskIcon('flood')}
                </span>
                {sortColumn === 'flood' && (
                  <span className="material-icons ml-1 text-sm">
                    {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
              onClick={() => handleSort('heat')}
            >
              <div className="flex items-center justify-center">
                <span className="material-icons text-red-600 mr-1">
                  {getRiskIcon('heat')}
                </span>
                {sortColumn === 'heat' && (
                  <span className="material-icons ml-1 text-sm">
                    {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
              onClick={() => handleSort('disease')}
            >
              <div className="flex items-center justify-center">
                <span className="material-icons text-purple-600 mr-1">
                  {getRiskIcon('disease')}
                </span>
                {sortColumn === 'disease' && (
                  <span className="material-icons ml-1 text-sm">
                    {sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                )}
              </div>
            </TableHead>
            <TableHead>Mayor Riesgo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((region) => (
            <TableRow 
              key={region.regionName}
              className={onRegionSelect ? "cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800" : ""}
              onClick={() => onRegionSelect && onRegionSelect(region.regionName)}
            >
              <TableCell className="font-medium">{region.regionName}</TableCell>
              <TableCell className="text-center">{region.risks.drought}</TableCell>
              <TableCell className="text-center">{region.risks.frost}</TableCell>
              <TableCell className="text-center">{region.risks.hail}</TableCell>
              <TableCell className="text-center">{region.risks.flood}</TableCell>
              <TableCell className="text-center">{region.risks.heat}</TableCell>
              <TableCell className="text-center">{region.risks.disease}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <RiskLevelBadge 
                    riskType={region.highestRisk}
                    riskLevel={region.highestRiskLevel}
                    size="sm"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}