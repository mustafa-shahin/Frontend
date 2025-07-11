import React from 'react';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { useTranslation } from '../../hooks/useTranslation';
import type { PagesData } from './PagesList';

interface PagesPaginationProps {
  pages: PagesData;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export function PagesPagination({
  pages,
  onPageChange,
  onPageSizeChange,
}: PagesPaginationProps) {
  const { t } = useTranslation();

  if (pages.totalPages <= 1) return null;

  const pageNumbers = [];
  const startPage = Math.max(1, pages.pageNumber - 2);
  const endPage = Math.min(pages.totalPages, pages.pageNumber + 2);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Results info */}
        <div className="text-sm text-slate-600">
          <span>
            {t('pages.pagination.showing')}{' '}
            <span className="font-medium text-slate-900">
              {Math.min(
                (pages.pageNumber - 1) * pages.pageSize + 1,
                pages.totalCount
              )}
            </span>{' '}
            {t('pages.pagination.to')}{' '}
            <span className="font-medium text-slate-900">
              {Math.min(pages.pageNumber * pages.pageSize, pages.totalCount)}
            </span>{' '}
            {t('pages.pagination.of')}{' '}
            <span className="font-medium text-slate-900">
              {pages.totalCount}
            </span>{' '}
            {t('pages.pagination.results')}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Page size selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600 whitespace-nowrap">
              {t('pages.pagination.perPage')}
            </label>
            <select
              value={pages.pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white text-slate-900 focus:border-blue-300 focus:ring-blue-100 focus:ring-2 focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Page navigation */}
          <nav className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pages.pageNumber - 1)}
              disabled={!pages.hasPreviousPage}
              className="border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Icon name="chevron-left" size="sm" />
            </Button>

            {pageNumbers.map((number) => (
              <Button
                key={number}
                variant={number === pages.pageNumber ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onPageChange(number)}
                className={
                  number === pages.pageNumber
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }
              >
                {number}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pages.pageNumber + 1)}
              disabled={!pages.hasNextPage}
              className="border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Icon name="chevron-right" size="sm" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
