import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@frontend/shared';

export const DashboardHome: React.FC = () => {
  const { user, canAccessDesigner } = useAuth();

  const stats = [
    {
      name: 'Total Pages',
      value: '12',
      icon: 'fas fa-file-alt',
      color: 'blue',
    },
    {
      name: 'Published Pages',
      value: '8',
      icon: 'fas fa-globe',
      color: 'green',
    },
    { name: 'Draft Pages', value: '4', icon: 'fas fa-edit', color: 'yellow' },
    { name: 'Total Users', value: '24', icon: 'fas fa-users', color: 'purple' },
  ];

  const quickActions = [
    {
      name: 'Create New Page',
      href: '/dashboard/pages/new',
      icon: 'fas fa-plus',
      color: 'blue',
      description: 'Create a new page with the visual designer',
    },
    {
      name: 'Manage Pages',
      href: '/dashboard/pages',
      icon: 'fas fa-list',
      color: 'green',
      description: 'View and manage all your pages',
    },
    {
      name: 'Media Library',
      href: '/dashboard/media',
      icon: 'fas fa-images',
      color: 'purple',
      description: 'Upload and manage media files',
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: 'fas fa-cog',
      color: 'gray',
      description: 'Configure application settings',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your content management system today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900`}
              >
                <i
                  className={`${stat.icon} text-${stat.color}-600 dark:text-${stat.color}-400 text-xl`}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Quick Actions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Get started with these common tasks
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {quickActions.map((action) => {
            const canAccess =
              action.href === '/dashboard/pages/new' ||
              action.href === '/dashboard/pages'
                ? canAccessDesigner()
                : true;

            if (!canAccess) return null;

            return (
              <Link
                key={action.name}
                to={action.href}
                className="group p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`p-3 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900 group-hover:bg-${action.color}-200 dark:group-hover:bg-${action.color}-800 transition-colors`}
                  >
                    <i
                      className={`${action.icon} text-${action.color}-600 dark:text-${action.color}-400 text-xl`}
                    ></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {action.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {action.description}
                    </p>
                  </div>
                  <i className="fas fa-arrow-right text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"></i>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recent Activity
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <i className="fas fa-edit text-blue-600 dark:text-blue-400 text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  Homepage was updated
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <i className="fas fa-plus text-green-600 dark:text-green-400 text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  New page "About Us" was created
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  1 day ago
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <i className="fas fa-globe text-purple-600 dark:text-purple-400 text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  Contact page was published
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  3 days ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
