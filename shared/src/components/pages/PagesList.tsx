import { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useTranslation } from '../../hooks/useTranslation';
import { PagesHeader } from './PagesHeader';
import { PagesSearchFilters, type FilterOptions } from './PagesSearchFilters';
import { PagesCard } from './PagesCard';
import { PagesPagination } from './PagesPagination';

// Types for the page data
export interface PageItem {
  id: number;
  name: string;
  title: string;
  slug: string;
  status: 'Draft' | 'Published' | 'Archived';
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
  onFiltersChange: (filters: FilterOptions) => void;
  onRefresh: () => void;
  onOpenDesigner?: (page: PageItem) => void;
  onCreatePage?: () => void;
  onEditPage?: (page: PageItem) => void;
  onDuplicatePage?: (page: PageItem) => void;
  onDeletePage?: (page: PageItem) => void;
  onPublishPage?: (page: PageItem) => void;
  onUnpublishPage?: (page: PageItem) => void;
  searchQuery?: string;
  filters?: FilterOptions;
  className?: string;
}

export function PagesList({
  pages,
  loading = false,
  error,
  onPageChange,
  onPageSizeChange,
  onSearch,
  onFiltersChange,
  onRefresh,
  onOpenDesigner,
  onCreatePage,
  onEditPage,
  onDuplicatePage,
  onDeletePage,
  onPublishPage,
  onUnpublishPage,
  searchQuery = '',
  filters = {},
  className,
}: PagesListProps) {
  const { t } = useTranslation();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleSearchChange = (query: string) => {
    setLocalSearchQuery(query);
  };

  const handleSearch = (query: string) => {
    onSearch(query);
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="px-6 py-12 sm:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="bg-surface rounded-xl border border-border-light shadow-card p-8 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-error-50 mb-6">
                <Icon
                  name="exclamation-triangle"
                  className="h-8 w-8 text-error-500"
                />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                {t('pages.errors.loadingFailed')}
              </h3>
              <p className="text-text-secondary mb-6 leading-relaxed">
                {t('pages.errors.loadingDescription')}
              </p>
              <Button
                variant="primary"
                onClick={onRefresh}
                className="bg-brand-600 hover:bg-brand-700 text-white"
              >
                <Icon name="refresh" className="h-4 w-4 mr-2" />
                {t('common.refresh')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Header */}
      <PagesHeader
        totalCount={pages.totalCount}
        onCreatePage={onCreatePage}
        onRefresh={onRefresh}
        loading={loading}
      />

      {/* Content */}
      <div className="px-6 pb-12 sm:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Search and Filters */}
          <PagesSearchFilters
            searchQuery={localSearchQuery}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
            filters={localFilters}
            onFiltersChange={handleFiltersChange}
            loading={loading}
          />

          {/* Loading State */}
          {loading && (
            <div className="bg-surface rounded-xl border border-border-light shadow-card p-12">
              <div className="flex flex-col items-center justify-center text-center">
                <LoadingSpinner size="lg" className="mb-4 text-brand-600" />
                <p className="text-text-secondary">{t('common.loading')}...</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && pages.data.length === 0 && (
            <div className="bg-surface rounded-xl border border-border-light shadow-card p-12">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 mb-6">
                  <Icon name="file-alt" className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {searchQuery || Object.keys(localFilters).length > 0
                    ? t('pages.noSearchResults')
                    : t('pages.noPages')}
                </h3>
                <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
                  {searchQuery || Object.keys(localFilters).length > 0
                    ? t('pages.noSearchResultsDescription')
                    : t('pages.noPagesDescription')}
                </p>
                {onCreatePage &&
                  !searchQuery &&
                  Object.keys(localFilters).length === 0 && (
                    <Button
                      variant="primary"
                      onClick={onCreatePage}
                      className="bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
                    >
                      <Icon name="plus" className="h-4 w-4 mr-2" />
                      {t('pages.createFirstPage')}
                    </Button>
                  )}
              </div>
            </div>
          )}

          {/* Pages Grid */}
          {!loading && pages.data.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {pages.data.map((page) => (
                  <PagesCard
                    key={page.id}
                    page={page}
                    onOpenDesigner={onOpenDesigner}
                    onEdit={onEditPage}
                    onDuplicate={onDuplicatePage}
                    onDelete={onDeletePage}
                    onPublish={onPublishPage}
                    onUnpublish={onUnpublishPage}
                  />
                ))}
              </div>

              {/* Pagination */}
              <PagesPagination
                pages={pages}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
