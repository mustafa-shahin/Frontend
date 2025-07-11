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

// Export Layout components
export { Header } from './components/layout/Header';
export { Footer } from './components/layout/Footer';

// Export hooks
export { useForm } from './hooks/useForm';
export { useLocalStorage } from './hooks/useLocalStorage';
export { usePages } from './hooks/usePages';
export { useTranslation } from './hooks/useTranslation';

// Export utilities
export { cn } from './utils/cn';
export { validateEmail, validatePassword } from './utils/validation';
export { getCurrentTheme } from './utils/theme';
export { initializeTheme, setTheme } from './utils/theme';

// Export i18n
export { default as i18n } from './utils/i18n';

// Export Pages components
export { PagesList } from './components/pages/PagesList';
export { PagesCard } from './components/pages/PagesCard';
export { PagesFilters } from './components/pages/PagesFilters';
export { PagesPagination } from './components/pages/PagesPagination';
export type { PageItem } from './components/pages/PagesList';
