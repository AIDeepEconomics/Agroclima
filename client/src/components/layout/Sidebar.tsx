import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  className?: string;
}

const mainNavItems: NavItem[] = [
  { path: "/", label: "Dashboard", icon: "dashboard" },
  { path: "/historical", label: "Historical Analysis", icon: "history" },
  { path: "/forecast", label: "Forecast", icon: "calendar_today" },
];

const settingsNavItems: NavItem[] = [
  { path: "/settings", label: "Configuration", icon: "settings" },
  { path: "/help", label: "Help", icon: "help" },
];

export function Sidebar({ className = "" }: SidebarProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <div 
      className={`transition-all duration-300 ease-in-out bg-white dark:bg-slate-800 shadow-lg ${
        collapsed ? "w-20" : "w-64"
      } h-full flex flex-col z-10 ${className}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2">
          <span className="material-icons text-primary-600 dark:text-primary-400">cloud</span>
          {!collapsed && (
            <span className="font-bold text-xl text-primary-600 dark:text-primary-400">
              WeatherViz
            </span>
          )}
        </div>
        <button 
          onClick={toggleSidebar} 
          className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          aria-label="Toggle sidebar"
        >
          <span className="material-icons">menu</span>
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto no-scrollbar">
        <div className="p-2">
          {!collapsed && (
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2">
              Main Navigation
            </div>
          )}
          
          {mainNavItems.map((item) => (
            <Link 
              key={item.path}
              href={item.path} 
              className={`flex items-center ${
                collapsed ? "justify-center" : "space-x-2"
              } px-4 py-3 rounded-md ${
                location === item.path
                  ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              <span className="material-icons">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
          
          {!collapsed && (
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 py-2 mt-6">
              Settings
            </div>
          )}
          
          {settingsNavItems.map((item) => (
            <Link 
              key={item.path}
              href={item.path} 
              className={`flex items-center ${
                collapsed ? "justify-center" : "space-x-2"
              } px-4 py-3 rounded-md ${
                location === item.path
                  ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              <span className="material-icons">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <a 
          href="#" 
          className={`flex items-center ${
            collapsed ? "justify-center" : "space-x-2"
          } px-4 py-2 rounded-md text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700`}
        >
          <span className="material-icons">logout</span>
          {!collapsed && <span>Logout</span>}
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
