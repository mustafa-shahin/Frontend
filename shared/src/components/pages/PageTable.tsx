import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';
import { Button } from '../ui/Button';
import { LoadingSpinner } from '../ui/LoadingSpinner';

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

const statusColors = {
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  published:
    'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200',
  archived: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200',
  scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
        <span className="ml-3 text-gray-600 dark:text-gray-400">
          {t('pages:loadingPages')}
        </span>
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-4">
          <i className="fas fa-file-alt text-6xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          {t('pages:noPages')}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{t('pages:noPages')}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg',
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('pages:pageName')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('pages:pageStatus')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('pages:pageSlug')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('pages:updatedAt')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t('pages:actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {pages.map((page) => (
              <tr
                key={page.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {page.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {page.title}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={cn(
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      statusColors[page.status]
                    )}
                  >
                    {t(`pages:status.${page.status}`)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white font-mono">
                    /{page.slug}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(page.updatedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onOpenDesigner(page.id)}
                    className="inline-flex items-center"
                  >
                    <i className="fas fa-paint-brush mr-2" />
                    {t('pages:openInDesigner')}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
