import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { useTranslation } from '../../hooks/useTranslation';
import type { PageItem } from './PagesList';

interface PagesCardProps {
  page: PageItem;
  onOpenDesigner?: (page: PageItem) => void;
}

const statusStyles = {
  Draft: 'bg-amber-50 text-amber-700 border-amber-200',
  Published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Archived: 'bg-slate-50 text-slate-700 border-slate-200',
};

export function PagesCard({ page, onOpenDesigner }: PagesCardProps) {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPageUrl = (page: PageItem) => {
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : window.location.origin;
    return `${baseUrl}/${page.slug}`;
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {page.hasChildren && (
                <Icon
                  name="folder"
                  size="sm"
                  className="text-blue-500 flex-shrink-0"
                />
              )}
              <h3 className="text-lg font-semibold text-slate-900 line-clamp-1">
                {page.title}
              </h3>
            </div>
            <p className="text-sm text-slate-600 mb-1 line-clamp-1">
              {page.name}
            </p>
            <a
              href={getPageUrl(page)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
            >
              /{page.slug}
              <Icon name="external-link-alt" size="xs" />
            </a>
          </div>

          <span
            className={cn(
              'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
              statusStyles[page.status as keyof typeof statusStyles]
            )}
          >
            {t(`pages.status.${page.status}`)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Icon name="clock" size="xs" />
              {formatDate(page.updatedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="file-alt" size="xs" />v{page.currentVersion} (
              {page.versionCount} {t('pages.total')})
            </span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="px-6 pb-6">
        {onOpenDesigner && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onOpenDesigner(page)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          >
            <Icon name="paint-brush" size="sm" className="mr-2" />
            {t('pages.openInDesigner')}
          </Button>
        )}
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/5 group-hover:to-blue-50/0 transition-all duration-200 pointer-events-none" />
    </div>
  );
}
