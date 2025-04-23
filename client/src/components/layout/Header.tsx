import React from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '@/hooks/use-theme';

interface BreadcrumbItem {
  path: string;
  label: string;
}

interface HeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function Header({ title, breadcrumbs = [] }: HeaderProps) {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
              <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                Home
              </Link>
              
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={item.path}>
                  <span className="material-icons text-slate-400 mx-1 text-sm">chevron_right</span>
                  {index === breadcrumbs.length - 1 ? (
                    <span className="font-medium text-slate-900 dark:text-white">
                      {item.label}
                    </span>
                  ) : (
                    <Link 
                      href={item.path} 
                      className="hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {item.label}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Search location..." 
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400"
              />
              <span className="material-icons absolute left-3 top-2 text-slate-400">search</span>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700" 
                onClick={toggleTheme} 
                aria-label="Toggle theme"
              >
                <span className={`material-icons ${theme === 'dark' ? 'hidden' : ''}`}>
                  dark_mode
                </span>
                <span className={`material-icons ${theme === 'light' ? 'hidden' : ''}`}>
                  light_mode
                </span>
              </button>
              <button 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700" 
                aria-label="Notifications"
              >
                <span className="material-icons">notifications</span>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
                    <span className="text-sm font-medium">JD</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
