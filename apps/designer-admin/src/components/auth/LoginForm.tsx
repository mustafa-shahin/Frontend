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
} from '@frontend/shared';
import { cn } from '@frontend/shared';

const createLoginSchema = (t: any) => z.object({
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
      // Error is handled by AuthContext
      console.error('Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('w-full max-w-sm sm:max-w-md lg:max-w-lg', className)}>
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl shadow-gray-200/50 dark:shadow-gray-900/50 rounded-xl sm:rounded-2xl px-6 sm:px-8 lg:px-10 py-6 sm:py-8 border border-gray-200/20 dark:border-gray-700/20">
        <div className="text-center mb-6 sm:mb-8">
          <div className="mx-auto h-12 w-12 sm:h-16 sm:w-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
            <i className="fas fa-paint-brush text-white text-lg sm:text-2xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            {t('auth:adminAccess')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
            {t('auth:loginToContinue')}
          </p>
        </div>

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={clearError}
            className="mb-6 sm:mb-8 rounded-xl"
          />
        )}

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
          <div className="space-y-5 sm:space-y-6">
            <FormField name="email" label={t('auth:email')} required>
              <FormInput
                type="email"
                placeholder={t('form:placeholder.email')}
                leftIcon={<i className="fas fa-envelope text-gray-400" />}
                autoComplete="email"
                autoFocus
                className="h-11 sm:h-12 rounded-lg sm:rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 bg-gray-50/50 dark:bg-gray-700/50 transition-all duration-300"
              />
            </FormField>

            <FormField name="password" label={t('auth:password')} required>
              <FormInput
                type="password"
                placeholder={t('form:placeholder.password')}
                leftIcon={<i className="fas fa-lock text-gray-400" />}
                autoComplete="current-password"
                className="h-11 sm:h-12 rounded-lg sm:rounded-xl border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 bg-gray-50/50 dark:bg-gray-700/50 transition-all duration-300"
              />
            </FormField>

            <FormField name="rememberMe">
              <FormCheckbox
                label={t('auth:rememberMe')}
                description="Keep me signed in for 7 days"
                className="text-xs sm:text-sm text-gray-600 dark:text-gray-400"
              />
            </FormField>

            <div className="pt-3 sm:pt-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={isSubmitting || isLoading}
                className="w-full h-11 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] text-sm sm:text-base"
              >
                <i className="fas fa-sign-in-alt mr-2 sm:mr-3" />
                {t('auth:signIn')}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}
