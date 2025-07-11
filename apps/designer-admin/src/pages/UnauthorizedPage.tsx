import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Footer } from '@frontend/shared';

export function UnauthorizedPage() {
  const { t } = useTranslation(['auth', 'navigation', 'common']);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/20 to-orange-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-red-950/10 flex flex-col">
      <Header
        title="CMS Designer Admin"
        showAuth={false}
        showLanguageSelector={true}
        className="bg-white/90 dark:bg-gray-900/90"
      />

      <main className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-10 py-12">
        <div className="enterprise-card p-12 text-center max-w-lg w-full">
          <div className="mx-auto h-24 w-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
            <i className="fas fa-shield-alt text-white text-4xl" />
          </div>

          <h1 className="text-4xl font-bold gradient-text mb-6">
            {t('auth:accessDenied')}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-10 leading-relaxed">
            You don't have permission to access this application. Admin or Developer role is required for enterprise access.
          </p>

          <div className="space-y-4">
            <Button
              variant="primary"
              onClick={() => navigate('/login')}
              className="w-full"
            >
              <i className="fas fa-sign-in-alt mr-3" />
              {t('auth:login')}
            </Button>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full"
            >
              <i className="fas fa-arrow-left mr-3" />
              {t('common:back')}
            </Button>
          </div>
        </div>
      </main>

      <Footer title="CMS Designer" showCopyright={true} showPoweredBy={true} />
    </div>
  );
}
