import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  useAuth,
  Icon,
  Button,
  getCurrentTheme,
  setTheme,
} from '@frontend/shared';

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(getCurrentTheme() === 'dark');

  const toggleDarkMode = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setTheme(newTheme);
    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navigation = [
    {
      name: 'Pages',
      href: '/pages',
      icon: 'file-alt' as const,
      current: location.pathname === '/pages' || location.pathname === '/',
    },
    {
      name: 'Media',
      href: '/media',
      icon: 'images' as const,
      current: location.pathname.startsWith('/media'),
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: 'cog' as const,
      current: location.pathname.startsWith('/settings'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? '' : 'hidden'
        }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative flex w-full max-w-xs flex-col bg-white dark:bg-gray-800 pb-4 pt-5 shadow-xl">
          <div className="absolute right-0 top-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <Icon name="times" className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="flex flex-shrink-0 items-center px-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Icon name="paint-brush" className="text-white" size="sm" />
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900 dark:text-gray-100">
              CMS Designer
            </span>
          </div>

          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.href);
                  setSidebarOpen(false);
                }}
                className={`group flex w-full items-center rounded-md px-2 py-2 text-base font-medium ${
                  item.current
                    ? 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                <Icon name={item.icon} className="mr-4 h-6 w-6 flex-shrink-0" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-800 px-6 pb-4 shadow-xl">
          <div className="flex h-16 shrink-0 items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <Icon name="paint-brush" className="text-white" size="sm" />
            </div>
            <span className="ml-2 text-lg font-bold text-gray-900 dark:text-gray-100">
              CMS Designer
            </span>
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.href)}
                        className={`group flex w-full gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold ${
                          item.current
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-100'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon name={item.icon} className="h-6 w-6 shrink-0" />
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="mt-auto">
                <div className="flex items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                  {user?.pictureUrl && (
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src={user.pictureUrl}
                      alt={user.firstName}
                    />
                  )}
                  {!user?.pictureUrl && (
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                      <Icon name="user" className="text-gray-400" size="sm" />
                    </div>
                  )}
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top navigation */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Icon name="bars" className="h-6 w-6" />
          </button>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6 ml-auto">
              {/* Dark mode toggle */}
              <button
                type="button"
                onClick={toggleDarkMode}
                className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                title={
                  darkMode ? 'Switch to light mode' : 'Switch to dark mode'
                }
              >
                <Icon name={darkMode ? 'sun' : 'moon'} className="h-6 w-6" />
              </button>

              {/* User menu */}
              <div className="flex items-center gap-x-4">
                <span className="hidden lg:flex lg:items-center">
                  <span className="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    ({user?.roleName})
                  </span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  title="Sign out"
                >
                  <Icon name="sign-out-alt" className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
