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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        title="CMS Designer Admin"
        showAuth={false}
        showLanguageSelector={true}
      />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Branding & Features */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  CMS Designer
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional content management for modern websites. Create,
                manage, and publish content with our enterprise-grade platform.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-paint-brush text-blue-600"></i>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Visual Designer
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-mobile-alt text-green-600"></i>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Responsive Design
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-bolt text-purple-600"></i>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Real-time Preview
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-orange-600"></i>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Team Collaboration
                  </span>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center">
                      <i className="fas fa-shield-alt text-white"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">
                        Enterprise Security
                      </h3>
                      <p className="text-sm text-blue-800">
                        SOC 2 compliant with advanced security features
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Login Form */}
            <div className="flex justify-center lg:justify-end">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>

      <Footer
        title="CMS Designer"
        description="Professional content management for modern websites"
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
