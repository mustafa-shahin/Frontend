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
        'bg-white shadow-sm border-b border-gray-200',
        'dark:bg-gray-900 dark:border-gray-700',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <button
              onClick={onLogoClick}
              className="flex items-center space-x-3 text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              {logo ? (
                <img src={logo} alt={logoAlt} className="h-8 w-auto" />
              ) : (
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="fas fa-paint-brush text-white text-sm" />
                </div>
              )}
              <span className="text-xl font-bold">{title}</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {children}

            {showLanguageSelector && <LanguageSelector />}

            {showAuth && (
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {t('auth:welcomeBack')}, {user?.firstName}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleLogout}
                      className="text-sm"
                    >
                      <i className="fas fa-sign-out-alt mr-2" />
                      {t('auth:logout')}
                    </Button>
                  </div>
                ) : (
                  <Button variant="primary" size="sm">
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
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label={t('navigation:mainNavigation')}
            >
              <i className={cn('fas', isMenuOpen ? 'fa-times' : 'fa-bars')} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="space-y-3">
              {children}

              {showLanguageSelector && (
                <div className="px-2">
                  <LanguageSelector />
                </div>
              )}

              {showAuth && (
                <div className="px-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                  {isAuthenticated ? (
                    <div className="space-y-2">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {t('auth:welcomeBack')}, {user?.firstName}
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
