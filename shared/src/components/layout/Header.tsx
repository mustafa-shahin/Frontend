import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { useTranslation } from '../../hooks/useTranslation';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
  showLogo?: boolean;
  logoUrl?: string;
  logoText?: string;
  actions?: React.ReactNode;
  user?: {
    name: string;
    email: string;
    role: string;
    pictureUrl?: string;
  };
  onUserMenuClick?: () => void;
  onLogout?: () => void;
  showUserMenu?: boolean;
  variant?: 'default' | 'minimal' | 'branded';
}

export function Header({
  title,
  subtitle,
  className,
  showLogo = true,
  logoUrl,
  logoText = 'CMS Designer',
  actions,
  user,
  onUserMenuClick,
  onLogout,
  showUserMenu = true,
  variant = 'default',
}: HeaderProps) {
  const { t, changeLanguage, currentLanguage } = useTranslation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const variantStyles = {
    default: 'bg-surface border-b border-border-light shadow-sm',
    minimal: 'bg-surface',
    branded: 'bg-gradient-to-r from-brand-600 to-brand-700 text-white',
  };

  const textStyles = {
    default: 'text-text-primary',
    minimal: 'text-text-primary',
    branded: 'text-white',
  };

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
    setIsLanguageMenuOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        languageMenuRef.current &&
        !languageMenuRef.current.contains(event.target as Node)
      ) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={cn('sticky top-0 z-50', variantStyles[variant], className)}
    >
      <div className="px-6 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section - Logo and title */}
          <div className="flex items-center gap-x-6">
            {showLogo && (
              <div className="flex items-center">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={logoText}
                    className="h-8 w-8 rounded-lg"
                  />
                ) : (
                  <div
                    className={cn(
                      'h-10 w-10 rounded-xl flex items-center justify-center',
                      variant === 'branded'
                        ? 'bg-white/20'
                        : 'bg-gradient-to-br from-brand-600 to-brand-700'
                    )}
                  >
                    <Icon
                      name="paint-brush"
                      className={cn(
                        'h-5 w-5',
                        variant === 'branded' ? 'text-white' : 'text-white'
                      )}
                    />
                  </div>
                )}
                <div className="ml-3">
                  <h1 className={cn('text-xl font-bold', textStyles[variant])}>
                    {logoText}
                  </h1>
                  {variant === 'branded' && (
                    <p className="text-sm text-white/80">
                      {t('header.subtitle')}
                    </p>
                  )}
                </div>
              </div>
            )}

            {title && variant !== 'branded' && (
              <div className="hidden sm:block">
                <div className="h-6 w-px bg-border-light" />
                <div className="ml-6">
                  <h2
                    className={cn('text-lg font-semibold', textStyles[variant])}
                  >
                    {title}
                  </h2>
                  {subtitle && (
                    <p className={cn('h-5 w-5 text-white')}>{subtitle}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right section - Actions and user menu */}
          <div className="flex items-center gap-x-4">
            {/* Custom Actions */}
            {actions && (
              <div className="hidden sm:flex items-center gap-x-3">
                {actions}
              </div>
            )}

            {/* Language Selector */}
            <div className="relative" ref={languageMenuRef}>
              <Button
                variant={variant === 'branded' ? 'ghost' : 'outline'}
                size="sm"
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className={cn(
                  'gap-2',
                  variant === 'branded'
                    ? 'text-white hover:bg-white/10 border-white/20'
                    : 'border-border-medium hover:bg-background-secondary'
                )}
              >
                <span className="text-sm">{currentLang.flag}</span>
                <span className="hidden sm:inline-block font-medium">
                  {currentLang.code.toUpperCase()}
                </span>
                <Icon
                  name="chevron-down"
                  className={cn(
                    'h-3 w-3 transition-transform',
                    isLanguageMenuOpen && 'rotate-180'
                  )}
                />
              </Button>

              {/* Language Dropdown */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface rounded-lg border border-border-light shadow-lg z-50">
                  <div className="py-2">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={cn(
                          'w-full px-4 py-2 text-left text-sm hover:bg-background-secondary transition-colors',
                          currentLanguage === language.code &&
                            'bg-brand-50 text-brand-700'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-base">{language.flag}</span>
                          <span className="font-medium">{language.name}</span>
                          {currentLanguage === language.code && (
                            <Icon
                              name="check"
                              className="h-4 w-4 ml-auto text-brand-600"
                            />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            {showUserMenu && user && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                    variant === 'branded'
                      ? 'hover:bg-white/10'
                      : 'hover:bg-background-secondary'
                  )}
                >
                  {/* User Avatar */}
                  <div className="flex-shrink-0">
                    {user.pictureUrl ? (
                      <img
                        className="h-8 w-8 rounded-full border-2 border-border-light"
                        src={user.pictureUrl}
                        alt={user.name}
                      />
                    ) : (
                      <div
                        className={cn(
                          'h-8 w-8 rounded-full flex items-center justify-center',
                          variant === 'branded'
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-600'
                        )}
                      >
                        <Icon name="user" className="h-4 w-4" />
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="hidden lg:block text-left">
                    <p
                      className={cn('text-sm font-medium', textStyles[variant])}
                    >
                      {user.name}
                    </p>
                    <p
                      className={cn(
                        'text-xs',
                        variant === 'branded'
                          ? 'text-white/80'
                          : 'text-text-secondary'
                      )}
                    >
                      {user.role}
                    </p>
                  </div>

                  <Icon
                    name="chevron-down"
                    className={cn(
                      'h-4 w-4 transition-transform',
                      variant === 'branded'
                        ? 'text-white/80'
                        : 'text-text-secondary',
                      isUserMenuOpen && 'rotate-180'
                    )}
                  />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-surface rounded-lg border border-border-light shadow-lg z-50">
                    <div className="p-4 border-b border-border-light">
                      <div className="flex items-center gap-3">
                        {user.pictureUrl ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.pictureUrl}
                            alt={user.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                            <Icon
                              name="user"
                              className="h-5 w-5 text-slate-600"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-text-secondary truncate">
                            {user.email}
                          </p>
                          <p className="text-xs text-brand-600 font-medium">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <button
                        onClick={onUserMenuClick}
                        className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-background-secondary hover:text-text-primary transition-colors flex items-center gap-3"
                      >
                        <Icon name="user" className="h-4 w-4" />
                        {t('header.profile')}
                      </button>
                      <button
                        onClick={() => setIsUserMenuOpen(false)}
                        className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-background-secondary hover:text-text-primary transition-colors flex items-center gap-3"
                      >
                        <Icon name="cog" className="h-4 w-4" />
                        {t('header.settings')}
                      </button>
                    </div>

                    {onLogout && (
                      <div className="border-t border-border-light py-2">
                        <button
                          onClick={onLogout}
                          className="w-full px-4 py-2 text-left text-sm text-error-600 hover:bg-error-50 hover:text-error-700 transition-colors flex items-center gap-3"
                        >
                          <Icon name="sign-out-alt" className="h-4 w-4" />
                          {t('header.signOut')}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
