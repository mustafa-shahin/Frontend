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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header
        title="CMS Designer Admin"
        showAuth={false}
        showLanguageSelector={true}
      />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <LoginForm />
      </main>

      <Footer
        title="CMS Designer"
        description="Professional content management for modern websites."
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
