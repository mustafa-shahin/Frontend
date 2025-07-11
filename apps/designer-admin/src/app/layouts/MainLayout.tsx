import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth, Header, Footer } from '@frontend/shared';

export function MainLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header
        title="Page Management"
        subtitle="Manage your website pages and content"
        user={headerUser}
        onLogout={handleLogout}
        logoText="CMS Designer Admin"
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
        poweredByText="CMS Designer"
        className="mt-auto"
      />
    </div>
  );
}
