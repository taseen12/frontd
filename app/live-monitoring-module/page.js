"use client";

import { Users, Droplet, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card } from '../components/ui/card';
import Navbar from './../components/Navbar';

export default function MonitoringModuleCard() {
  const router = useRouter();
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case 'idle':
        return 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
      default:
        return '';
    }
  };

  const getIconColor = (icon) => {
    switch (icon) {
      case 'active':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'idle':
        return 'text-gray-400';
      default:
        return '';
    }
  };

  const getStatusBadgeColor = (badge) => {
    switch (badge) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'idle':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
      default:
        return '';
    }
  };

  const modules = [
    {
      id: "Patient Monitoring",
      title: 'Patient Monitoring',
      type: 'patient',
      path: "/live-monitoring-module/patient",
      activeCount: 12,
      totalCount: 15,
      status: 'active',
      lastUpdate: '2 mins ago',
    },
    {
      id: 'Washroom Monitoring',
      title: 'Washroom Monitoring',
      path: "/live-monitoring-module/washroom",
      type: 'washroom',
      activeCount: 8,
      totalCount: 12,
      status: 'active',
      lastUpdate: '1 min ago',
    },
  ];

    const navigateToModule = (path) => {
    router.push(path);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {modules.map((module) => (
            <Card
              key={module.id}
              className={`p-3 border-2 transition-all hover:shadow-md ${getStatusColor(
                module.status
              )}`}
              onClick={() => navigateToModule(module.path)}
            >
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {module.type === 'patient' ? (
                    <Users
                      className={`w-5 h-5 flex-shrink-0 ${getIconColor(
                        module.icon
                      )}`}
                    />
                  ) : (
                    <Droplet
                      className={`w-5 h-5 flex-shrink-0 ${getIconColor(
                        module.badge
                      )}`}
                    />
                  )}

                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                      {module.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      Last: {module.lastUpdate}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-0 mx-2 flex-shrink-0">
                  <span className="text-sm font-bold text-green-500">
                    {module.activeCount}
                  </span>
                  <span className="text-xs text-gray-500">
                    of {module.totalCount}
                  </span>
                </div>

                <div className="flex-shrink-0">
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                      module.status
                    )}`}
                  >
                    {module.status === 'warning' && (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    <span className="capitalize">{module.status}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <footer className="bg-gray-100 dark:bg-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-300">
          <p>© {new Date().getFullYear()} Hospital Monitoring System</p>
        </div>
      </footer>
    </main>
  );
}
