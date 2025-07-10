import React from 'react';
import { Card } from '@frontend/shared';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        {/* App branding */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <i className="fa fa-paint-brush text-2xl text-white" />
          </div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-100">
            CMS Designer Admin
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Professional content management and design platform
          </p>
          <div className="mt-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full inline-block">
            Admin & Developer Access Only
          </div>
        </div>

        {/* Auth form card */}
        <Card variant="elevated" className="shadow-xl">
          {children}
        </Card>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p>© 2024 CMS Designer. All rights reserved.</p>
          <p>
            Need help?{' '}
            <a
              href="mailto:support@example.com"
              className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
