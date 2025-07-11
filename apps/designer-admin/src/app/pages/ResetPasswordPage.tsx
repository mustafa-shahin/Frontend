import { useNavigate, useSearchParams } from 'react-router-dom';
import { ResetPasswordForm, useAuth } from '@frontend/shared';
import type { ResetPasswordFormData } from '@frontend/shared';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { resetPassword, isLoading, error } = useAuth();

  const token = searchParams.get('token') || '';

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    await resetPassword({
      token: data.token,
      newPassword: data.newPassword,
    });
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (!token) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
          <i className="fa fa-exclamation-triangle text-2xl text-red-600 dark:text-red-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Invalid Reset Link
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            The password reset link is invalid or has expired.
          </p>
        </div>
        <button
          onClick={handleBackToLogin}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200"
        >
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ResetPasswordForm
        token={token}
        onSubmit={handleResetPassword}
        onBackToLogin={handleBackToLogin}
        isLoading={isLoading}
        error={error}
        showBackToLogin={true}
      />
    </div>
  );
}
