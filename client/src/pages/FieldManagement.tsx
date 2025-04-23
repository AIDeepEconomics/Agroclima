import React from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CropProvider, useCrop } from '@/lib/providers/CropProvider';

function FieldManagementContent() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <Header 
        title="Gestión de Parcelas" 
        breadcrumbs={[
          { path: '/', label: 'Inicio' },
          { path: '/field-management', label: 'Gestión de Parcelas' }
        ]} 
      />
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Mis Parcelas</h2>
        <Button className="flex items-center">
          <span className="material-icons mr-2">add</span>
          Nueva Parcela
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Empty state card */}
        <Card className="flex flex-col items-center justify-center p-6 h-64 border-dashed border-2">
          <span className="material-icons text-4xl text-slate-400 dark:text-slate-600 mb-3">
            add_location
          </span>
          <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-1">
            Añadir Nueva Parcela
          </h3>
          <p className="text-slate-500 dark:text-slate-500 text-sm text-center mb-4">
            Registre información sobre sus chacras para recibir información agronómica específica.
          </p>
          <Button variant="outline" className="mt-2">
            <span className="material-icons mr-2">add</span>
            Crear Parcela
          </Button>
        </Card>
        
        {/* Example field card (will be in a loop in the future) */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Chacra Norte</CardTitle>
                <CardDescription>45 hectáreas</CardDescription>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1 rounded-full">
                <span className="material-icons text-emerald-600 dark:text-emerald-400">
                  agriculture
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Cultivo:</span>
                <span className="font-medium">Soja</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Variedad:</span>
                <span className="font-medium">DM 5.9i</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Fecha de siembra:</span>
                <span className="font-medium">15/11/2023</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Etapa actual:</span>
                <span className="font-medium">R3 (Formación de Vainas)</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <span className="material-icons text-sm mr-1">edit</span>
                Editar
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <span className="material-icons text-sm mr-1">map</span>
                Ver en Mapa
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Example field card */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Chacra Sur</CardTitle>
                <CardDescription>32 hectáreas</CardDescription>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full">
                <span className="material-icons text-amber-600 dark:text-amber-400">
                  agriculture
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Cultivo:</span>
                <span className="font-medium">Trigo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Variedad:</span>
                <span className="font-medium">INIA Carpintero</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Fecha de siembra:</span>
                <span className="font-medium">05/06/2023</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400">Etapa actual:</span>
                <span className="font-medium">Z85 (Madurez Media)</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <span className="material-icons text-sm mr-1">edit</span>
                Editar
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <span className="material-icons text-sm mr-1">map</span>
                Ver en Mapa
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Mapa de Parcelas</CardTitle>
          <CardDescription>
            Visualización geográfica de sus parcelas registradas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-8 text-center flex items-center justify-center h-64">
            <div className="text-slate-500 dark:text-slate-400 flex flex-col items-center">
              <span className="material-icons text-4xl mb-2">map</span>
              <p>Mapa no disponible en esta versión</p>
              <p className="text-sm mt-1">Se implementará en futuras actualizaciones</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function FieldManagement() {
  return (
    <CropProvider>
      <FieldManagementContent />
    </CropProvider>
  );
}