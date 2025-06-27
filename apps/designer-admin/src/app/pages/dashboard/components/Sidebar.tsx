import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, cn } from '@frontend/shared';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: string;
  roles?: string[];
  description?: string;
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: 'fas fa-tachometer-alt',
    description: 'Overview and stats',
  },
  {
    name: 'Pages',
    href: '/dashboard/pages',
    icon: 'fas fa-file-alt',
    roles: ['Admin', 'Developer'],
    description: 'Manage website pages',
  },
  {
    name: 'Media',
    href: '/dashboard/media',
    icon: 'fas fa-images',
    roles: ['Admin', 'Developer'],
    description: 'Manage media files',
  },
  {
    name: 'Users',
    href: '/dashboard/users',
    icon: 'fas fa-users',
    roles: ['Admin'],
    description: 'Manage user accounts',
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: 'fas fa-cog',
    roles: ['Admin'],
    description: 'System configuration',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, hasAnyRole } = useAuth();

  const filteredNavigation = navigation.filter((item) => {
    if (!item.roles) return true;
    return hasAnyRole(item.roles as any);
  });

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200 dark:border-gray-700',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <i className="fas fa-palette text-white text-sm"></i>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              CMS Admin
            </h2>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close sidebar"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 flex-1">
          <div className="space-y-1">
            {filteredNavigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    'group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                    active
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                  )}
                  title={item.description}
                >
                  <div
                    className={cn(
                      'mr-3 flex-shrink-0 w-6 h-6 flex items-center justify-center',
                      active
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                    )}
                  >
                    <i className={cn(item.icon, 'text-base')}></i>
                  </div>
                  <span className="flex-1">{item.name}</span>
                  {active && (
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full flex-shrink-0"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User info - moved to bottom */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-sm font-semibold text-white">
                  {user?.firstName.charAt(0)}
                  {user?.lastName.charAt(0)}
                </span>
              </div>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.roleName}
              </p>
            </div>
            <div className="flex-shrink-0">
              <div
                className="w-2 h-2 bg-green-400 rounded-full"
                title="Online"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
