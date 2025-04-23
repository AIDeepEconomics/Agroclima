import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CropSelector } from '@/components/ui/CropSelector';
import { useCrop } from '@/lib/providers/CropProvider';
import { Field } from '@/lib/types';

// Mock field data
const mockFields: Field[] = [
  {
    id: 1,
    userId: 1,
    name: 'Campo Norte',
    description: 'Zona norte de la propiedad, cerca del arroyo',
    area: 25.5,
  },
  {
    id: 2,
    userId: 1,
    name: 'Campo Sur',
    description: 'Zona sur de la propiedad, límite con camino vecinal',
    area: 32.8,
  },
];

function FieldManagementContent() {
  const { availableCrops, selectedCrop, selectCrop } = useCrop();
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [activeTab, setActiveTab] = useState('list');

  return (
    <MainLayout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <Header 
          title="Gestión de Campos" 
          breadcrumbs={[
            { path: '/', label: 'Inicio' },
            { path: '/field-management', label: 'Gestión de Campos' }
          ]} 
        />
        
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Sus Campos</h2>
          <Button>
            <span className="material-icons mr-2 text-sm">add</span>
            Nuevo Campo
          </Button>
        </div>
        
        <Tabs defaultValue="list" onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:w-auto grid-cols-2 md:inline-flex">
            <TabsTrigger value="list">Lista de Campos</TabsTrigger>
            <TabsTrigger value="map">Mapa</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="space-y-4">
            {mockFields.map(field => (
              <Card 
                key={field.id}
                className={`cursor-pointer transition-all ${
                  selectedField?.id === field.id 
                    ? 'border-primary-500 dark:border-primary-400' 
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
                onClick={() => setSelectedField(field)}
              >
                <CardContent className="flex justify-between items-center p-4">
                  <div>
                    <h3 className="font-medium">{field.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{field.description}</p>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Área: {field.area} hectáreas
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <span className="material-icons">chevron_right</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="map">
            <Card>
              <CardContent className="p-6">
                <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-8 text-center flex items-center justify-center h-[400px]">
                  <div className="text-slate-500 dark:text-slate-400 flex flex-col items-center">
                    <span className="material-icons text-4xl mb-2">map</span>
                    <p>Visualización de mapa no disponible en esta versión</p>
                    <p className="text-sm mt-1">Se implementará en futuras actualizaciones</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {selectedField && (
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Campo: {selectedField.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Descripción</h3>
                  <p>{selectedField.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Área</h3>
                  <p>{selectedField.area} hectáreas</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Cultivos Plantados</h3>
                <CropSelector 
                  crops={availableCrops}
                  selectedCropId={selectedCrop?.id}
                  onCropSelect={selectCrop}
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <span className="material-icons mr-2 text-sm">edit</span>
                  Editar
                </Button>
                <Button variant="destructive">
                  <span className="material-icons mr-2 text-sm">delete</span>
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}

export default function FieldManagement() {
  return <FieldManagementContent />;
}