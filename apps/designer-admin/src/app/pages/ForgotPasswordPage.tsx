import { useNavigate } from 'react-router-dom';
import { ForgotPasswordForm, useAuth } from '@frontend/shared';
import type { ForgotPasswordFormData } from '@frontend/shared';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword, isLoading, error } = useAuth();

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    await forgotPassword(data.email);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

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
