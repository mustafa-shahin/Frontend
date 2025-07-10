import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm, useAuth } from '@frontend/shared';
import type { LoginFormData } from '@frontend/shared';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error, clearError } = useAuth();

  // Get the intended destination or default to pages
  const from = (location.state as any)?.from?.pathname || '/pages';

  const handleLogin = async (data: LoginFormData) => {
    try {
      console.log('Attempting login with:', {
        email: data.email,
        rememberMe: data.rememberMe,
      });

      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      console.log('Login successful, navigating to:', from);

      // Navigate to intended destination after successful login
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
      // Error will be handled by the LoginForm component
      throw error;
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleSwitchToRegister = () => {
    navigate('/register', { state: { from: location.state?.from } });
  };

  // Clear any existing errors when component mounts
  React.useEffect(() => {
    if (error) {
      clearError();
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Sign in to Designer Admin
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Access the CMS Designer admin panel
        </p>
      </div>

      <LoginForm
        onSubmit={handleLogin}
        onForgotPassword={handleForgotPassword}
        onSwitchToRegister={handleSwitchToRegister}
        isLoading={isLoading}
        error={error}
        showRememberMe={true}
        showForgotPassword={true}
        showRegisterLink={true}
      />
    </div>
  );
}
