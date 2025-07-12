import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { LanguageSelector } from './LanguageSelector';

export interface HeaderNavItem {
  name: string;
  href: string;
  current?: boolean;
  icon?: string;
  disabled?: boolean;
  badge?: number;
}

export interface HeaderProps {
  logo?: string;
  logoAlt?: string;
  title?: string;
  navigation?: HeaderNavItem[];
  showAuth?: boolean;
  showLanguageSelector?: boolean;
  showNotifications?: boolean;
  className?: string;
  onLogoClick?: () => void;
  onNavigationClick?: (item: HeaderNavItem) => void;
  notificationCount?: number;
  isLoading?: boolean;
}

export function Header({
  logo,
  logoAlt = 'Logo',
  title = 'CMS Designer',
  navigation = [],
  showAuth = true,
  showLanguageSelector = true,
  showNotifications = false,
  className,
  onLogoClick,
  onNavigationClick,
  notificationCount = 0,
  isLoading = false,
}: HeaderProps) {
  const { t } = useTranslation(['navigation', 'auth']);
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleNavigationClick = (item: HeaderNavItem) => {
    if (item.disabled) return;
    onNavigationClick?.(item);
    setIsMobileMenuOpen(false);
  };

  const renderUserInitials = () => {
    if (!user?.firstName || !user?.lastName) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  return (
    <header
      className={cn(
        'bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50',
        'border-b border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {/* Upper Header Section */}
      <div className="border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <button
                onClick={onLogoClick}
                className={cn(
                  'flex items-center space-x-3 group focus:outline-none',
                  'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg',
                  'px-2 py-1 -mx-2 -my-1 transition-all duration-200',
                  onLogoClick && 'hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
                disabled={isLoading}
                aria-label={onLogoClick ? `Go to ${title} homepage` : undefined}
              >
                {isLoading ? (
                  <div className="h-9 w-9 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : logo ? (
                  <img src={logo} alt={logoAlt} className="h-9 w-auto" />
                ) : (
                  <div className="h-9 w-9 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-200">
                    <Icon name="palette" className="text-white text-sm" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {title}
                  </span>
                  {isLoading && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {t('common:loading')}
                    </span>
                  )}
                </div>
              </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Language Selector - Desktop */}
              {showLanguageSelector && (
                <div className="hidden md:block">
                  <LanguageSelector />
                </div>
              )}

              {/* User Menu - Desktop */}
              {showAuth && isAuthenticated ? (
                <div className="hidden md:block relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={cn(
                      'flex items-center space-x-3 px-3 py-2 rounded-lg',
                      'hover:bg-gray-50 dark:hover:bg-gray-800',
                      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                      'transition-all duration-200 max-w-xs'
                    )}
                  >
                    <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-semibold">
                        {renderUserInitials()}
                      </span>
                    </div>
                    <div className="hidden lg:block text-left min-w-0">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {user?.firstName} {user?.lastName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.roleName}
                      </div>
                    </div>
                    <Icon
                      name="chevron-down"
                      className={cn(
                        'text-gray-400 text-xs transition-transform duration-200 flex-shrink-0',
                        isUserMenuOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {user?.firstName} {user?.lastName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {user?.email}
                        </div>
                      </div>
                      <div className="py-1">
                        <a
                          href="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                        >
                          <Icon
                            name="user"
                            className="mr-3 text-gray-400 text-sm"
                          />
                          {t('navigation:profile')}
                        </a>
                        <a
                          href="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                        >
                          <Icon
                            name="cog"
                            className="mr-3 text-gray-400 text-sm"
                          />
                          {t('navigation:settings')}
                        </a>
                      </div>
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
                        >
                          <Icon name="sign-out-alt" className="mr-3 text-sm" />
                          {t('auth:logout')}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                showAuth &&
                !isLoading && (
                  <div className="hidden md:block">
                    <Button variant="primary" size="sm" className="shadow-sm">
                      <Icon name="sign-in-alt" className="mr-2 text-xs" />
                      {t('auth:login')}
                    </Button>
                  </div>
                )
              )}

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                  aria-label={t('navigation:mainNavigation')}
                >
                  <Icon
                    name={isMobileMenuOpen ? 'times' : 'bars'}
                    className="text-lg"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Navigation Section */}
      {navigation.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex space-x-1 py-2"
              aria-label="Main navigation"
            >
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigationClick(item)}
                  disabled={item.disabled || isLoading}
                  className={cn(
                    'flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    item.current
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200 dark:border-gray-600'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
                    item.disabled && 'opacity-50 cursor-not-allowed',
                    !item.disabled && 'hover:shadow-sm'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.icon && (
                    <Icon name={item.icon} className="mr-2 text-sm" />
                  )}
                  {item.name}
                  {item.badge && item.badge > 0 && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Navigation */}
            {navigation.length > 0 && (
              <nav className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t('navigation:mainNavigation')}
                </h3>
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigationClick(item)}
                    disabled={item.disabled || isLoading}
                    className={cn(
                      'flex items-center w-full px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-150',
                      item.current
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800',
                      item.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {item.icon && (
                      <Icon name={item.icon} className="mr-3 text-sm" />
                    )}
                    {item.name}
                    {item.badge && item.badge > 0 && (
                      <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            )}

            {/* Mobile Language Selector */}
            {showLanguageSelector && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  {t('navigation:languageSelector')}
                </h3>
                <LanguageSelector />
              </div>
            )}

            {/* Mobile User Section */}
            {showAuth && isAuthenticated && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                <div className="flex items-center space-x-3 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {renderUserInitials()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <a
                    href="/profile"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-150"
                  >
                    <Icon name="user" className="mr-3 text-gray-400 text-sm" />
                    {t('navigation:profile')}
                  </a>
                  <a
                    href="/settings"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-150"
                  >
                    <Icon name="cog" className="mr-3 text-gray-400 text-sm" />
                    {t('navigation:settings')}
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-150"
                  >
                    <Icon name="sign-out-alt" className="mr-3 text-sm" />
                    {t('auth:logout')}
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Login Button */}
            {showAuth && !isAuthenticated && !isLoading && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <Button variant="primary" size="sm" className="w-full">
                  <Icon name="sign-in-alt" className="mr-2 text-xs" />
                  {t('auth:login')}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
