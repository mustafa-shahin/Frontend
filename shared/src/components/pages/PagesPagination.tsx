import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { useTranslation } from '../../hooks/useTranslation';
import type { PagesData } from './PagesList';

interface PagesPaginationProps {
  pages: PagesData;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  className?: string;
}

const PAGE_SIZE_OPTIONS = [
  { value: 12, label: '12' },
  { value: 24, label: '24' },
  { value: 48, label: '48' },
  { value: 96, label: '96' },
];

export function PagesPagination({
  pages,
  onPageChange,
  onPageSizeChange,
  className,
}: PagesPaginationProps) {
  const { t } = useTranslation();

  if (pages.totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, pages.pageNumber - delta);
      i <= Math.min(pages.totalPages - 1, pages.pageNumber + delta);
      i++
    ) {
      range.push(i);
    }

    if (pages.pageNumber - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (pages.pageNumber + delta < pages.totalPages - 1) {
      rangeWithDots.push('...', pages.totalPages);
    } else if (pages.totalPages > 1) {
      rangeWithDots.push(pages.totalPages);
    }

    return rangeWithDots;
  };

  const pageNumbers = generatePageNumbers();
  const startItem = Math.min(
    (pages.pageNumber - 1) * pages.pageSize + 1,
    pages.totalCount
  );
  const endItem = Math.min(pages.pageNumber * pages.pageSize, pages.totalCount);

  return (
    <div
      className={cn(
        'bg-surface rounded-xl border border-border-light shadow-card',
        className
      )}
    >
      <div className="px-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Results Info */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-text-secondary">
              <span className="font-medium text-text-primary">{startItem}</span>{' '}
              {t('pages.pagination.to')}{' '}
              <span className="font-medium text-text-primary">{endItem}</span>{' '}
              {t('pages.pagination.of')}{' '}
              <span className="font-medium text-text-primary">
                {pages.totalCount}
              </span>{' '}
              {t('pages.pagination.results')}
            </div>

            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-text-secondary whitespace-nowrap">
                {t('pages.pagination.perPage')}:
              </label>
              <select
                value={pages.pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="rounded-md border border-border-light bg-surface px-2 py-1 text-sm text-text-primary focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                {PAGE_SIZE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-1">
            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pages.pageNumber - 1)}
              disabled={!pages.hasPreviousPage}
              className="border-border-light hover:bg-background-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="chevron-left" className="h-4 w-4" />
              <span className="hidden sm:inline-block ml-1">
                {t('common.previous')}
              </span>
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 mx-2">
              {pageNumbers.map((number, index) => {
                if (number === '...') {
                  return (
                    <span
                      key={`dots-${index}`}
                      className="px-2 py-1 text-sm text-text-tertiary"
                    >
                      ...
                    </span>
                  );
                }

                const isCurrentPage = number === pages.pageNumber;
                return (
                  <Button
                    key={number}
                    variant={isCurrentPage ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => onPageChange(number as number)}
                    className={cn(
                      'min-w-[2.5rem]',
                      isCurrentPage
                        ? 'bg-brand-600 hover:bg-brand-700 text-white border-brand-600'
                        : 'border-border-light hover:bg-background-secondary text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {number}
                  </Button>
                );
              })}
            </div>

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pages.pageNumber + 1)}
              disabled={!pages.hasNextPage}
              className="border-border-light hover:bg-background-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline-block mr-1">
                {t('common.next')}
              </span>
              <Icon name="chevron-right" className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Page Info - Mobile */}
        <div className="mt-3 sm:hidden">
          <div className="text-center text-sm text-text-secondary">
            {t('pages.pagination.page')} {pages.pageNumber}{' '}
            {t('pages.pagination.ofPages', { total: pages.totalPages })}
          </div>
        </div>
      </div>
    </div>
  );
}
