import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth, Header, Footer } from '@frontend/shared';
import { useTranslation } from '@frontend/shared';

export function MainLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleUserMenuClick = () => {
    // Navigate to profile page or open profile modal
    console.log('User menu clicked');
  };

  const headerUser = user
    ? {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.roleName,
        pictureUrl: user.pictureUrl,
      }
    : undefined;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header
        showLogo={true}
        logoText={t('header.title')}
        user={headerUser}
        onUserMenuClick={handleUserMenuClick}
        onLogout={handleLogout}
        variant="default"
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
        className="border-t border-border-light bg-surface"
      />
    </div>
  );
}
