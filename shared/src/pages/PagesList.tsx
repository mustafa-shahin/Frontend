import React, { useState, useEffect } from 'react';
import { cn } from '../utils/cn';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Icon } from '../components/ui/Icon';
import { Card } from '../components/ui/Card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

// Types for the page data
export interface PageItem {
  id: number;
  name: string;
  title: string;
  slug: string;
  status: 'Draft' | 'Published' | 'Archived' | 'Scheduled';
  createdAt: string;
  updatedAt: string;
  publishedOn?: string;
  hasChildren: boolean;
  versionCount: number;
  currentVersion: number;
}

export interface PaginationInfo {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PagesData {
  data: PageItem[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PagesListProps {
  pages: PagesData;
  loading?: boolean;
  error?: string | null;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onSearch: (query: string) => void;
  onEdit?: (page: PageItem) => void;
  onView?: (page: PageItem) => void;
  onDelete?: (page: PageItem) => void;
  onDuplicate?: (page: PageItem) => void;
  onCreate?: () => void;
  searchQuery?: string;
  className?: string;
}

const statusColors = {
  Draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  Published:
    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Archived:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

export function PagesList({
  pages,
  loading = false,
  error,
  onPageChange,
  onPageSizeChange,
  onSearch,
  onEdit,
  onView,
  onDelete,
  onDuplicate,
  onCreate,
  searchQuery = '',
  className,
}: PagesListProps) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPageUrl = (page: PageItem) => {
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : window.location.origin;
    return `${baseUrl}/${page.slug}`;
  };

  const renderPagination = () => {
    if (pages.totalPages <= 1) return null;

    const pageNumbers = [];
    const startPage = Math.max(1, pages.pageNumber - 2);
    const endPage = Math.min(pages.totalPages, pages.pageNumber + 2);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <Button
            variant="outline"
            onClick={() => onPageChange(pages.pageNumber - 1)}
            disabled={!pages.hasPreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => onPageChange(pages.pageNumber + 1)}
            disabled={!pages.hasNextPage}
          >
            Next
          </Button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Showing{' '}
              <span className="font-medium">
                {Math.min(
                  (pages.pageNumber - 1) * pages.pageSize + 1,
                  pages.totalCount
                )}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min(pages.pageNumber * pages.pageSize, pages.totalCount)}
              </span>{' '}
              of <span className="font-medium">{pages.totalCount}</span> results
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Per page:
              </label>
              <select
                value={pages.pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <nav className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(pages.pageNumber - 1)}
                disabled={!pages.hasPreviousPage}
              >
                <Icon name="chevron-left" size="sm" />
              </Button>
              {pageNumbers.map((number) => (
                <Button
                  key={number}
                  variant={number === pages.pageNumber ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => onPageChange(number)}
                >
                  {number}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(pages.pageNumber + 1)}
                disabled={!pages.hasNextPage}
              >
                <Icon name="chevron-right" size="sm" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <Card className={cn('p-6', className)}>
        <div className="text-center">
          <Icon
            name="exclamation-triangle"
            size="2xl"
            className="text-red-500 mb-4"
          />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Error Loading Pages
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Pages
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your website pages and content
          </p>
        </div>
        {onCreate && (
          <Button onClick={onCreate} className="btn-gradient">
            <Icon name="plus" size="sm" className="mr-2" />
            Create Page
          </Button>
        )}
      </div>

      {/* Search */}
      <Card className="p-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search pages by name, title, or slug..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              leftIcon="search"
            />
          </div>
          <Button type="submit" disabled={loading}>
            Search
          </Button>
        </form>
      </Card>

      {/* Pages List */}
      <Card>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
            <span className="ml-3 text-gray-600 dark:text-gray-400">
              Loading pages...
            </span>
          </div>
        ) : pages.data.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="file-alt" size="3xl" className="text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No pages found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery
                ? 'No pages match your search criteria.'
                : 'Get started by creating your first page.'}
            </p>
            {onCreate && !searchQuery && (
              <Button onClick={onCreate} className="btn-gradient">
                <Icon name="plus" size="sm" className="mr-2" />
                Create Your First Page
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      URL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Versions
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {pages.data.map((page) => (
                    <tr
                      key={page.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {page.hasChildren && (
                              <Icon
                                name="folder"
                                size="sm"
                                className="text-blue-500"
                              />
                            )}
                          </div>
                          <div
                            className={cn('ml-2', page.hasChildren && 'ml-1')}
                          >
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {page.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {page.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={cn(
                            'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                            statusColors[page.status]
                          )}
                        >
                          {page.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          <a
                            href={getPageUrl(page)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
                          >
                            /{page.slug}
                            <Icon
                              name="external-link-alt"
                              size="xs"
                              className="ml-1"
                            />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(page.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        v{page.currentVersion} ({page.versionCount} total)
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {onView && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onView(page)}
                              title="View Page"
                            >
                              <Icon name="eye" size="sm" />
                            </Button>
                          )}
                          {onEdit && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEdit(page)}
                              title="Edit Page"
                            >
                              <Icon name="edit" size="sm" />
                            </Button>
                          )}
                          {onDuplicate && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDuplicate(page)}
                              title="Duplicate Page"
                            >
                              <Icon name="copy" size="sm" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDelete(page)}
                              title="Delete Page"
                              className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Icon name="trash" size="sm" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {renderPagination()}
          </div>
        )}
      </Card>
    </div>
  );
}
