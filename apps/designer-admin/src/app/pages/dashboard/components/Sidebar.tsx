// apps/designer-admin/src/app/pages/dashboard/components/Sidebar.tsx
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
  badge?: string;
  isNew?: boolean;
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: 'fas fa-tachometer-alt',
    description: 'Overview and analytics',
  },
  {
    name: 'Pages',
    href: '/dashboard/pages',
    icon: 'fas fa-file-alt',
    roles: ['Admin', 'Developer'],
    description: 'Create and manage pages',
    badge: 'Hot',
  },
  {
    name: 'Media Library',
    href: '/dashboard/media',
    icon: 'fas fa-images',
    roles: ['Admin', 'Developer'],
    description: 'Upload and organize media',
  },
  {
    name: 'User Management',
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

const designerTools = [
  {
    name: 'Page Designer',
    href: '/dashboard/pages',
    icon: 'fas fa-paint-brush',
    description: 'Visual page builder',
    isNew: true,
  },
  {
    name: 'Component Library',
    href: '/dashboard/components',
    icon: 'fas fa-cubes',
    description: 'Reusable components',
  },
  {
    name: 'Templates',
    href: '/dashboard/templates',
    icon: 'fas fa-layer-group',
    description: 'Page templates',
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user, hasAnyRole, canAccessDesigner } = useAuth();

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
    <div
      className={cn(
        'fixed inset-y-0 left-0 z-30 w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200 dark:border-gray-800',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Sidebar header */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <i className="fas fa-palette text-white text-lg"></i>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              CMS Admin
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Content Management
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Close sidebar"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="flex flex-col h-full">
        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Main Menu
            </h3>
            <div className="space-y-1">
              {filteredNavigation.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={cn(
                      'group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative',
                      active
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-[1.02]'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                    )}
                    title={item.description}
                  >
                    <div
                      className={cn(
                        'mr-3 flex-shrink-0 w-6 h-6 flex items-center justify-center',
                        active
                          ? 'text-white'
                          : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                      )}
                    >
                      <i className={cn(item.icon, 'text-base')}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="truncate">{item.name}</span>
                        {item.badge && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p
                        className={cn(
                          'text-xs mt-0.5 truncate',
                          active
                            ? 'text-blue-100'
                            : 'text-gray-500 dark:text-gray-400'
                        )}
                      >
                        {item.description}
                      </p>
                    </div>
                    {active && (
                      <div className="absolute right-2 w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Designer Tools */}
          {canAccessDesigner() && (
            <div className="mb-6">
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Designer Tools
              </h3>
              <div className="space-y-1">
                {designerTools.map((tool) => {
                  const active = isActive(tool.href);

                  return (
                    <Link
                      key={tool.name}
                      to={tool.href}
                      onClick={onClose}
                      className={cn(
                        'group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative',
                        active
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-[1.02]'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
                      )}
                      title={tool.description}
                    >
                      <div
                        className={cn(
                          'mr-3 flex-shrink-0 w-6 h-6 flex items-center justify-center',
                          active
                            ? 'text-white'
                            : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                        )}
                      >
                        <i className={cn(tool.icon, 'text-base')}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="truncate">{tool.name}</span>
                          {tool.isNew && (
                            <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full">
                              New
                            </span>
                          )}
                        </div>
                        <p
                          className={cn(
                            'text-xs mt-0.5 truncate',
                            active
                              ? 'text-purple-100'
                              : 'text-gray-500 dark:text-gray-400'
                          )}
                        >
                          {tool.description}
                        </p>
                      </div>
                      {active && (
                        <div className="absolute right-2 w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white dark:bg-gray-900 shadow-sm">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                {user?.pictureUrl ? (
                  <img
                    src={user.pictureUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-semibold text-white">
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                  {user?.roleName}
                </span>
                <div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  title="Online"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
