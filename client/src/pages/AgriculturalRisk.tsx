import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CropSelector } from '@/components/ui/CropSelector';
import { PhenologyTimeline } from '@/components/ui/PhenologyTimeline';
import { CriticalStageCard } from '@/components/ui/CriticalStageCard';
import { RegionalRiskTable } from '@/components/ui/RegionalRiskTable';
import { RiskLevelBadge, getRiskIcon } from '@/components/ui/RiskLevelBadge';
import { CropProvider, useCrop } from '@/lib/providers/CropProvider';
import { Crop, CropStage, RiskType } from '@/lib/types';
import { regionalRiskData } from '@/lib/mockData/agricultural';

// Content component that uses the CropProvider
function AgriculturalRiskContent() {
  const { 
    availableCrops, 
    selectedCrop, 
    cropStages, 
    criticalStages,
    currentStage,
    cropRisks,
    selectCrop, 
    selectStage 
  } = useCrop();
  
  const [selectedRiskType, setSelectedRiskType] = useState<RiskType>('drought');
  const [activeTab, setActiveTab] = useState('map');
  
  const handleCropSelect = (cropId: number) => {
    selectCrop(cropId);
  };
  
  const handleStageSelect = (stage: CropStage) => {
    selectStage(stage.id);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <Header 
        title="Riesgo Agroclimático" 
        breadcrumbs={[
          { path: '/', label: 'Inicio' },
          { path: '/agricultural-risk', label: 'Riesgo Agroclimático' }
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
            onCropSelect={handleCropSelect}
          />
        </CardContent>
      </Card>
      
      {/* Content when crop is selected */}
      {selectedCrop && (
        <>
          {/* Phenological Timeline */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Línea de Tiempo Fenológica - {selectedCrop.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <PhenologyTimeline 
                stages={cropStages}
                currentStage={currentStage || undefined}
                onStageSelect={handleStageSelect}
              />
            </CardContent>
          </Card>
          
          {/* Critical Stages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Etapas Críticas</h3>
              <div className="space-y-4">
                {criticalStages.map(stage => (
                  <CriticalStageCard 
                    key={stage.id} 
                    stage={stage}
                    onClick={() => handleStageSelect(stage)}
                  />
                ))}
              </div>
            </div>
            
            {/* Risk Visualization */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Visualización de Riesgos</h3>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">
                    Riesgos para {selectedCrop.name}
                    {currentStage && (
                      <span className="text-sm font-normal ml-2">
                        - Etapa {currentStage.name}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="map" onValueChange={setActiveTab}>
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="map">Mapa de Riesgo</TabsTrigger>
                      <TabsTrigger value="table">Resumen Regional</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="map" className="space-y-4">
                      <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-4 text-center flex items-center justify-center h-64">
                        <div className="text-slate-500 dark:text-slate-400 flex flex-col items-center">
                          <span className="material-icons text-4xl mb-2">map</span>
                          <p>Visualización de mapa no disponible en esta versión</p>
                          <p className="text-sm mt-1">Se implementará en futuras actualizaciones</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {(['drought', 'frost', 'hail', 'flood', 'heat', 'disease'] as RiskType[]).map(riskType => (
                          <button 
                            key={riskType}
                            className={`
                              flex items-center px-3 py-1.5 rounded-full border 
                              ${selectedRiskType === riskType 
                                ? 'bg-slate-100 border-slate-300 dark:bg-slate-800 dark:border-slate-600' 
                                : 'border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'
                              }
                            `}
                            onClick={() => setSelectedRiskType(riskType)}
                          >
                            <span className={`
                              material-icons text-sm mr-1
                              ${selectedRiskType === riskType ? 'opacity-100' : 'opacity-70'}
                            `}>
                              {getRiskIcon(riskType)}
                            </span>
                            <RiskLevelBadge 
                              riskType={riskType} 
                              riskLevel={
                                regionalRiskData.find(r => r.regionName === 'Litoral Oeste')?.risks[riskType] || 0
                              }
                              size="sm"
                            />
                          </button>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="table">
                      <RegionalRiskTable 
                        data={regionalRiskData}
                        onRegionSelect={(region) => console.log('Selected region:', region)}
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
      
      {/* No crop selected message */}
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
              Elija uno de los cultivos disponibles para visualizar su información fenológica
              y los riesgos agroclimáticos asociados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Main page component
export default function AgriculturalRisk() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <AgriculturalRiskContent />
        </div>
      </div>
    </div>
  );
}