import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Footer } from '@frontend/shared';

export function UnauthorizedPage() {
  const { t } = useTranslation(['auth', 'navigation', 'common']);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        title="CMS Designer Admin"
        showAuth={false}
        showLanguageSelector={true}
        onLogoClick={() => navigate('/login')}
      />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12">
            <div className="mx-auto h-20 w-20 bg-red-100 rounded-2xl flex items-center justify-center mb-8">
              <i className="fas fa-shield-alt text-red-600 text-3xl" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('auth:accessDenied')}
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              You don't have permission to access this application. Admin or
              Developer role is required for enterprise access.
            </p>

            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={() => navigate('/login')}
                className="w-full justify-center"
              >
                <i className="fas fa-sign-in-alt mr-2" />
                {t('auth:login')}
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

            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start space-x-3">
                <i className="fas fa-info-circle text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-blue-900 mb-1">
                    Need Access?
                  </h3>
                  <p className="text-sm text-blue-800">
                    Contact your system administrator to request Admin or
                    Developer privileges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer title="CMS Designer" showCopyright={true} showPoweredBy={true} />
    </div>
  );
}
