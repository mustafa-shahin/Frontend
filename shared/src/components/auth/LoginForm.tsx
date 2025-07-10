import { useForm } from '../../hooks/useForm';
import { loginSchema, type LoginFormData } from '../../types/auth';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Alert } from '../ui/Alert';
import { cn } from '../../utils/cn';
import { useState } from 'react';

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  onForgotPassword?: () => void;
  onSwitchToRegister?: () => void;
  className?: string;
  isLoading?: boolean;
  error?: string | null;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  showRegisterLink?: boolean;
}

export function LoginForm({
  onSubmit,
  onForgotPassword,
  onSwitchToRegister,
  className,
  isLoading = false,
  error,
  showRememberMe = true,
  showForgotPassword = true,
  showRegisterLink = true,
}: LoginFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setSubmitError(null);
        await onSubmit(values);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Login failed. Please try again.';
        setSubmitError(message);
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
          placeholder="Enter your password"
          value={form.values.password}
          onChange={(e) => form.handleChange('password', e.target.value)}
          onBlur={() => form.handleBlur('password')}
          error={form.touched.password ? form.errors.password : undefined}
          leftIcon={<i className="fa fa-lock" />}
          required
          autoComplete="current-password"
          disabled={isLoading}
        />

        {showRememberMe && (
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={form.values.rememberMe}
              onChange={(e) =>
                form.handleChange('rememberMe', e.target.checked)
              }
              disabled={isLoading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        )}
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
          Sign in
        </Button>

        {showForgotPassword && onForgotPassword && (
          <button
            type="button"
            onClick={onForgotPassword}
            disabled={isLoading}
            className="w-full text-center text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
          >
            Forgot your password?
          </button>
        )}

        {showRegisterLink && onSwitchToRegister && (
          <div className="text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                disabled={isLoading}
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Sign up
              </button>
            </span>
          </div>
        )}
      </div>
    </form>
  );
}
