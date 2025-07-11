import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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

const loginSchema = z.object({
  email: z
    .string()
    .email('form:validation.email')
    .min(1, 'form:validation.required'),
  password: z.string().min(1, 'form:validation.required'),
  rememberMe: z.boolean().optional().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className }: LoginFormProps) {
  const { t } = useTranslation(['auth', 'form', 'common']);
  const { login, isLoading, error, clearError } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      clearError();

      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
    } catch (err) {
      // Error is handled by AuthContext
      console.error('Login failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn('w-full max-w-md', className)}>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg px-8 py-6">
        <div className="text-center mb-6">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <i className="fas fa-paint-brush text-white text-xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('auth:adminAccess')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('auth:loginToContinue')}
          </p>
        </div>

        {error && (
          <Alert
            type="error"
            message={error}
            onClose={clearError}
            className="mb-6"
          />
        )}

        <Form
          schema={loginSchema}
          onSubmit={handleSubmit}
          defaultValues={{
            email: '',
            password: '',
            rememberMe: false,
          }}
        >
          <FormField name="email" label={t('auth:email')} required>
            <FormInput
              type="email"
              placeholder={t('form:placeholder.email')}
              leftIcon={<i className="fas fa-envelope" />}
              autoComplete="email"
              autoFocus
            />
          </FormField>

          <FormField name="password" label={t('auth:password')} required>
            <FormInput
              type="password"
              placeholder={t('form:placeholder.password')}
              autoComplete="current-password"
            />
          </FormField>

          <FormField name="rememberMe">
            <FormCheckbox
              label={t('auth:rememberMe')}
              description="Keep me signed in for 7 days"
            />
          </FormField>

          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting || isLoading}
              className="w-full"
            >
              <i className="fas fa-sign-in-alt mr-2" />
              {t('auth:signIn')}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
