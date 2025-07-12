import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Footer } from '@frontend/shared';

export function NotFoundPage() {
  const { t } = useTranslation(['common', 'navigation']);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        title="CMS Designer Admin"
        showAuth={true}
        showLanguageSelector={true}
        onLogoClick={() => navigate('/pages')}
      />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12">
            <div className="mx-auto h-20 w-20 bg-orange-100 rounded-2xl flex items-center justify-center mb-8">
              <i className="fas fa-search text-orange-600 text-3xl" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              404 - Page Not Found
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Let's
              get you back on track.
            </p>

            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={() => navigate('/pages')}
                className="w-full justify-center"
              >
                <i className="fas fa-home mr-2" />
                Go to Pages
              </Button>

              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="w-full justify-center"
              >
                <i className="fas fa-arrow-left mr-2" />
                {t('common:back')}
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer title="CMS Designer" showCopyright={true} showPoweredBy={true} />
    </div>
  );
}
