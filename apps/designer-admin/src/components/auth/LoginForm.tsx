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

  return (
    <div className={cn('w-full max-w-md mx-auto', className)}>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 px-8 py-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-md">
            <Icon name="paint-brush" className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {t('auth:adminAccess')}
          </h2>
          <p className="text-gray-600">{t('auth:loginToContinue')}</p>
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
                leftIcon={<Icon name="envelope" className="text-gray-400" />}
                autoComplete="email"
                autoFocus
                className="h-12"
              />
            </FormField>

            <FormField name="password" label={t('auth:password')} required>
              <FormInput
                type="password"
                placeholder={t('form:placeholder.password')}
                leftIcon={<Icon name="lock" className="text-gray-400" />}
                autoComplete="current-password"
                className="h-12"
              />
            </FormField>

            <FormField name="rememberMe">
              <FormCheckbox
                label={t('auth:rememberMe')}
                description="Keep me signed in for 7 days"
              />
            </FormField>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={isSubmitting || isLoading}
              className="w-full h-12"
            >
              <Icon name="sign-in-alt" className="mr-2" />
              {t('auth:signIn')}
            </Button>
          </div>
        </Form>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start space-x-3">
            <Icon
              name="info-circle"
              className="text-blue-600 flex-shrink-0 mt-0.5"
            />
            <div>
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                Designer Access Required
              </h3>
              <p className="text-sm text-blue-800">
                This application requires Admin or Developer privileges. Contact
                your system administrator if you need access.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
