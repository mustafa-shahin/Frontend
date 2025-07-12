import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultValues } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormInput,
  FormCheckbox,
  Button,
  Alert,
  useAuth,
  cn,
  Icon,
  LoadingSpinner,
} from '@frontend/shared';

const createLoginSchema = (t: any) =>
  z.object({
    email: z
      .string()
      .min(1, t('form:validation.required'))
      .email(t('form:validation.email')),
    password: z.string().min(1, t('form:validation.required')),
    rememberMe: z.boolean().optional(),
  });

type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;

export interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const { t } = useTranslation(['auth', 'form', 'common']);
  const { login, isLoading, error, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginSchema = createLoginSchema(t);

  const handleSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      clearError();

      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe || false,
      });
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loading = isSubmitting || isLoading;

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 px-8 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-md">
            {loading ? (
              <LoadingSpinner size="md" color="white" />
            ) : (
              <Icon name="paint-brush" className="text-white text-2xl" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('auth:adminAccess')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('auth:loginToContinue')}
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6">
            <Alert type="error" message={error} onClose={clearError} />
          </div>
        )}

        {/* Login Form */}
        <Form
          schema={loginSchema}
          onSubmit={handleSubmit}
          defaultValues={
            {
              email: '',
              password: '',
              rememberMe: false,
            } as DefaultValues<LoginFormData>
          }
        >
          <div className="space-y-6">
            <FormField name="email" label={t('auth:email')} required>
              <FormInput
                type="email"
                placeholder={t('form:placeholder.email')}
                leftIcon="envelope"
                autoComplete="email"
                autoFocus
                inputSize="lg"
                disabled={loading}
                clearable
              />
            </FormField>

            <FormField name="password" label={t('auth:password')} required>
              <FormInput
                type="password"
                placeholder={t('form:placeholder.password')}
                leftIcon="lock"
                autoComplete="current-password"
                inputSize="lg"
                disabled={loading}
              />
            </FormField>

            <FormField name="rememberMe">
              <FormCheckbox
                label={t('auth:rememberMe')}
                description="Keep me signed in for 7 days"
                disabled={loading}
              />
            </FormField>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full h-12"
            >
              <Icon name="sign-in-alt" className="mr-2" />
              {t('auth:signIn')}
            </Button>
          </div>
        </Form>

        {/* Forgot Password Link */}
        <div className="mt-6 text-center">
          <button
            type="button"
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            disabled={loading}
          >
            {t('auth:forgotPassword')}
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <Icon
              name="info-circle"
              className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
            />
            <div>
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
                Designer Access Required
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                This application requires Admin or Developer privileges. Contact
                your system administrator if you need access.
              </p>
            </div>
          </div>
        </div>

        {/* Demo Credentials (for development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start space-x-3">
              <Icon
                name="lightbulb"
                className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"
              />
              <div>
                <h3 className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
                  Development Mode
                </h3>
                <p className="text-sm text-yellow-800 dark:text-yellow-300 mb-2">
                  Demo credentials for testing:
                </p>
                <div className="text-xs text-yellow-700 dark:text-yellow-400 font-mono">
                  Email: admin@example.com
                  <br />
                  Password: Demo123!
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
