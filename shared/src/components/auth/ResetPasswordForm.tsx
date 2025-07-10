import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from '../../types/auth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';
import { cn } from '../../utils/cn';

export interface ResetPasswordFormProps {
  token: string;
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  onBackToLogin?: () => void;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
  showBackToLogin?: boolean;
}

export function ResetPasswordForm({
  token,
  onSubmit,
  onBackToLogin,
  className,
  isLoading = false,
  error,
  showBackToLogin = true,
}: ResetPasswordFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    initialValues: {
      token,
      newPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {
        setSubmitError(null);
        await onSubmit(values);
        setIsSuccess(true);
      } catch (error: any) {
        setSubmitError(
          error?.message || 'Failed to reset password. Please try again.'
        );
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
            Password reset successful
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your password has been successfully reset. You can now sign in with
            your new password.
          </p>
        </div>

        {showBackToLogin && onBackToLogin && (
          <Button
            type="button"
            variant="primary"
            onClick={onBackToLogin}
            className="w-full"
          >
            Sign in to your account
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
          Reset your password
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Enter your new password below.
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
          label="New password"
          type="password"
          placeholder="Enter your new password"
          value={form.values.newPassword}
          onChange={(e) => form.handleChange('newPassword', e.target.value)}
          onBlur={() => form.handleBlur('newPassword')}
          error={form.touched.newPassword ? form.errors.newPassword : undefined}
          leftIcon={<i className="fa fa-lock" />}
          required
          autoComplete="new-password"
          disabled={isLoading}
          autoFocus
          helperText="Password must be at least 8 characters with uppercase, lowercase, and number"
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
          Reset password
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
