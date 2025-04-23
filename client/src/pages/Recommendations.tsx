import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CropSelector } from '@/components/ui/CropSelector';
import { Badge } from '@/components/ui/badge';
import { RiskLevelBadge, getRiskIcon } from '@/components/ui/RiskLevelBadge';
import { CropProvider, useCrop } from '@/lib/providers/CropProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function RecommendationsContent() {
  const { availableCrops, selectedCrop, cropRisks, criticalStages, selectCrop } = useCrop();
  const [currentTab, setCurrentTab] = useState('current');
  
  return (
    <div className="space-y-6">
      
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
      
      {selectedCrop ? (
        <>
          <Tabs defaultValue="current" onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="current">Recomendaciones Actuales</TabsTrigger>
              <TabsTrigger value="preventive">Acciones Preventivas</TabsTrigger>
              <TabsTrigger value="historic">Histórico</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-900 p-4 rounded-lg flex items-start">
                <span className="material-icons text-amber-600 dark:text-amber-400 mr-3 mt-0.5">
                  warning
                </span>
                <div>
                  <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-1">
                    Etapa Crítica Activa
                  </h3>
                  <p className="text-amber-700 dark:text-amber-400 text-sm">
                    El cultivo de {selectedCrop.name} se encuentra en una etapa crítica (R3: Formación de Vainas). 
                    Las condiciones actuales de sequía presentan un alto riesgo para el rendimiento.
                  </p>
                </div>
              </div>
              
              {/* Current Recommendation Cards */}
              <div className="space-y-4">
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          <span className="material-icons text-red-500 mr-2">
                            {getRiskIcon('drought')}
                          </span>
                          Manejo de Sequía
                        </CardTitle>
                        <CardDescription>Recomendación Urgente</CardDescription>
                      </div>
                      <RiskLevelBadge riskType="drought" riskLevel={75} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">
                      La etapa actual de formación de vainas es altamente sensible al estrés hídrico. 
                      Se recomienda priorizar el riego si es posible, ya que el pronóstico indica continuidad de las 
                      condiciones secas por al menos 7 días más.
                    </p>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-start">
                        <span className="material-icons text-slate-400 mr-2 text-sm mt-0.5">check_circle</span>
                        <p className="text-sm">Aplicar riego suplementario de al menos 30mm si está disponible</p>
                      </div>
                      <div className="flex items-start">
                        <span className="material-icons text-slate-400 mr-2 text-sm mt-0.5">check_circle</span>
                        <p className="text-sm">Monitorear el estado de las plantas diariamente</p>
                      </div>
                      <div className="flex items-start">
                        <span className="material-icons text-slate-400 mr-2 text-sm mt-0.5">check_circle</span>
                        <p className="text-sm">Considerar la aplicación de antitranspirantes foliares</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
                      <div className="flex items-center text-sm mb-1">
                        <span className="material-icons text-slate-500 mr-1 text-sm">source</span>
                        <span className="font-medium">Fuente:</span>
                        <span className="ml-1">INIA Uruguay</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Recomendación basada en estudios de respuesta de soja a sequía en etapas reproductivas tempranas
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <div className="flex items-center text-sm text-slate-500">
                      <span className="material-icons text-sm mr-1">calendar_today</span>
                      Emitida: 20/12/2023
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <span className="material-icons text-sm mr-1">share</span>
                        Compartir
                      </Button>
                      <Button size="sm">
                        <span className="material-icons text-sm mr-1">check</span>
                        Aplicada
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
                
                <Card className="border-l-4 border-l-orange-500">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          <span className="material-icons text-orange-500 mr-2">
                            {getRiskIcon('heat')}
                          </span>
                          Prevención de Estrés Térmico
                        </CardTitle>
                        <CardDescription>Recomendación Importante</CardDescription>
                      </div>
                      <RiskLevelBadge riskType="heat" riskLevel={65} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">
                      Se pronostican temperaturas máximas superiores a 32°C durante los próximos 5 días,
                      lo que puede afectar la viabilidad del polen y la fecundación.
                    </p>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-start">
                        <span className="material-icons text-slate-400 mr-2 text-sm mt-0.5">check_circle</span>
                        <p className="text-sm">Si es posible, programar riegos en las horas de mayor temperatura</p>
                      </div>
                      <div className="flex items-start">
                        <span className="material-icons text-slate-400 mr-2 text-sm mt-0.5">check_circle</span>
                        <p className="text-sm">Evitar aplicaciones de agroquímicos durante las horas de calor extremo</p>
                      </div>
                      <div className="flex items-start">
                        <span className="material-icons text-slate-400 mr-2 text-sm mt-0.5">check_circle</span>
                        <p className="text-sm">Monitorear síntomas de estrés térmico como aborto floral</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <div className="flex items-center text-sm text-slate-500">
                      <span className="material-icons text-sm mr-1">calendar_today</span>
                      Emitida: 18/12/2023
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <span className="material-icons text-sm mr-1">share</span>
                        Compartir
                      </Button>
                      <Button size="sm">
                        <span className="material-icons text-sm mr-1">check</span>
                        Aplicada
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="preventive">
              <div className="bg-sky-50 border border-sky-200 dark:bg-sky-950/30 dark:border-sky-900 p-4 rounded-lg flex items-start mb-6">
                <span className="material-icons text-sky-600 dark:text-sky-400 mr-3 mt-0.5">
                  info
                </span>
                <div>
                  <h3 className="font-medium text-sky-800 dark:text-sky-300 mb-1">
                    Acciones Preventivas
                  </h3>
                  <p className="text-sky-700 dark:text-sky-400 text-sm">
                    Estas recomendaciones le ayudarán a prepararse para posibles eventos climáticos
                    adversos en las próximas semanas para su cultivo de {selectedCrop.name}.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center">
                      <span className="material-icons text-indigo-500 mr-2">
                        {getRiskIcon('hail')}
                      </span>
                      Preparación para Evento de Granizo
                    </CardTitle>
                    <CardDescription>
                      Probabilidad de granizo aumenta en las próximas 2 semanas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">
                      La temporada de tormentas convectivas está comenzando y existe un riesgo
                      moderado de eventos de granizo para su región en las próximas semanas.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="material-icons text-slate-400 mr-2 text-sm mt-0.5">engineering</span>
                        <p className="text-sm">Verificar la cobertura de seguro agrícola para daño por granizo</p>
                      </div>
                      <div className="flex items-start">
                        <span className="material-icons text-slate-400 mr-2 text-sm mt-0.5">engineering</span>
                        <p className="text-sm">Estar atento a alertas meteorológicas en los próximos días</p>
                      </div>
                      <div className="flex items-start">
                        <span className="material-icons text-slate-400 mr-2 text-sm mt-0.5">engineering</span>
                        <p className="text-sm">Preparar plan de acción post-granizo si ocurriera el evento</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="historic">
              <div className="bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 p-4 rounded-lg flex items-start mb-6">
                <span className="material-icons text-slate-600 dark:text-slate-400 mr-3 mt-0.5">
                  history
                </span>
                <div>
                  <h3 className="font-medium text-slate-800 dark:text-slate-300 mb-1">
                    Histórico de Recomendaciones
                  </h3>
                  <p className="text-slate-700 dark:text-slate-400 text-sm">
                    Registro de recomendaciones anteriores para su cultivo de {selectedCrop.name}.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <Card className="opacity-75 hover:opacity-100 transition-opacity">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          <span className="material-icons text-purple-500 mr-2">
                            {getRiskIcon('disease')}
                          </span>
                          Prevención de Enfermedades Fúngicas
                        </CardTitle>
                        <CardDescription>Completada el 05/12/2023</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                        Implementada
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Aplicación preventiva de fungicida recomendada debido a condiciones
                      favorables para el desarrollo de roya asiática en etapa vegetativa tardía.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="opacity-75 hover:opacity-100 transition-opacity">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center">
                          <span className="material-icons text-blue-500 mr-2">
                            {getRiskIcon('frost')}
                          </span>
                          Protección contra Helada Tardía
                        </CardTitle>
                        <CardDescription>Completada el 20/10/2023</CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                        Implementada
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Recomendación de medidas de protección contra heladas tardías
                      durante la emergencia del cultivo.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <span className="material-icons text-4xl text-slate-400 dark:text-slate-600 mb-3">
              tips_and_updates
            </span>
            <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-1">
              Seleccione un cultivo para ver recomendaciones
            </h3>
            <p className="text-slate-500 dark:text-slate-500 text-sm text-center max-w-md">
              Las recomendaciones agronómicas son específicas para cada cultivo 
              y se basan en las condiciones meteorológicas y etapa fenológica actual.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function Recommendations() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Recomendaciones Agronómicas" 
          breadcrumbs={[
            { path: '/', label: 'Inicio' },
            { path: '/recommendations', label: 'Recomendaciones' }
          ]} 
        />
        
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
          <CropProvider>
            <RecommendationsContent />
          </CropProvider>
        </main>
      </div>
    </div>
  );
}