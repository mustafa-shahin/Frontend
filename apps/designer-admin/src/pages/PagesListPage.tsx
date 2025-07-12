import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  usePages,
  PageTable,
  PageFilters,
  Pagination,
  Alert,
  Button,
  LoadingSpinner,
} from '@frontend/shared';

export function PagesListPage() {
  const { t } = useTranslation(['pages', 'navigation']);
  const navigate = useNavigate();

  const { pages, loading, error, pagination, filters, actions } = usePages({
    pageSize: 20,
  });

  const handleOpenDesigner = (pageId: number) => {
    navigate(`/designer/${pageId}`);
  };

  // handleCreatePage and its usage removed as per the request.

  if (loading && pages.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="flex items-center space-x-3">
            <LoadingSpinner size="lg" />
            <span className="text-gray-600 font-medium">
              {t('pages:loadingPages')}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t('pages:pageManagement')}
            </h1>
          </div>

          <div className="mt-6 lg:mt-0 flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => actions.refresh()}
              disabled={loading}
              className="flex items-center"
            >
              <i className="fas fa-sync-alt mr-2"></i>
              Refresh
            </Button>
            {/* The 'Create Page' button has been removed from here */}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-file-alt text-blue-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {pagination.totalCount}
              </div>
              <div className="text-sm text-gray-500">
                {' '}
                {t('pages:totalPages')}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {pages.filter((page) => page.status === 'published').length}
              </div>
              <div className="text-sm text-gray-500">
                {t('pages:status.published')}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-edit text-yellow-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {pages.filter((page) => page.status === 'draft').length}
              </div>
              <div className="text-sm text-gray-500">
                {t('pages:status.draft')}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <i className="fas fa-clock text-purple-600 text-xl"></i>
            </div>
            <div className="ml-4">
              <div className="text-2xl font-bold text-gray-900">
                {pages.filter((page) => page.status === 'scheduled').length}
              </div>
              <div className="text-sm text-gray-500">
                {t('pages:status.scheduled')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('pages:Search&Filter')}
            </h2>
            {(filters.searchTerm || filters.statusFilter) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  actions.setSearchTerm('');
                  actions.setStatusFilter('');
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times mr-2"></i>
                Clear All
              </Button>
            )}
          </div>

          <PageFilters
            searchTerm={filters.searchTerm}
            onSearchChange={actions.setSearchTerm}
            statusFilter={filters.statusFilter}
            onStatusChange={actions.setStatusFilter}
          />
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6">
          <Alert
            type="error"
            message={error}
            onClose={() => actions.refresh()}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Pages ({pagination.totalCount})
            </h3>
            {!loading && pages.length > 0 && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Showing{' '}
                  {(pagination.currentPage - 1) * pagination.pageSize + 1} to{' '}
                  {Math.min(
                    pagination.currentPage * pagination.pageSize,
                    pagination.totalCount
                  )}{' '}
                  of {pagination.totalCount} pages
                </span>
                {loading && <LoadingSpinner size="sm" />}
              </div>
            )}
          </div>
        </div>

        {/* Table Content */}
        <PageTable
          pages={pages}
          loading={loading}
          onOpenDesigner={handleOpenDesigner}
        />

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalCount}
              itemsPerPage={pagination.pageSize}
              onPageChange={actions.setPage}
            />
          </div>
        )}
      </div>

      {/* Empty State Enhancement */}
      {!loading && !error && pages.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="mx-auto h-24 w-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
            <i className="fas fa-file-alt text-gray-400 text-3xl"></i>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            {filters.searchTerm || filters.statusFilter
              ? 'No pages found'
              : 'No pages yet'}
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {filters.searchTerm || filters.statusFilter
              ? 'No pages match your current search criteria. Try adjusting your filters or search terms.'
              : 'There are no pages to display. If you need to create pages, please contact your administrator.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            {filters.searchTerm ||
              (filters.statusFilter && (
                <Button
                  variant="outline"
                  onClick={() => {
                    actions.setSearchTerm('');
                    actions.setStatusFilter('');
                  }}
                >
                  <i className="fas fa-times mr-2"></i>
                  Clear Filters
                </Button>
              ))}
            {/* The 'Create Your First Page' button has been removed from here */}
          </div>
        </div>
      )}
    </div>
  );
}
