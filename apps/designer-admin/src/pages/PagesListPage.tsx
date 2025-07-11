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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header
        title="CMS Designer Admin"
        showAuth={true}
        showLanguageSelector={true}
      />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('pages:pageManagement')}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Manage and design your website pages
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6">
            <PageFilters
              searchTerm={filters.searchTerm}
              onSearchChange={actions.setSearchTerm}
              statusFilter={filters.statusFilter}
              onStatusChange={actions.setStatusFilter}
            />
          </div>

          {/* Error state */}
          {error && (
            <Alert
              type="error"
              message={error}
              className="mb-6"
              onClose={() => actions.refresh()}
            />
          )}

          {/* Pages table */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <PageTable
              pages={pages}
              loading={loading}
              onOpenDesigner={handleOpenDesigner}
            />

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
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
        description="Professional content management for modern websites."
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
