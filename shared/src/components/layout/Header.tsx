import React from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

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
  const variantStyles = {
    default: 'bg-white border-b border-gray-200 shadow-sm',
    minimal: 'bg-white',
    branded: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white',
  };

  return (
    <header
      className={cn('sticky top-0 z-40', variantStyles[variant], className)}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section - Logo and title */}
          <div className="flex items-center gap-x-4">
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
                      'h-8 w-8 rounded-lg flex items-center justify-center',
                      variant === 'branded'
                        ? 'bg-white/20'
                        : 'bg-gradient-to-br from-blue-600 to-blue-700'
                    )}
                  >
                    <Icon
                      name="paint-brush"
                      className={cn(
                        'text-white',
                        variant === 'branded' ? 'text-white' : 'text-white'
                      )}
                      size="sm"
                    />
                  </div>
                )}
                <span
                  className={cn(
                    'ml-2 text-lg font-bold',
                    variant === 'branded' ? 'text-white' : 'text-gray-900'
                  )}
                >
                  {logoText}
                </span>
              </div>
            )}

            {title && (
              <div className="hidden sm:block">
                <div
                  className={cn(
                    'h-6 w-px',
                    variant === 'branded' ? 'bg-white/20' : 'bg-gray-200'
                  )}
                />
                <div className="ml-4">
                  <h1
                    className={cn(
                      'text-lg font-semibold',
                      variant === 'branded' ? 'text-white' : 'text-gray-900'
                    )}
                  >
                    {title}
                  </h1>
                  {subtitle && (
                    <p
                      className={cn(
                        'text-sm',
                        variant === 'branded'
                          ? 'text-white/80'
                          : 'text-gray-500'
                      )}
                    >
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right section - Actions and user menu */}
          <div className="flex items-center gap-x-4">
            {actions && (
              <div className="hidden sm:flex items-center gap-x-2">
                {actions}
              </div>
            )}

            {showUserMenu && user && (
              <div className="flex items-center gap-x-3">
                {/* User info */}
                <div className="hidden lg:flex items-center gap-x-3">
                  <div className="text-right">
                    <p
                      className={cn(
                        'text-sm font-medium',
                        variant === 'branded' ? 'text-white' : 'text-gray-900'
                      )}
                    >
                      {user.name}
                    </p>
                    <p
                      className={cn(
                        'text-xs',
                        variant === 'branded'
                          ? 'text-white/80'
                          : 'text-gray-500'
                      )}
                    >
                      {user.role}
                    </p>
                  </div>

                  {/* Avatar */}
                  <button
                    onClick={onUserMenuClick}
                    className={cn(
                      'h-8 w-8 rounded-full flex items-center justify-center transition-colors',
                      variant === 'branded'
                        ? 'hover:bg-white/10'
                        : 'hover:bg-gray-100'
                    )}
                  >
                    {user.pictureUrl ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.pictureUrl}
                        alt={user.name}
                      />
                    ) : (
                      <div
                        className={cn(
                          'h-8 w-8 rounded-full flex items-center justify-center',
                          variant === 'branded'
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-200 text-gray-600'
                        )}
                      >
                        <Icon name="user" size="sm" />
                      </div>
                    )}
                  </button>
                </div>

                {/* Logout button */}
                {onLogout && (
                  <Button
                    variant={variant === 'branded' ? 'ghost' : 'ghost'}
                    size="sm"
                    onClick={onLogout}
                    title="Sign out"
                    className={
                      variant === 'branded'
                        ? 'text-white hover:bg-white/10'
                        : ''
                    }
                  >
                    <Icon name="sign-out-alt" className="h-5 w-5" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
