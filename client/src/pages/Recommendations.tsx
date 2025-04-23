import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CropSelector } from '@/components/ui/CropSelector';
import { RiskLevelBadge, getRiskIcon } from '@/components/ui/RiskLevelBadge';
import { useCrop } from '@/lib/providers/CropProvider';
import { Crop, RiskType, AgronomicRecommendation } from '@/lib/types';

// Mock recommendations data
const mockRecommendations: AgronomicRecommendation[] = [
  {
    id: 1,
    riskId: 1,
    title: 'Adelantar la fecha de siembra',
    description: 'Debido al riesgo de sequía hacia el final del ciclo, se recomienda adelantar la siembra para evitar que el período crítico coincida con la época de mayor probabilidad de déficit hídrico.',
    priority: 4,
    actionType: 'preventive',
    source: 'INIA'
  },
  {
    id: 2,
    riskId: 1,
    title: 'Aplicación preventiva de fungicida',
    description: 'Condiciones de humedad y temperatura favorables para el desarrollo de enfermedades fúngicas. Aplicar fungicida preventivo en la próxima semana.',
    priority: 3,
    actionType: 'preventive',
    source: 'INIA'
  },
  {
    id: 3,
    riskId: 2,
    title: 'Monitoreo de plagas',
    description: 'Incrementar la frecuencia de monitoreo de insectos debido a las condiciones favorables para su desarrollo en las próximas semanas.',
    priority: 2,
    actionType: 'preventive',
    source: 'INIA'
  }
];

function RecommendationsContent() {
  const { availableCrops, selectedCrop, selectCrop } = useCrop();
  const [filter, setFilter] = useState<'all' | 'preventive' | 'corrective'>('all');

  const filteredRecommendations = filter === 'all' 
    ? mockRecommendations 
    : mockRecommendations.filter(rec => rec.actionType === filter);

  return (
    <MainLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <Header 
          title="Recomendaciones Agronómicas" 
          breadcrumbs={[
            { path: '/', label: 'Inicio' },
            { path: '/recommendations', label: 'Recomendaciones' }
          ]} 
        />
        
        {/* Crop Selector */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Selección de Cultivo</CardTitle>
          </CardHeader>
          <CardContent>
            <CropSelector 
              crops={availableCrops}
              selectedCropId={selectedCrop?.id}
              onCropSelect={selectCrop}
            />
          </CardContent>
        </Card>
        
        {selectedCrop && (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recomendaciones para {selectedCrop.name}</h2>
              <div className="flex space-x-2">
                <Button 
                  variant={filter === 'all' ? 'default' : 'outline'} 
                  onClick={() => setFilter('all')}
                  size="sm"
                >
                  Todas
                </Button>
                <Button 
                  variant={filter === 'preventive' ? 'default' : 'outline'} 
                  onClick={() => setFilter('preventive')}
                  size="sm"
                >
                  Preventivas
                </Button>
                <Button 
                  variant={filter === 'corrective' ? 'default' : 'outline'} 
                  onClick={() => setFilter('corrective')}
                  size="sm"
                >
                  Correctivas
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredRecommendations.map(recommendation => (
                <Card key={recommendation.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className={`
                        flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center mr-4
                        ${recommendation.priority >= 4 
                          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                          : recommendation.priority >= 3
                            ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                            : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                        }
                      `}>
                        <span className="material-icons">
                          {recommendation.actionType === 'preventive' ? 'shield' : 'healing'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-lg">{recommendation.title}</h3>
                          <span className={`
                            px-2 py-1 text-xs rounded-full
                            ${recommendation.priority >= 4 
                              ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                              : recommendation.priority >= 3
                                ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                                : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                            }
                          `}>
                            Prioridad {recommendation.priority}/5
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 my-2">
                          {recommendation.description}
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-slate-500 dark:text-slate-500">
                            Fuente: {recommendation.source}
                          </span>
                          <div className="flex items-center">
                            <span className="text-xs mr-2 text-slate-500 dark:text-slate-500">
                              {recommendation.actionType === 'preventive' ? 'Acción preventiva' : 'Acción correctiva'}
                            </span>
                            <Button variant="outline" size="sm">
                              <span className="material-icons text-sm mr-1">description</span>
                              Detalles
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredRecommendations.length === 0 && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <span className="material-icons text-4xl text-slate-400 dark:text-slate-600 mb-3">
                      info
                    </span>
                    <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-1">
                      No hay recomendaciones disponibles
                    </h3>
                    <p className="text-slate-500 dark:text-slate-500 text-sm text-center max-w-md">
                      No se encontraron recomendaciones para el cultivo seleccionado con el filtro actual.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </>
        )}
        
        {!selectedCrop && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <span className="material-icons text-4xl text-slate-400 dark:text-slate-600 mb-3">
                agriculture
              </span>
              <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-1">
                Seleccione un cultivo para comenzar
              </h3>
              <p className="text-slate-500 dark:text-slate-500 text-sm text-center max-w-md">
                Elija uno de los cultivos disponibles para ver recomendaciones
                agronómicas específicas.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}

export default function Recommendations() {
  return <RecommendationsContent />;
}