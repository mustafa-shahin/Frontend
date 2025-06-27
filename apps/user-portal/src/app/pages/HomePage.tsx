import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LoadingSpinner, apiClient, ENDPOINTS } from '@frontend/shared';

interface PublishedPage {
  id: number;
  name: string;
  title: string;
  slug: string;
  description?: string;
  publishedOn: string;
}

export const HomePage: React.FC = () => {
  const [pages, setPages] = useState<PublishedPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPublishedPages();
  }, []);

  const loadPublishedPages = async () => {
    try {
      const publishedPages = await apiClient.get<PublishedPage[]>(
        ENDPOINTS.pages.published
      );
      setPages(publishedPages);
    } catch (error) {
      console.error('Failed to load published pages:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          Welcome to Our Website
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Discover our content and explore the pages we've created for you.
        </p>
      </div>

      {/* Published Pages Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Available Pages
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Browse through our published content
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        ) : pages.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <Link
                key={page.id}
                to={`/${page.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {page.title}
                  </h3>
                  {page.description && (
                    <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-3">
                      {page.description}
                    </p>
                  )}
                  <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <i className="fas fa-calendar mr-2"></i>
                    <span>
                      Published on{' '}
                      {new Date(page.publishedOn).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      /{page.slug}
                    </span>
                    <i className="fas fa-arrow-right text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <i className="fas fa-file-alt text-4xl text-gray-400 dark:text-gray-500 mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No Pages Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              There are no published pages to display at this time.
            </p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            About This Site
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Built with modern technology and designed for everyone
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-paint-brush text-blue-600 dark:text-blue-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Beautiful Design
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Every page is carefully crafted with attention to detail and user
              experience.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-mobile-alt text-green-600 dark:text-green-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Mobile Responsive
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Our content looks great on all devices, from mobile phones to
              desktop computers.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-bolt text-purple-600 dark:text-purple-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Fast Performance
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Optimized for speed and performance to provide the best user
              experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
