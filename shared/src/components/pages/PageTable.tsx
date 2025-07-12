import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Icon } from '../ui/Icon';

export interface Page {
  id: number;
  name: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived' | 'scheduled';
  createdAt: string;
  updatedAt: string;
  publishedOn?: string;
}

export interface PageTableProps {
  pages: Page[];
  loading?: boolean;
  onOpenDesigner: (pageId: number) => void;
  className?: string;
}

const statusConfig: Record<string, { color: string; icon: string }> = {
  draft: {
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: 'edit',
  },
  published: {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: 'check-circle',
  },
  archived: {
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: 'archive',
  },
  scheduled: {
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: 'clock',
  },
};

export function PageTable({
  pages,
  loading = false,
  onOpenDesigner,
  className,
}: PageTableProps) {
  const { t } = useTranslation(['pages', 'common']);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex items-center space-x-3">
          <LoadingSpinner size="lg" />
          <span className="text-gray-600 font-medium">
            {t('pages:loadingPages')}
          </span>
        </div>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('pages:noPages')}
        </h3>
        <p className="text-gray-600">No pages found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <span>{t('pages:pageName')}</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <span>{t('pages:pageStatus')}</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <span>{t('pages:pageSlug')}</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="flex items-center space-x-2">
                  <span>{t('pages:updatedAt')}</span>
                </div>
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider ">
                {t('pages:actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map((page) => {
              const statusStyle =
                statusConfig[page.status] || statusConfig.draft; // Fallback to draft if status not found

              return (
                <tr
                  key={page.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm  font-semibold text-gray-900 truncate">
                          {page.name}
                        </div>
                        <div className="text-sm  text-gray-500 truncate">
                          {page.title}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 ">
                    <div
                      className={cn(
                        'inline-flex items-center px-3 py-1  text-xs font-medium'
                      )}
                    >
                      {t(`pages:status.${page.status}`)}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center space-x-2">
                      <code className="text-sm  px-2 py-1 rounded font-mono text-gray-700">
                        /{page.slug}
                      </code>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {formatDate(page.updatedAt)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatTime(page.updatedAt)}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenDesigner(page.id)}
                        className="inline-flex items-center text-3xl"
                      >
                        <Icon name="chevron-right" className="mr-2 text-3xl" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
