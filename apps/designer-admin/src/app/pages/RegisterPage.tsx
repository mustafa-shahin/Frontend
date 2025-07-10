import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RegisterForm, useAuth } from '@frontend/shared';
import type { RegisterFormData } from '@frontend/shared';

export function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, isLoading, error, clearError } = useAuth();

  // Get the intended destination or default to pages
  const from = (location.state as any)?.from?.pathname || '/pages';

  const handleRegister = async (data: RegisterFormData) => {
    try {
      console.log('Attempting registration with:', {
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      await register({
        email: data.email,
        username: data.username,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      console.log('Registration successful, navigating to:', from);

      // Navigate to intended destination after successful registration
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Registration failed:', error);
      // Error will be handled by the RegisterForm component
      throw error;
    }
  };

  const handleSwitchToLogin = () => {
    navigate('/login', { state: { from: location.state?.from } });
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
          Create admin account
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Join the CMS Designer admin platform
        </p>
      </div>

      <RegisterForm
        onSubmit={handleRegister}
        onSwitchToLogin={handleSwitchToLogin}
        isLoading={isLoading}
        error={error}
        showLoginLink={true}
      />
    </div>
  );
}
