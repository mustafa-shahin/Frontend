import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@frontend/shared';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-96 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-6xl font-bold text-gray-300 dark:text-gray-600 mb-4">
            404
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Page Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <Button fullWidth icon={<i className="fas fa-home"></i>}>
              Go Home
            </Button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            ← Go Back
          </button>
        </div>

        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
            Need help?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If you think this is an error, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};
