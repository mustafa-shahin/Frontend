import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, LoadingPage } from '@frontend/shared';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireDesignerAccess?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireDesignerAccess = false,
}) => {
  const { isAuthenticated, isLoading, canAccessDesigner } = useAuth();

  if (isLoading) {
    return <LoadingPage message="Authenticating..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireDesignerAccess && !canAccessDesigner()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="mb-4">
            <i className="fas fa-exclamation-triangle text-4xl text-yellow-500"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You need Admin or Developer privileges to access the page designer.
          </p>
          <button
            onClick={() => window.history.back()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
