import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, PageStatus, PageListDto } from '@frontend/shared';
import { usePagesApi } from '../pages/hooks/usePagesApi';

interface DashboardStats {
  totalPages: number;
  publishedPages: number;
  draftPages: number;
  totalUsers: number;
}

export const DashboardHome: React.FC = () => {
  const { user, canAccessDesigner } = useAuth();
  const { getPages } = usePagesApi();
  const [stats, setStats] = useState<DashboardStats>({
    totalPages: 0,
    publishedPages: 0,
    draftPages: 0,
    totalUsers: 0,
  });
  const [recentPages, setRecentPages] = useState<PageListDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Load recent pages
      const pagesResult = await getPages(1, 5);
      setRecentPages(pagesResult.items);

      // Calculate stats from the pages
      const totalPages = pagesResult.totalCount;
      const publishedPages = pagesResult.items.filter(
        (p) => p.status === PageStatus.Published
      ).length;
      const draftPages = pagesResult.items.filter(
        (p) => p.status === PageStatus.Draft
      ).length;

      setStats({
        totalPages,
        publishedPages,
        draftPages,
        totalUsers: 24, // This would come from a real API
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Pages',
      value: stats.totalPages.toString(),
      icon: 'fas fa-file-alt',
      color: 'blue',
      change: '+2',
      changeType: 'increase' as const,
    },
    {
      name: 'Published',
      value: stats.publishedPages.toString(),
      icon: 'fas fa-globe',
      color: 'green',
      change: '+1',
      changeType: 'increase' as const,
    },
    {
      name: 'Drafts',
      value: stats.draftPages.toString(),
      icon: 'fas fa-edit',
      color: 'yellow',
      change: '+1',
      changeType: 'increase' as 'increase' | 'decrease' | 'neutral',
    },
    {
      name: 'Users',
      value: stats.totalUsers.toString(),
      icon: 'fas fa-users',
      color: 'purple',
      change: '0',
      changeType: 'neutral' as 'increase' | 'decrease' | 'neutral',
    },
  ];

  const quickActions = [
    {
      name: 'Create New Page',
      to: '/dashboard/pages',
      icon: 'fas fa-plus',
      color: 'blue',
      description: 'Start building a new page with our visual designer',
      requiresDesigner: true,
    },
    {
      name: 'Page Designer',
      to: '/dashboard/pages',
      icon: 'fas fa-paint-brush',
      color: 'purple',
      description: 'Use the drag-and-drop page builder',
      requiresDesigner: true,
    },
    {
      name: 'Manage Pages',
      to: '/dashboard/pages',
      icon: 'fas fa-list',
      color: 'green',
      description: 'View, edit, and organize all your pages',
      requiresDesigner: true,
    },
    {
      name: 'Media Library',
      to: '/dashboard/media',
      icon: 'fas fa-images',
      color: 'orange',
      description: 'Upload and manage your media files',
      requiresDesigner: false,
    },
  ];

  const getStatusBadgeClasses = (status: PageStatus) => {
    switch (status) {
      case PageStatus.Published:
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case PageStatus.Draft:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case PageStatus.Scheduled:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case PageStatus.Archived:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Ready to create something amazing today?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <i className="fas fa-palette text-2xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  <span
                    className={`text-xs font-medium ${
                      stat.changeType === 'increase'
                        ? 'text-green-600 dark:text-green-400'
                        : stat.changeType === 'decrease'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {stat.changeType === 'increase' && '↗'}
                    {stat.changeType === 'decrease' && '↘'}
                    {stat.change} this week
                  </span>
                </div>
              </div>
              <div
                className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Quick Actions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Jump into the most common tasks
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {quickActions.map((action) => {
            const canAccess = action.requiresDesigner
              ? canAccessDesigner()
              : true;

            if (!canAccess) return null;

            return (
              <Link
                key={action.name}
                to={action.to}
                className="group p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="text-center">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-${action.color}-100 dark:bg-${action.color}-900/30 group-hover:bg-${action.color}-200 dark:group-hover:bg-${action.color}-800/50 transition-colors mb-4`}
                  >
                    <i
                      className={`${action.icon} text-${action.color}-600 dark:text-${action.color}-400 text-2xl`}
                    ></i>
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                    {action.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Pages */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Recent Pages
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Your latest page updates
            </p>
          </div>
          <Link
            to="/dashboard/pages"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
          >
            View all →
          </Link>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentPages.length > 0 ? (
            recentPages.map((page) => (
              <div
                key={page.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">
                        {page.name}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClasses(
                          page.status
                        )}`}
                      >
                        {page.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {page.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Updated {new Date(page.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/designer/${page.id}`}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      <i className="fas fa-paint-brush mr-1.5"></i>
                      Design
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-file-alt text-gray-400 text-xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No pages yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create your first page to get started with your website.
              </p>
              <Link
                to="/dashboard/pages"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i>
                Create First Page
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
