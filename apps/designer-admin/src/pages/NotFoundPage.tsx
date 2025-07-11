import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Footer } from '@frontend/shared';

export function NotFoundPage() {
  const { t } = useTranslation(['common', 'navigation']);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header
        title="CMS Designer Admin"
        showAuth={true}
        showLanguageSelector={true}
      />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-md">
          <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-6">
            <i className="fas fa-search text-6xl" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            404 - Page Not Found
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="space-y-4">
            <Button
              variant="primary"
              onClick={() => navigate('/pages')}
              className="w-full"
            >
              <i className="fas fa-home mr-2" />
              Go to Pages
            </Button>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full"
            >
              <i className="fas fa-arrow-left mr-2" />
              {t('back')}
            </Button>
          </div>
        </div>
      </main>

      <Footer title="CMS Designer" showCopyright={true} showPoweredBy={true} />
    </div>
  );
}
