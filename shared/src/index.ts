// Export API service
export { apiService, ApiService } from './services/api';
export { pagesService, PagesService } from './services/pages';

export { AuthProvider, useAuth } from './contexts/AuthContext';

// Export UI components
export { Button } from './components/ui/Button';
export { Input } from './components/ui/Input';
export { Alert } from './components/ui/Alert';
export { LoadingSpinner } from './components/ui/LoadingSpinner';
export { Icon } from './components/ui/Icon';

// Export layout components
export { Header } from './components/layout/Header';
export { Footer } from './components/layout/Footer';
export { LanguageSelector } from './components/layout/LanguageSelector';

// Export form components
export { Form } from './components/form/Form';
export { FormField } from './components/form/FormField';
export { FormInput } from './components/form/FormInput';
export { FormSelect } from './components/form/FormSelect';
export { FormCheckbox } from './components/form/FormCheckbox';
export { FormTextarea } from './components/form/FormTextarea';

// Export page components
export { PageTable } from './components/pages/PageTable';
export { PageFilters } from './components/pages/PageFilters';
export { Pagination } from './components/pages/Pagination';

// Export error components
export { ErrorBoundary } from './components/error/ErrorBoundary';
export { AsyncErrorBoundary } from './components/error/AsyncErrorBoundary';

// Export hooks
export { useLocalStorage } from './hooks/useLocalStorage';
export { usePages } from './hooks/usePages';
export { useDebounce } from './hooks/useDebounce';
export { useToggle } from './hooks/useToggle';
export { useAsync } from './hooks/useAsync';
export { useErrorBoundary } from './hooks/useErrorBoundary';

// Export schemas
export * from './schemas/auth';
export * from './schemas/pages';
export * from './schemas/common';

// Export utilities
export { cn } from './utils/cn';
export { validateEmail, validatePassword } from './utils/validation';
export { getCurrentTheme } from './utils/theme';
export { initializeTheme, setTheme } from './utils/theme';
export * from './utils/constants';
export * from './utils/formatters';
export { debounce, throttle } from './utils/debounce';
export { storageService } from './utils/storage';

// Export i18n
export { default as i18n } from './i18n';

// Re-export commonly used types from react-hook-form and zod
export type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';
export type { ZodSchema, ZodTypeAny } from 'zod';
