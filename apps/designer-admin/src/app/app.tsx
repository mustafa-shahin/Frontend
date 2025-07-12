import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AuthProvider,
  UserRole,
  Header,
  HeaderNavItem,
  Footer,
} from '@frontend/shared';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { LoginPage } from '../pages/LoginPage';
import { PagesListPage } from '../pages/PagesListPage';
import { UnauthorizedPage } from '../pages/UnauthorizedPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import './styles/fontawesome.css';

const REQUIRED_ROLES = [UserRole.Admin, UserRole.Dev];

export function App() {
  const { ready, t } = useTranslation(['navigation']);
  const location = useLocation();
  const navigate = useNavigate();

  // Define navigation items based on current route
  const getNavigationItems = (): HeaderNavItem[] => {
    return [
      {
        name: 'Dashboard',
        href: '/dashboard',
        current: location.pathname === '/dashboard',
        icon: 'tachometer-alt',
      },
      {
        name: 'Pages',
        href: '/pages',
        current: location.pathname.startsWith('/pages'),
        icon: 'file-alt',
        badge: 0, // Could be dynamic based on draft pages count
      },
      {
        name: 'Designer',
        href: '/designer',
        current: location.pathname.startsWith('/designer'),
        icon: 'paint-brush',
      },
      {
        name: 'Media',
        href: '/media',
        current: location.pathname.startsWith('/media'),
        icon: 'images',
      },
      {
        name: 'Settings',
        href: '/settings',
        current: location.pathname.startsWith('/settings'),
        icon: 'cog',
      },
    ];
  };

  const handleNavigationClick = (item: HeaderNavItem) => {
    if (item.href) {
      navigate(item.href);
    }
  };

  const handleLogoClick = () => {
    navigate('/pages');
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          <span className="text-gray-600 font-medium">
            Loading application...
          </span>
        </div>
      </div>
    );
  }

  const isPublicRoute = ['/login', '/unauthorized'].includes(location.pathname);

  return (
    <AuthProvider requiredRoles={REQUIRED_ROLES}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header
          title="CMS Designer Admin"
          navigation={getNavigationItems()}
          showAuth={true}
          showLanguageSelector={true}
          showNotifications={true}
          notificationCount={3} // This could be dynamic
          onLogoClick={handleLogoClick}
          onNavigationClick={handleNavigationClick}
          isLoading={!ready}
        />

        {/* Main Content */}
        <main className={!isPublicRoute ? 'flex-1' : 'min-h-screen'}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRoles={REQUIRED_ROLES}>
                  <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                      <div className="h-20 w-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-md">
                        <i className="fas fa-tachometer-alt text-white text-3xl" />
                      </div>

                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Dashboard
                      </h1>

                      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Welcome to your CMS Designer Admin dashboard. Monitor
                        your content, track performance, and manage your website
                        with powerful analytics and insights.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-file-alt text-white"></i>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Content Management
                          </h3>
                          <p className="text-sm text-gray-600">
                            Create, edit, and manage your website content
                          </p>
                        </div>

                        <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                          <div className="h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-chart-line text-white"></i>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Analytics
                          </h3>
                          <p className="text-sm text-gray-600">
                            Track performance and user engagement
                          </p>
                        </div>

                        <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                          <div className="h-12 w-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-users text-white"></i>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            User Management
                          </h3>
                          <p className="text-sm text-gray-600">
                            Manage users, roles, and permissions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/pages"
              element={
                <ProtectedRoute requiredRoles={REQUIRED_ROLES}>
                  <PagesListPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/designer/:pageId"
              element={
                <ProtectedRoute requiredRoles={REQUIRED_ROLES}>
                  <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                      <div className="h-20 w-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-md">
                        <i className="fas fa-paint-brush text-white text-3xl" />
                      </div>

                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Page Designer
                      </h1>

                      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Advanced visual page designer interface will be
                        implemented here. Create stunning layouts with
                        drag-and-drop components and real-time editing.
                      </p>

                      <div className="flex flex-wrap gap-3 justify-center mb-8">
                        <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          <i className="fas fa-clock mr-2"></i>
                          Coming Soon
                        </span>
                        <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          <i className="fas fa-shield-alt mr-2"></i>
                          Enterprise Ready
                        </span>
                        <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          <i className="fas fa-magic mr-2"></i>
                          Drag & Drop
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="p-6 bg-gray-50 rounded-xl">
                          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-mouse-pointer text-white"></i>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Visual Editor
                          </h3>
                          <p className="text-sm text-gray-600">
                            Drag and drop components to build pages visually
                          </p>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-xl">
                          <div className="h-12 w-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-mobile-alt text-white"></i>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Responsive
                          </h3>
                          <p className="text-sm text-gray-600">
                            Built-in responsive design tools and preview
                          </p>
                        </div>

                        <div className="p-6 bg-gray-50 rounded-xl">
                          <div className="h-12 w-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-bolt text-white"></i>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Real-time
                          </h3>
                          <p className="text-sm text-gray-600">
                            See changes instantly as you design
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/media"
              element={
                <ProtectedRoute requiredRoles={REQUIRED_ROLES}>
                  <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                      <div className="h-20 w-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-md">
                        <i className="fas fa-images text-white text-3xl" />
                      </div>

                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Media Library
                      </h1>

                      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Manage your media assets including images, videos, and
                        documents. Upload, organize, and optimize your content
                        for the web.
                      </p>

                      <div className="flex flex-wrap gap-3 justify-center mb-8">
                        <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          <i className="fas fa-cloud-upload mr-2"></i>
                          Cloud Storage
                        </span>
                        <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          <i className="fas fa-compress mr-2"></i>
                          Auto Optimization
                        </span>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute requiredRoles={REQUIRED_ROLES}>
                  <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12 text-center">
                      <div className="h-20 w-20 bg-gradient-to-br from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-md">
                        <i className="fas fa-cog text-white text-3xl" />
                      </div>

                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        System Settings
                      </h1>

                      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Configure your CMS settings, manage integrations, and
                        customize your workflow to match your organization's
                        needs.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                        <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                          <div className="h-12 w-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-shield-alt text-white"></i>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Security Settings
                          </h3>
                          <p className="text-sm text-gray-600">
                            Configure authentication and security policies
                          </p>
                        </div>

                        <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                          <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-plug text-white"></i>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Integrations
                          </h3>
                          <p className="text-sm text-gray-600">
                            Connect with third-party services and APIs
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* 404 page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
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
            {
              title: t('navigation:legal'),
              links: [
                { label: t('navigation:privacy'), href: '/privacy' },
                { label: t('navigation:terms'), href: '/terms' },
              ],
            },
          ]}
        />
      </div>
    </AuthProvider>
  );
}

export default App;
