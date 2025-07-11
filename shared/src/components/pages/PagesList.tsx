import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useTranslation } from '../../hooks/useTranslation';
import { PagesCard } from './PagesCard';
import { PagesFilters } from './PagesFilters';
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
  onOpenDesigner?: (page: PageItem) => void;
  searchQuery?: string;
  className?: string;
}

export function PagesList({
  pages,
  loading = false,
  error,
  onPageChange,
  onPageSizeChange,
  onSearch,
  onOpenDesigner,
  searchQuery = '',
  className,
}: PagesListProps) {
  const { t } = useTranslation();
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
              <Icon
                name="exclamation-triangle"
                size="lg"
                className="text-red-500"
              />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {t('pages.errors.loadingFailed')}
            </h3>
            <p className="text-slate-600">
              {t('pages.errors.loadingDescription')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('max-w-7xl mx-auto', className)}>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {t('pages.title')}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('pages.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <PagesFilters
          searchQuery={localSearchQuery}
          onSearchChange={setLocalSearchQuery}
          onSearch={onSearch}
          loading={loading}
        />

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12">
            <div className="flex flex-col items-center justify-center text-center">
              <LoadingSpinner size="lg" className="mb-4" />
              <span className="text-slate-600">{t('common.loading')}...</span>
            </div>
          </div>
        ) : pages.data.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-slate-50 rounded-full flex items-center justify-center">
                <Icon name="file-alt" size="2xl" className="text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {t('pages.noPages')}
              </h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                {searchQuery
                  ? t('pages.noSearchResults')
                  : t('pages.noPagesDescription')}
              </p>
              {!searchQuery && (
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
                  <Icon name="plus" size="sm" className="mr-2" />
                  {t('pages.createFirstPage')}
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Pages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {pages.data.map((page) => (
                <PagesCard
                  key={page.id}
                  page={page}
                  onOpenDesigner={onOpenDesigner}
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
  );
}
