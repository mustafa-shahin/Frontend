import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { useTranslation } from '../../hooks/useTranslation';
import type { PageItem } from './PagesList';

interface PagesCardProps {
  page: PageItem;
  onOpenDesigner?: (page: PageItem) => void;
  onEdit?: (page: PageItem) => void;
  onDuplicate?: (page: PageItem) => void;
  onDelete?: (page: PageItem) => void;
  onPublish?: (page: PageItem) => void;
  onUnpublish?: (page: PageItem) => void;
  className?: string;
}

const STATUS_STYLES = {
  Published: {
    bg: 'bg-success-50',
    text: 'text-success-700',
    border: 'border-success-200',
    icon: 'globe' as const,
  },
  Draft: {
    bg: 'bg-warning-50',
    text: 'text-warning-700',
    border: 'border-warning-200',
    icon: 'edit' as const,
  },
  Archived: {
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    border: 'border-slate-200',
    icon: 'archive' as const,
  },
} as const;

export function PagesCard({
  page,
  onOpenDesigner,
  onEdit,
  onDuplicate,
  onDelete,
  onPublish,
  onUnpublish,
  className,
}: PagesCardProps) {
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

  const statusStyle =
    STATUS_STYLES[page.status as keyof typeof STATUS_STYLES] ||
    STATUS_STYLES.Draft;

  return (
    <div
      className={cn(
        'group relative bg-surface rounded-xl border border-border-light hover:border-border-medium',
        'shadow-card hover:shadow-card-hover transition-all duration-200 overflow-hidden',
        className
      )}
    >
      {/* Header Section */}
      <div className="p-6 pb-4">
        <div className="flex items-start gap-4">
          {/* Page Icon & Type */}
          <div className="flex-shrink-0">
            <div
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-lg border',
                page.hasChildren
                  ? 'bg-brand-50 border-brand-200'
                  : 'bg-slate-50 border-slate-200'
              )}
            >
              <Icon
                name={page.hasChildren ? 'folder' : 'file-alt'}
                className={cn(
                  'h-6 w-6',
                  page.hasChildren ? 'text-brand-600' : 'text-slate-600'
                )}
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-text-primary line-clamp-1 mb-1">
                  {page.title}
                </h3>
                <p className="text-sm text-text-secondary line-clamp-1 mb-2">
                  {page.name}
                </p>
                <a
                  href={getPageUrl(page)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 transition-colors"
                >
                  <span className="text-text-tertiary">/</span>
                  <span className="font-medium">{page.slug}</span>
                  <Icon name="external-link-alt" className="h-3 w-3" />
                </a>
              </div>

              {/* Status Badge */}
              <div
                className={cn(
                  'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium',
                  statusStyle.bg,
                  statusStyle.text,
                  statusStyle.border
                )}
              >
                <Icon name={statusStyle.icon} className="h-3 w-3" />
                {t(`pages.status.${page.status}`)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Section */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-4 text-xs text-text-tertiary">
          <div className="flex items-center gap-1">
            <Icon name="clock" className="h-3 w-3" />
            <span>{formatDate(page.updatedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="layers" className="h-3 w-3" />
            <span>
              v{page.currentVersion} ({page.versionCount} {t('pages.total')})
            </span>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="border-t border-border-light bg-background-secondary/30 p-4">
        <div className="flex items-center gap-2">
          {/* Primary Action */}
          {onOpenDesigner && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onOpenDesigner(page)}
              className="flex-1 bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
            >
              <Icon name="paint-brush" className="h-4 w-4 mr-2" />
              {t('pages.openInDesigner')}
            </Button>
          )}

          {/* Secondary Actions */}
          <div className="flex items-center gap-1">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(page)}
                className="border-border-medium hover:bg-background-secondary"
                title={t('pages.actions.edit')}
              >
                <Icon name="edit" className="h-4 w-4" />
              </Button>
            )}

            {page.status === 'Draft' && onPublish && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPublish(page)}
                className="border-border-medium hover:bg-background-secondary text-success-600 hover:text-success-700"
                title={t('pages.actions.publish')}
              >
                <Icon name="globe" className="h-4 w-4" />
              </Button>
            )}

            {page.status === 'Published' && onUnpublish && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onUnpublish(page)}
                className="border-border-medium hover:bg-background-secondary text-warning-600 hover:text-warning-700"
                title={t('pages.actions.unpublish')}
              >
                <Icon name="eye-slash" className="h-4 w-4" />
              </Button>
            )}

            {onDuplicate && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDuplicate(page)}
                className="border-border-medium hover:bg-background-secondary"
                title={t('pages.actions.duplicate')}
              >
                <Icon name="copy" className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-50/0 to-brand-50/0 group-hover:from-brand-50/5 group-hover:to-brand-50/0 transition-all duration-200 pointer-events-none rounded-xl" />
    </div>
  );
}
