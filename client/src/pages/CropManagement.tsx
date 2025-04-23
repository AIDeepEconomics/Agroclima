import React from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CropProvider, useCrop } from '@/lib/providers/CropProvider';
import { CropSelector } from '@/components/ui/CropSelector';

// Content component that uses the CropProvider
function CropManagementContent() {
  const { availableCrops, selectedCrop, selectCrop } = useCrop();

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <Header 
        title="Gestión de Cultivos" 
        breadcrumbs={[
          { path: '/', label: 'Inicio' },
          { path: '/crop-management', label: 'Gestión de Cultivos' }
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
      
      {selectedCrop ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Información de Cultivo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Nombre</h3>
                  <p className="text-lg">{selectedCrop.name}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Nombre Científico</h3>
                  <p>{selectedCrop.scientificName}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Descripción</h3>
                  <p>{selectedCrop.description}</p>
                </div>
                
                <div className="pt-2">
                  <div 
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: selectedCrop.color }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calendario de Siembra</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-8 text-center flex items-center justify-center">
                <div className="text-slate-500 dark:text-slate-400 flex flex-col items-center">
                  <span className="material-icons text-4xl mb-2">calendar_today</span>
                  <p>Calendario no disponible en esta versión</p>
                  <p className="text-sm mt-1">Se implementará en futuras actualizaciones</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <span className="material-icons text-4xl text-slate-400 dark:text-slate-600 mb-3">
              agriculture
            </span>
            <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-1">
              Seleccione un cultivo para comenzar
            </h3>
            <p className="text-slate-500 dark:text-slate-500 text-sm text-center max-w-md">
              Elija uno de los cultivos disponibles para gestionar su información
              y acceder a recomendaciones específicas.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Main page component that provides the CropProvider
export default function CropManagement() {
  return (
    <CropProvider>
      <CropManagementContent />
    </CropProvider>
  );
}