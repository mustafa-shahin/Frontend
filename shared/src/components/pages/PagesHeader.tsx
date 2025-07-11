import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { useTranslation } from '../../hooks/useTranslation';

interface PagesHeaderProps {
  totalCount?: number;
  onCreatePage?: () => void;
  onRefresh?: () => void;
  loading?: boolean;
  className?: string;
}

export function PagesHeader({
  totalCount = 0,
  onCreatePage,
  onRefresh,
  loading = false,
  className,
}: PagesHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className={cn('bg-surface border-b border-border-light', className)}>
      <div className="px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Title and description */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 border border-brand-100">
                <Icon name="file-alt" className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                  {t('pages.title')}
                </h1>
                {totalCount > 0 && (
                  <p className="text-sm text-text-secondary mt-1">
                    {totalCount} {t('pages.resultsFound')}
                  </p>
                )}
              </div>
            </div>
            <p className="text-base text-text-secondary max-w-2xl leading-relaxed">
              {t('pages.subtitle')}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:flex-shrink-0">
            <Button
              variant="outline"
              size="md"
              onClick={onRefresh}
              disabled={loading}
              className="border-border-medium hover:bg-background-secondary"
            >
              <Icon
                name="refresh"
                className={cn('h-4 w-4', loading && 'animate-spin')}
              />
              <span className="hidden sm:inline-block ml-2">
                {t('common.refresh')}
              </span>
            </Button>

            {onCreatePage && (
              <Button
                variant="primary"
                size="md"
                onClick={onCreatePage}
                className="bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
              >
                <Icon name="plus" className="h-4 w-4" />
                <span className="ml-2">{t('pages.createNewPage')}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
