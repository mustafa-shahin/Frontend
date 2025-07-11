import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types/auth';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Alert } from '../ui/Alert';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallbackPath?: string;
  showUnauthorized?: boolean;
}

export function ProtectedRoute({
  children,
  requiredRoles = [],
  fallbackPath = '/login',
  showUnauthorized = true,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600 dark:text-gray-400">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check if user has required roles
  const hasRequiredRole =
    requiredRoles.length === 0 || requiredRoles.includes(user.role);

  if (!hasRequiredRole) {
    if (showUnauthorized) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full space-y-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
                <i className="fa fa-exclamation-triangle text-2xl text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Access Denied
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You don't have permission to access this page.
              </p>
            </div>

            <Alert
              type="error"
              message={`This page requires ${requiredRoles
                .map((role) => UserRole[role])
                .join(' or ')} permissions.`}
            />

            <div className="space-y-2 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>
                Current role:{' '}
                <span className="font-medium">{UserRole[user.role]}</span>
              </p>
              <p>
                Required roles:{' '}
                <span className="font-medium">
                  {requiredRoles.map((role) => UserRole[role]).join(', ')}
                </span>
              </p>
            </div>

            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md transition-colors duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }

    // Redirect to fallback path if showUnauthorized is false
    return (
      <Navigate
        to={fallbackPath}
        state={{
          from: location,
          error: 'Insufficient permissions',
        }}
        replace
      />
    );
  }

  // Render protected content
  return children;
}
