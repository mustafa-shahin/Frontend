// Export all auth types
export * from './types/auth';

// Export API service
export { apiService, ApiService } from './services/api';

export { AuthProvider, useAuth } from './contexts/AuthContext';
export { LoginForm } from './components/auth/LoginForm';
export { RegisterForm } from './components/auth/RegisterForm';
export { ForgotPasswordForm } from './components/auth/ForgotPasswordForm';
export { ResetPasswordForm } from './components/auth/ResetPasswordForm';
export { ProtectedRoute } from './components/auth/ProtectedRoute';

// Export UI components
export { Button } from './components/ui/Button';
export { Input } from './components/ui/Input';
export { Alert } from './components/ui/Alert';
export { Card } from './components/ui/Card';
export { LoadingSpinner } from './components/ui/LoadingSpinner';
export { Icon } from './components/ui/Icon';

// Export hooks
export { useForm } from './hooks/useForm';
export { useLocalStorage } from './hooks/useLocalStorage';
export { usePages } from './hooks/usePages';

// Export utilities
export { cn } from './utils/cn';
export { validateEmail, validatePassword } from './utils/validation';
export { getCurrentTheme } from './utils/theme';
export { initializeTheme, setTheme } from './utils/theme';

export { PagesList } from './components/pages/PagesList';
export type { PageItem } from './components/pages/PagesList';
