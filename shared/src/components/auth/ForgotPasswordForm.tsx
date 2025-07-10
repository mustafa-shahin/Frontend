import { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '../../types/auth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';
import { cn } from '../../utils/cn';

export interface ForgotPasswordFormProps {
  onSubmit: (data: ForgotPasswordFormData) => Promise<void>;
  onBackToLogin?: () => void;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
  showBackToLogin?: boolean;
}

export function ForgotPasswordForm({
  onSubmit,
  onBackToLogin,
  className,
  isLoading = false,
  error,
  showBackToLogin = true,
}: ForgotPasswordFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        setSubmitError(null);
        await onSubmit(values);
        setIsSuccess(true);
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to send reset email. Please try again.';
        setSubmitError(message);
      }
    },
    validateOnBlur: true,
  });

  const displayError = error || submitError;

  if (isSuccess) {
    return (
      <div className={cn('space-y-6 text-center', className)}>
        <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
          <i className="fa fa-check text-2xl text-green-600 dark:text-green-400" />
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Check your email
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If an account with that email exists, we've sent you a password
            reset link.
          </p>
        </div>

        <Alert
          type="info"
          message="Didn't receive the email? Check your spam folder or try again in a few minutes."
        />

        {showBackToLogin && onBackToLogin && (
          <Button
            type="button"
            variant="outline"
            onClick={onBackToLogin}
            className="w-full"
          >
            <i className="fa fa-arrow-left mr-2" />
            Back to sign in
          </Button>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit}
      className={cn('space-y-6', className)}
      noValidate
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Forgot your password?
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      {displayError && (
        <Alert
          type="error"
          message={displayError}
          onClose={() => setSubmitError(null)}
        />
      )}

      <div className="space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="Enter your email"
          value={form.values.email}
          onChange={(e) => form.handleChange('email', e.target.value)}
          onBlur={() => form.handleBlur('email')}
          error={form.touched.email ? form.errors.email : undefined}
          leftIcon={<i className="fa fa-envelope" />}
          required
          autoComplete="email"
          disabled={isLoading}
          autoFocus
        />
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading || form.isSubmitting}
          disabled={!form.isValid && Object.keys(form.touched).length > 0}
          className="w-full"
        >
          Send reset email
        </Button>

        {showBackToLogin && onBackToLogin && (
          <Button
            type="button"
            variant="ghost"
            onClick={onBackToLogin}
            disabled={isLoading}
            className="w-full"
          >
            <i className="fa fa-arrow-left mr-2" />
            Back to sign in
          </Button>
        )}
      </div>
    </form>
  );
}
