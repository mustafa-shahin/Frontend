import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { LanguageSelector } from './LanguageSelector';

export interface HeaderProps {
  logo?: string;
  logoAlt?: string;
  title?: string;
  showAuth?: boolean;
  showLanguageSelector?: boolean;
  className?: string;
  children?: React.ReactNode;
  onLogoClick?: () => void;
}

export function Header({
  logo,
  logoAlt = 'Logo',
  title = 'CMS Designer',
  showAuth = true,
  showLanguageSelector = true,
  className,
  children,
  onLogoClick,
}: HeaderProps) {
  const { t } = useTranslation(['navigation', 'auth']);
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header
      className={cn(
        'bg-white border-b border-gray-100 sticky top-0 z-50',
        'shadow-sm backdrop-blur-sm bg-white/95',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <button
              onClick={onLogoClick}
              className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1 -mx-2 -my-1 transition-all duration-200 hover:bg-gray-50"
              aria-label={onLogoClick ? `Go to ${title} homepage` : undefined}
            >
              {logo ? (
                <img src={logo} alt={logoAlt} className="h-8 w-auto" />
              ) : (
                <div className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-200">
                  <Icon name="palette" className="text-white text-sm" />
                </div>
              )}
              <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {title}
              </span>
            </button>
          </div>

          {/* Center Navigation - Desktop */}
          {children && (
            <nav className="hidden lg:flex flex-1 justify-center max-w-md">
              <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1">
                {children}
              </div>
            </nav>
          )}

          {/* Right Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {showLanguageSelector && <LanguageSelector />}

            {showAuth && isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-semibold text-gray-900">
                      {user?.firstName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user?.roleName}
                    </div>
                  </div>
                  <Icon
                    name="chevron-down"
                    className={cn(
                      'text-gray-400 text-xs transition-transform duration-200',
                      isUserMenuOpen && 'rotate-180'
                    )}
                  />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <>
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="text-sm font-semibold text-gray-900">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {user?.email}
                        </div>
                      </div>
                      <div className="py-1">
                        <a
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <Icon
                            name="user"
                            className="mr-3 text-gray-400 text-sm"
                          />
                          {t('navigation:profile')}
                        </a>
                        <a
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        >
                          <Icon
                            name="cog"
                            className="mr-3 text-gray-400 text-sm"
                          />
                          {t('navigation:settings')}
                        </a>
                      </div>
                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                        >
                          <Icon name="sign-out-alt" className="mr-3 text-sm" />
                          {t('auth:logout')}
                        </button>
                      </div>
                    </div>
                    {/* Backdrop to close dropdown */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                  </>
                )}
              </div>
            ) : (
              showAuth && (
                <Button variant="primary" size="sm" className="shadow-sm">
                  <Icon name="sign-in-alt" className="mr-2 text-xs" />
                  {t('auth:login')}
                </Button>
              )
            )}
          </div>

          {/* Mobile Section - Only show on small/medium screens */}
          <div className="lg:hidden flex items-center space-x-3">
            {showLanguageSelector && <LanguageSelector />}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              aria-label={t('navigation:mainNavigation')}
            >
              <Icon name={isMenuOpen ? 'times' : 'bars'} className="text-lg" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 bg-white">
            <div className="space-y-4">
              {children && <nav className="space-y-1">{children}</nav>}

              {showAuth && isAuthenticated && (
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
                    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {user?.firstName?.charAt(0)}
                        {user?.lastName?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{user?.email}</div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <a
                      href="/profile"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                    >
                      <Icon
                        name="user"
                        className="mr-3 text-gray-400 text-sm"
                      />
                      {t('navigation:profile')}
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                    >
                      <Icon name="cog" className="mr-3 text-gray-400 text-sm" />
                      {t('navigation:settings')}
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                    >
                      <Icon name="sign-out-alt" className="mr-3 text-sm" />
                      {t('auth:logout')}
                    </button>
                  </div>
                </div>
              )}

              {showAuth && !isAuthenticated && (
                <div className="pt-4 border-t border-gray-100">
                  <Button variant="primary" size="sm" className="w-full">
                    <Icon name="sign-in-alt" className="mr-2 text-xs" />
                    {t('auth:login')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
