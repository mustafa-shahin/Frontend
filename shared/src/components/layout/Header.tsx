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
        'bg-white dark:bg-gray-900', // Clean background
        'border-b border-gray-100 dark:border-gray-800', // Subtle border
        'shadow-sm', // Light shadow for depth
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {' '}
          {/* Increased height for more breathing room */}
          {/* Logo and Title - Aligned left, with good spacing */}
          <div className="flex items-center flex-shrink-0">
            <button
              onClick={onLogoClick}
              className="flex items-center gap-3 text-gray-900 dark:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 rounded-md"
              aria-label={onLogoClick ? `Go to ${title} homepage` : undefined}
            >
              {logo ? (
                <img src={logo} alt={logoAlt} className="h-10 w-auto" />
              ) : (
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                  {' '}
                  {/* Gradient background for default logo */}
                  <i className="fas fa-paint-brush text-white text-xl" />{' '}
                  {/* Larger, more prominent icon */}
                </div>
              )}
              <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {title}
              </span>
            </button>
          </div>
          {/* Desktop Navigation - Centered for main content */}
          {/* The `children` prop will typically contain navigation links. */}
          <nav className="hidden md:flex flex-grow justify-center items-center">
            {/* Added a flex container with gap for spacing between nav items */}
            <ul className="flex items-center gap-8 text-lg font-medium text-gray-700 dark:text-gray-300">
              {/* Assuming children are li or components that can be styled as such */}
              {children}
            </ul>
          </nav>
          {/* Right-aligned Utility/Auth Section for Desktop */}
          <div className="hidden md:flex items-center gap-6 flex-shrink-0">
            {' '}
            {/* Increased gap for better spacing */}
            {showLanguageSelector && <LanguageSelector />}
            {showAuth && (
              <div className="flex items-center gap-4">
                {' '}
                {/* Good spacing between elements */}
                {isAuthenticated ? (
                  <div className="flex items-center gap-3">
                    <span className="text-base font-medium text-gray-700 dark:text-gray-300">
                      {t('auth:welcomeBack')},{' '}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {user?.firstName}
                      </span>
                    </span>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleLogout}
                      className="rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200" // Pill shape, slightly more padding
                    >
                      <i className="fas fa-sign-out-alt mr-2" />
                      {t('auth:logout')}
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    className="rounded-full px-6 py-2.5 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200" // Pill shape, slightly more padding, subtle shadow
                  >
                    <i className="fas fa-sign-in-alt mr-2" />
                    {t('auth:login')}
                  </Button>
                )}
              </div>
            )}
          </div>
          {/* Mobile menu button - Always visible on mobile, right-aligned */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 transition-colors duration-200"
              aria-label={t('navigation:mainNavigation')}
            >
              <i
                className={cn(
                  'fas text-xl',
                  isMenuOpen ? 'fa-times' : 'fa-bars'
                )}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu - Collapsible, full-width, with distinct sections and better padding */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-6">
            {' '}
            {/* Increased vertical padding */}
            <div className="space-y-6">
              {' '}
              {/* Generous spacing between mobile sections */}
              {/* Children (Navigation Links) */}
              <nav className="px-4">
                {' '}
                {/* Padding for content within sections */}
                <ul className="flex flex-col gap-4 text-base font-medium text-gray-700 dark:text-gray-300">
                  {' '}
                  {/* Vertical layout for links, with spacing */}
                  {children}
                </ul>
              </nav>
              {/* Language Selector */}
              {showLanguageSelector && (
                <div className="px-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  {' '}
                  {/* Clear separation line */}
                  <LanguageSelector />
                </div>
              )}
              {/* Auth Section */}
              {showAuth && (
                <div className="px-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  {' '}
                  {/* Clear separation line */}
                  {isAuthenticated ? (
                    <div className="flex flex-col gap-4">
                      {' '}
                      {/* Vertical layout for auth elements */}
                      <span className="text-base text-gray-700 dark:text-gray-300 font-medium">
                        {t('auth:welcomeBack')},{' '}
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {user?.firstName}
                        </span>
                      </span>
                      <Button
                        variant="outline"
                        size="md"
                        onClick={handleLogout}
                        className="w-full justify-center rounded-full px-5 py-2.5 text-base font-semibold transition-all duration-200"
                      >
                        <i className="fas fa-sign-out-alt mr-2" />
                        {t('auth:logout')}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full justify-center rounded-full px-6 py-2.5 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-200"
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
