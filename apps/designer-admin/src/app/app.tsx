import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthProvider, UserRole } from '@frontend/shared';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { LoginPage } from '../pages/LoginPage';
import { PagesListPage } from '../pages/PagesListPage';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import './styles/fontawesome.css';

const REQUIRED_ROLES = [UserRole.Admin, UserRole.Dev];

export function App() {
  const { ready } = useTranslation();

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <AuthProvider requiredRoles={REQUIRED_ROLES}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/10 to-indigo-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/10">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected routes */}
          <Route
            path="/pages"
            element={
              <ProtectedRoute requiredRoles={REQUIRED_ROLES}>
                <PagesListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/designer/:pageId"
            element={
              <ProtectedRoute requiredRoles={REQUIRED_ROLES}>
                <div className="min-h-screen flex items-center justify-center px-6 py-12">
                  <div className="enterprise-card p-12 text-center max-w-2xl w-full">
                    <div className="h-20 w-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                      <i className="fas fa-paint-brush text-white text-3xl" />
                    </div>
                    <h1 className="text-4xl font-bold gradient-text mb-6">
                      Page Designer
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                      Advanced visual page designer interface will be implemented here. 
                      Create stunning layouts with drag-and-drop components and real-time editing.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4 justify-center">
                      <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-xl text-sm font-medium">
                        Coming Soon
                      </span>
                      <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-xl text-sm font-medium">
                        Enterprise Ready
                      </span>
                    </div>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/pages" replace />} />

          {/* 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
