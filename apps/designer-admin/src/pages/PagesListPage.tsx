import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  usePages,
  PageTable,
  PageFilters,
  Pagination,
  Alert,
  Header,
  Footer,
  Button,
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header
        title="CMS Designer Admin"
        showAuth={true}
        showLanguageSelector={true}
        onLogoClick={() => navigate('/pages')}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mt-6 lg:mt-0 lg:ml-8">
                <div className="grid grid-cols-2 gap-6 lg:gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {pagination.totalCount}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      Total Pages
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {
                        pages.filter((page) => page.status === 'published')
                          .length
                      }
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      Published
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Filters Section */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Search & Filter
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => actions.refresh()}
                  className="flex items-center"
                >
                  <i className="fas fa-sync-alt mr-2"></i>
                  Refresh
                </Button>
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
                  Pages List
                </h3>
                {!loading && pages.length > 0 && (
                  <span className="text-sm text-gray-500">
                    Showing {pagination.totalCount}{' '}
                    {pagination.totalCount === 1 ? 'page' : 'pages'}
                  </span>
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
              <div className="mx-auto h-16 w-16 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                <i className="fas fa-file-alt text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No pages found
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                {filters.searchTerm || filters.statusFilter
                  ? 'No pages match your current search criteria. Try adjusting your filters.'
                  : 'Get started by creating your first page with our visual designer.'}
              </p>
              {(filters.searchTerm || filters.statusFilter) && (
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
              )}
            </div>
          )}
        </div>
      </main>

      <Footer
        title="CMS Designer"
        description="Professional content management for modern websites"
        showCopyright={true}
        showPoweredBy={true}
        sections={[
          {
            title: t('navigation:help'),
            links: [
              { label: t('navigation:about'), href: '/about' },
              { label: t('navigation:contact'), href: '/contact' },
              { label: t('navigation:help'), href: '/help' },
            ],
          },
        ]}
      />
    </div>
  );
}
