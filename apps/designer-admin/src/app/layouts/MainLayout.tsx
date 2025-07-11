import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth, Header, Footer } from '@frontend/shared';
import { useTranslation } from '@frontend/shared';

export function MainLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { t, changeLanguage, currentLanguage } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const headerUser = user
    ? {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.roleName,
        pictureUrl: user.pictureUrl,
      }
    : undefined;

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'en' ? 'de' : 'en';
    changeLanguage(newLanguage);
  };

  const headerActions = (
    <div className="flex items-center gap-2">
      <button
        onClick={handleLanguageChange}
        className="px-3 py-1.5 text-sm bg-white/10 hover:bg-white/20 text-slate-600 hover:text-slate-900 rounded-md transition-colors duration-200 border border-slate-200 hover:border-slate-300"
        title={
          currentLanguage === 'en' ? 'Switch to German' : 'Switch to English'
        }
      >
        {currentLanguage === 'en' ? 'DE' : 'EN'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <Header
        showLogo={true}
        logoText={t('header.title')}
        user={headerUser}
        onLogout={handleLogout}
        variant="default"
        actions={headerActions}
      />

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer
        companyName="CMS Designer"
        variant="minimal"
        showPoweredBy={true}
        poweredByText={t('footer.poweredBy')}
        className="mt-auto bg-white border-t border-slate-200"
      />
    </div>
  );
}
