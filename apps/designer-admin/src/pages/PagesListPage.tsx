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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/10 flex flex-col">
      <Header
        title="CMS Designer Admin"
        showAuth={true}
        showLanguageSelector={true}
        className="bg-white/90 dark:bg-gray-900/90"
      />

      <main className="flex-1 px-6 sm:px-8 lg:px-10 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-3">
                  {t('pages:pageManagement')}
                </h1>
              </div>
              <div className="hidden lg:flex items-center space-x-4">
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total Pages
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {pagination.totalCount}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200/30 dark:border-gray-700/30 shadow-lg">
              <PageFilters
                searchTerm={filters.searchTerm}
                onSearchChange={actions.setSearchTerm}
                statusFilter={filters.statusFilter}
                onStatusChange={actions.setStatusFilter}
              />
            </div>
          </div>

          {/* Error state */}
          {error && (
            <Alert
              type="error"
              message={error}
              className="mb-8 rounded-xl"
              onClose={() => actions.refresh()}
            />
          )}

          {/* Pages table */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-gray-200/30 dark:border-gray-700/30">
            <PageTable
              pages={pages}
              loading={loading}
              onOpenDesigner={handleOpenDesigner}
            />

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-8 py-6 border-t border-gray-200/30 dark:border-gray-700/30 bg-gray-50/50 dark:bg-gray-800/50">
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
        </div>
      </main>

      <Footer
        title="CMS Designer"
        description=""
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
