import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  className,
}: PaginationProps) {
  const { t } = useTranslation('common');

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const generatePageNumbers = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show
    const half = Math.floor(showPages / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, start + showPages - 1);

    // Adjust start if we're near the end
    if (end - start < showPages - 1) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-center justify-between gap-4',
        className
      )}
    >
      {/* Results info */}
      <div className="text-sm text-gray-700 dark:text-gray-300">
        {t('showingResults', {
          from: startItem,
          to: endItem,
          total: totalItems,
        })}
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2"
        >
          <i className="fas fa-chevron-left" />
          <span className="ml-2 hidden sm:inline">{t('previous')}</span>
        </Button>

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {/* First page */}
          {generatePageNumbers()[0] > 1 && (
            <>
              <Button
                variant={1 === currentPage ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onPageChange(1)}
                className="w-10 h-10"
              >
                1
              </Button>
              {generatePageNumbers()[0] > 2 && (
                <span className="px-2 text-gray-500">...</span>
              )}
            </>
          )}

          {/* Main page numbers */}
          {generatePageNumbers().map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onPageChange(page)}
              className="w-10 h-10"
            >
              {page}
            </Button>
          ))}

          {/* Last page */}
          {generatePageNumbers()[generatePageNumbers().length - 1] <
            totalPages && (
            <>
              {generatePageNumbers()[generatePageNumbers().length - 1] <
                totalPages - 1 && (
                <span className="px-2 text-gray-500">...</span>
              )}
              <Button
                variant={totalPages === currentPage ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => onPageChange(totalPages)}
                className="w-10 h-10"
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2"
        >
          <span className="mr-2 hidden sm:inline">{t('next')}</span>
          <i className="fas fa-chevron-right" />
        </Button>
      </div>
    </div>
  );
}
