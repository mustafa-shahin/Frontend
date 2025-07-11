import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth, Header, Footer } from '@frontend/shared';
import { LoginForm } from '../components/auth/LoginForm';

export function LoginPage() {
  const { t } = useTranslation(['auth', 'navigation']);
  const { isAuthenticated, user } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated && user) {
    return <Navigate to="/pages" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/20 flex flex-col">
      <Header
        title="CMS Designer Admin"
        showAuth={false}
        showLanguageSelector={true}
        className="bg-white/80 dark:bg-gray-900/80"
      />

      <main className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-10 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-4">
              Welcome Back
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Sign in to access your enterprise content management dashboard
            </p>
          </div>
          <LoginForm className="mx-auto" />
        </div>
      </main>

      <Footer
        title="CMS Designer"
        description=""
        showCopyright={true}
        showPoweredBy={true}
        sections={[
          {
            title: t('navigation:help'),
            links: [
              { label: t('navigation:about'), href: '/about' },
              { label: t('navigation:contact'), href: '/contact' },
              { label: t('navigation:help'), href: '/help' },
            ],
          },
        ]}
      />
    </div>
  );
}
