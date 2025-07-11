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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-gray-600 font-medium">
            Loading application...
          </span>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider requiredRoles={REQUIRED_ROLES}>
      <div className="min-h-screen bg-gray-50">
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
                <div className="min-h-screen bg-gray-50">
                  <div className="max-w-4xl mx-auto px-6 py-16">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                      <div className="h-20 w-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-md">
                        <i className="fas fa-paint-brush text-white text-3xl" />
                      </div>

                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Page Designer
                      </h1>

                      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Advanced visual page designer interface will be
                        implemented here. Create stunning layouts with
                        drag-and-drop components and real-time editing.
                      </p>

                      <div className="flex flex-wrap gap-3 justify-center mb-8">
                        <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          <i className="fas fa-clock mr-2"></i>
                          Coming Soon
                        </span>
                        <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          <i className="fas fa-shield-alt mr-2"></i>
                          Enterprise Ready
                        </span>
                        <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          <i className="fas fa-magic mr-2"></i>
                          Drag & Drop
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="p-6 bg-gray-50 rounded-xl">
                          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-mouse-pointer text-white"></i>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Visual Editor
                          </h3>
                          <p className="text-sm text-gray-600">
                            Drag and drop components to build pages visually
                          </p>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-xl">
                          <div className="h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-mobile-alt text-white"></i>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Responsive
                          </h3>
                          <p className="text-sm text-gray-600">
                            Built-in responsive design tools and preview
                          </p>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-xl">
                          <div className="h-12 w-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-bolt text-white"></i>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Real-time
                          </h3>
                          <p className="text-sm text-gray-600">
                            See changes instantly as you design
                          </p>
                        </div>
                      </div>
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
