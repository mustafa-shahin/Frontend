import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute } from '@frontend/shared';
import { UserRole } from '@frontend/shared';
import { AuthLayout } from './layouts/AuthLayout';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { PagesPage } from './pages/PagesPage';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/fontawesome.css';

const REQUIRED_ROLES = [UserRole.Admin, UserRole.Dev];

export function App() {
  return (
    <ErrorBoundary>
      <AuthProvider requiredRoles={REQUIRED_ROLES}>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Authentication routes */}
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <LoginPage />
                </AuthLayout>
              }
            />
            <Route
              path="/register"
              element={
                <AuthLayout>
                  <RegisterPage />
                </AuthLayout>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <AuthLayout>
                  <ForgotPasswordPage />
                </AuthLayout>
              }
            />
            <Route
              path="/reset-password"
              element={
                <AuthLayout>
                  <ResetPasswordPage />
                </AuthLayout>
              }
            />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute requiredRoles={REQUIRED_ROLES}>
                  <MainLayout />
                </ProtectedRoute>
              }
            >
              {/* Redirect root to pages */}
              <Route index element={<Navigate to="/pages" replace />} />

              {/* Pages management - the only route */}
              <Route path="pages" element={<PagesPage />} />
            </Route>

            {/* Catch all route - redirect to pages */}
            <Route path="*" element={<Navigate to="/pages" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
