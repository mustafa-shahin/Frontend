import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ForgotPasswordForm, useAuth } from '@frontend/shared';
import type { ForgotPasswordFormData } from '@frontend/shared';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword, isLoading, error, clearError } = useAuth();

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    try {
      console.log('Attempting password reset for:', data.email);
      await forgotPassword(data.email);
      console.log('Password reset email sent successfully');
    } catch (error) {
      console.error('Password reset failed:', error);
      // Error will be handled by the ForgotPasswordForm component
      throw error;
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  // Clear any existing errors when component mounts
  React.useEffect(() => {
    if (error) {
      clearError();
    }
  }, []);

  return (
    <div className="space-y-6">
      <ForgotPasswordForm
        onSubmit={handleForgotPassword}
        onBackToLogin={handleBackToLogin}
        isLoading={isLoading}
        error={error}
        showBackToLogin={true}
      />
    </div>
  );
}
