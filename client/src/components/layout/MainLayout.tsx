import React, { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}