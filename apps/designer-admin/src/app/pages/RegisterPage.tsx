import { useNavigate, useLocation } from 'react-router-dom';
import { RegisterForm, useAuth } from '@frontend/shared';
import type { RegisterFormData } from '@frontend/shared';

export function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, isLoading, error } = useAuth();

  // Get the intended destination or default to pages
  const from = (location.state as any)?.from?.pathname || '/pages';

  const handleRegister = async (data: RegisterFormData) => {
    await register({
      email: data.email,
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    // Navigate to intended destination after successful registration
    navigate(from, { replace: true });
  };

  const handleSwitchToLogin = () => {
    navigate('/login', { state: { from: location.state?.from } });
  };

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
