import React, { useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { registerSchema, type RegisterFormData } from '../../types/auth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';
import { cn } from '../../utils/cn';

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  onSwitchToLogin?: () => void;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
  showLoginLink?: boolean;
}

export function RegisterForm({
  onSubmit,
  onSwitchToLogin,
  className,
  isLoading = false,
  error,
  showLoginLink = true,
}: RegisterFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<RegisterFormData>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        setSubmitError(null);
        await onSubmit(values);
      } catch (error: any) {
        setSubmitError(
          error?.message || 'Registration failed. Please try again.'
        );
      }
    },
    validateOnBlur: true,
  });

  const displayError = error || submitError;

  return (
    <form
      onSubmit={form.handleSubmit}
      className={cn('space-y-6', className)}
      noValidate
    >
      {displayError && (
        <Alert
          type="error"
          message={displayError}
          onClose={() => setSubmitError(null)}
        />
      )}

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="First name"
            type="text"
            placeholder="Enter your first name"
            value={form.values.firstName}
            onChange={(e) => form.handleChange('firstName', e.target.value)}
            onBlur={() => form.handleBlur('firstName')}
            error={form.touched.firstName ? form.errors.firstName : undefined}
            leftIcon={<i className="fa fa-user" />}
            required
            autoComplete="given-name"
            disabled={isLoading}
          />

          <Input
            label="Last name"
            type="text"
            placeholder="Enter your last name"
            value={form.values.lastName}
            onChange={(e) => form.handleChange('lastName', e.target.value)}
            onBlur={() => form.handleBlur('lastName')}
            error={form.touched.lastName ? form.errors.lastName : undefined}
            leftIcon={<i className="fa fa-user" />}
            required
            autoComplete="family-name"
            disabled={isLoading}
          />
        </div>

        <Input
          label="Username"
          type="text"
          placeholder="Choose a username"
          value={form.values.username}
          onChange={(e) => form.handleChange('username', e.target.value)}
          onBlur={() => form.handleBlur('username')}
          error={form.touched.username ? form.errors.username : undefined}
          leftIcon={<i className="fa fa-user" />}
          required
          autoComplete="username"
          disabled={isLoading}
        />

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
        />

        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          value={form.values.password}
          onChange={(e) => form.handleChange('password', e.target.value)}
          onBlur={() => form.handleBlur('password')}
          error={form.touched.password ? form.errors.password : undefined}
          leftIcon={<i className="fa fa-lock" />}
          required
          autoComplete="new-password"
          disabled={isLoading}
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
          Create account
        </Button>

        {showLoginLink && onSwitchToLogin && (
          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                disabled={isLoading}
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Sign in
              </button>
            </span>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
        By creating an account, you agree to our{' '}
        <a
          href="/terms"
          className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href="/privacy"
          className="text-blue-600 hover:text-blue-500 dark:text-blue-400"
        >
          Privacy Policy
        </a>
      </div>
    </form>
  );
}
