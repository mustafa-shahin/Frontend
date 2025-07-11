import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Footer } from '@frontend/shared';

export function NotFoundPage() {
  const { t } = useTranslation(['common', 'navigation']);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/10 flex flex-col">
      <Header
        title="CMS Designer Admin"
        showAuth={true}
        showLanguageSelector={true}
        className="bg-white/90 dark:bg-gray-900/90"
      />

      <main className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-10 py-12">
        <div className="enterprise-card p-12 text-center max-w-lg w-full">
          <div className="mx-auto h-24 w-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
            <i className="fas fa-search text-white text-4xl" />
          </div>

          <h1 className="text-4xl font-bold gradient-text mb-6">
            404 - Page Not Found
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium mb-10 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="space-y-4">
            <Button
              variant="primary"
              onClick={() => navigate('/pages')}
              className="w-full"
            >
              <i className="fas fa-home mr-3" />
              Go to Pages
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
