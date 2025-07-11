// shared/src/components/layout/Header.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header
      className={cn(
        'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700',
        'shadow-sm backdrop-blur-sm sticky top-0 z-50',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={onLogoClick}
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded-lg p-2 -m-2 transition-all duration-200"
              aria-label={onLogoClick ? `Go to ${title} homepage` : undefined}
            >
              {logo ? (
                <img src={logo} alt={logoAlt} className="h-8 w-auto" />
              ) : (
                <div className="h-8 w-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
                  <i className="fas fa-paint-brush text-white text-sm" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                  Admin Panel
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          {children && (
            <nav className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center space-x-8">{children}</div>
            </nav>
          )}

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {showLanguageSelector && <LanguageSelector />}

            {showAuth && (
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    {/* User Avatar and Name */}
                    <div className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user?.firstName?.charAt(0)}
                          {user?.lastName?.charAt(0)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {user?.firstName} {user?.lastName}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {user?.roleName}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-800"
                    >
                      <i className="fas fa-sign-out-alt mr-2" />
                      {t('auth:logout')}
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <i className="fas fa-sign-in-alt mr-2" />
                    {t('auth:login')}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-colors duration-200"
              aria-label={t('navigation:mainNavigation')}
            >
              <i
                className={cn(
                  'fas text-lg transition-transform duration-200',
                  isMenuOpen ? 'fa-times rotate-90' : 'fa-bars'
                )}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-4 animate-fade-in">
            <div className="space-y-4">
              {/* Mobile Navigation */}
              {children && (
                <nav className="px-2">
                  <div className="space-y-2">{children}</div>
                </nav>
              )}

              {/* Mobile Language Selector */}
              {showLanguageSelector && (
                <div className="px-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <LanguageSelector />
                </div>
              )}

              {/* Mobile Auth Section */}
              {showAuth && (
                <div className="px-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium">
                            {user?.firstName?.charAt(0)}
                            {user?.lastName?.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user?.firstName} {user?.lastName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {user?.roleName}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="w-full justify-center"
                      >
                        <i className="fas fa-sign-out-alt mr-2" />
                        {t('auth:logout')}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full justify-center"
                    >
                      <i className="fas fa-sign-in-alt mr-2" />
                      {t('auth:login')}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
