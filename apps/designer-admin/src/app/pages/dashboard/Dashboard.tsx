import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@frontend/shared';
import { Sidebar } from './components/Sidebar';
import { DashboardHome } from '../dashboard/DashboardHome';
import { Pages } from '../pages/pages';

export const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header isDesignerMode={false} onToggleSidebar={toggleSidebar} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'lg:ml-64' : ''
          }`}
        >
          <div className="p-6">
            <Routes>
              {/* Dashboard home route */}
              <Route index element={<DashboardHome />} />

              {/* Pages routes - handle both the list and individual page actions */}
              <Route path="pages" element={<Pages />} />

              {/* Placeholder routes for other sections */}
              <Route
                path="media"
                element={
                  <div className="text-center py-12">
                    <i className="fas fa-images text-4xl text-gray-400 mb-4"></i>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Media Library
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Media management coming soon...
                    </p>
                  </div>
                }
              />

              <Route
                path="users"
                element={
                  <div className="text-center py-12">
                    <i className="fas fa-users text-4xl text-gray-400 mb-4"></i>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      User Management
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      User management coming soon...
                    </p>
                  </div>
                }
              />

              <Route
                path="settings"
                element={
                  <div className="text-center py-12">
                    <i className="fas fa-cog text-4xl text-gray-400 mb-4"></i>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Settings
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Settings coming soon...
                    </p>
                  </div>
                }
              />

              <Route
                path="components"
                element={
                  <div className="text-center py-12">
                    <i className="fas fa-cubes text-4xl text-gray-400 mb-4"></i>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Component Library
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Component library coming soon...
                    </p>
                  </div>
                }
              />

              <Route
                path="templates"
                element={
                  <div className="text-center py-12">
                    <i className="fas fa-layer-group text-4xl text-gray-400 mb-4"></i>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Templates
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Templates coming soon...
                    </p>
                  </div>
                }
              />

              {/* Redirect any unmatched routes to the dashboard home */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
