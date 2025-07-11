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
        'bg-white/95 dark:bg-gray-900/95 border-b border-gray-200/20 dark:border-gray-700/30',
        'shadow-lg shadow-gray-200/50 dark:shadow-gray-800/50 backdrop-blur-md sticky top-0 z-50',
        'transition-all duration-300 ease-in-out',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={onLogoClick}
              className="flex items-center gap-3 sm:gap-4 group focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 focus:ring-offset-white/50 dark:focus:ring-offset-gray-900/50 rounded-xl p-2 sm:p-3 -m-2 sm:-m-3 transition-all duration-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
              aria-label={onLogoClick ? `Go to ${title} homepage` : undefined}
            >
              {logo ? (
                <img src={logo} alt={logoAlt} className="h-8 sm:h-10 w-auto" />
              ) : (
                <div className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                  <i className="fas fa-paint-brush text-white text-sm sm:text-lg" />
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {title}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium hidden sm:block">
                  Enterprise Portal
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          {children && (
            <nav className="hidden md:flex flex-1 justify-center">
              <div className="flex items-center space-x-8 bg-gray-50/50 dark:bg-gray-800/30 rounded-xl px-6 py-2 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
                {children}
              </div>
            </nav>
          )}

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            {showLanguageSelector && <LanguageSelector />}

            {showAuth && (
              <div className="flex items-center space-x-6">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    {/* User Avatar and Name */}
                    <div className="flex items-center space-x-4 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200/50 dark:border-gray-600/50 shadow-sm">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                        <span className="text-white text-sm font-bold">
                          {user?.firstName?.charAt(0)}
                          {user?.lastName?.charAt(0)}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {user?.firstName} {user?.lastName}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          {user?.roleName}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:hover:border-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-all duration-300"
                    >
                      <i className="fas fa-sign-out-alt mr-2" />
                      {t('auth:logout')}
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
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
              className="p-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 focus:ring-offset-white/50 dark:focus:ring-offset-gray-900/50 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
              aria-label={t('navigation:mainNavigation')}
            >
              <i
                className={cn(
                  'fas text-lg transition-all duration-300',
                  isMenuOpen ? 'fa-times rotate-180 text-red-500' : 'fa-bars hover:text-blue-600'
                )}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/30 dark:border-gray-700/30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-6 animate-fade-in shadow-lg">
            <div className="space-y-6 px-4">
              {/* Mobile Navigation */}
              {children && (
                <nav className="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-4 border border-gray-200/20 dark:border-gray-700/20">
                  <div className="space-y-3">{children}</div>
                </nav>
              )}

              {/* Mobile Language Selector */}
              {showLanguageSelector && (
                <div className="pt-2 border-t border-gray-200/30 dark:border-gray-700/30">
                  <LanguageSelector />
                </div>
              )}

              {/* Mobile Auth Section */}
              {showAuth && (
                <div className="pt-2 border-t border-gray-200/30 dark:border-gray-700/30">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200/50 dark:border-gray-600/50">
                        <div className="h-12 w-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-white font-bold">
                            {user?.firstName?.charAt(0)}
                            {user?.lastName?.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            {user?.firstName} {user?.lastName}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            {user?.roleName}
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="w-full justify-center border-gray-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-gray-600 dark:hover:border-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-all duration-300"
                      >
                        <i className="fas fa-sign-out-alt mr-2" />
                        {t('auth:logout')}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full justify-center shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
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
