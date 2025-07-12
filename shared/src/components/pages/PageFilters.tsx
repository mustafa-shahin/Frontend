import { useTranslation } from 'react-i18next';
import { FormInput } from '../form/FormInput';
import { FormSelect, FormSelectOption } from '../form/FormSelect';
import { Icon } from '../ui/Icon';
import { cn } from '../../utils/cn';

export interface PageFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  className?: string;
  loading?: boolean;
}

export function PageFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  className,
  loading = false,
}: PageFiltersProps) {
  const { t } = useTranslation(['pages', 'form']);

  const statusOptions: FormSelectOption[] = [
    { value: '', label: t('pages:allStatuses') },
    {
      value: 'draft',
      label: t('pages:status.draft'),
    },
    {
      value: 'published',
      label: t('pages:status.published'),
    },
    {
      value: 'archived',
      label: t('pages:status.archived'),
    },
    {
      value: 'scheduled',
      label: t('pages:status.scheduled'),
    },
  ];

  const hasActiveFilters = searchTerm || statusFilter;

  const handleClearSearch = () => {
    onSearchChange('');
  };

  const handleClearStatus = () => {
    onStatusChange('');
  };

  const handleClearAll = () => {
    onSearchChange('');
    onStatusChange('');
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <FormInput
            type="text"
            placeholder={t('pages:searchPages')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon="search"
            rightIcon={searchTerm ? 'times' : undefined}
            onRightIconClick={searchTerm ? handleClearSearch : undefined}
            clearable={true}
            onClear={handleClearSearch}
            inputSize="md"
            disabled={loading}
            helperText="Search by page name, title, or slug"
          />
        </div>

        {/* Status Filter */}
        <div>
          <div className="relative">
            <FormSelect
              options={statusOptions}
              value={statusFilter}
              onChange={onStatusChange}
              placeholder={t('pages:filterByStatus')}
              className="h-11"
              disabled={loading}
            />
            {statusFilter && (
              <button
                onClick={handleClearStatus}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                disabled={loading}
              >
                <Icon name="times" className="text-sm" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Active filters:
            </span>
            <div className="flex items-center flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                  <Icon name="search" className="mr-1 text-xs" />"{searchTerm}"
                  <button
                    onClick={handleClearSearch}
                    className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    disabled={loading}
                  >
                    <Icon name="times" className="text-xs" />
                  </button>
                </span>
              )}
              {statusFilter && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800">
                  <Icon name="filter" className="mr-1 text-xs" />
                  {t(`pages:status.${statusFilter}`)}
                  <button
                    onClick={handleClearStatus}
                    className="ml-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                    disabled={loading}
                  >
                    <Icon name="times" className="text-xs" />
                  </button>
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleClearAll}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center"
            disabled={loading}
          >
            <Icon name="times" className="mr-1 text-xs" />
            Clear all
          </button>
        </div>
      )}

      {/* Quick Filter Suggestions */}
      {!hasActiveFilters && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Quick filters:
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onStatusChange('draft')}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              disabled={loading}
            >
              <Icon name="edit" className="mr-1 text-xs" />
              Drafts
            </button>
            <button
              onClick={() => onStatusChange('published')}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              disabled={loading}
            >
              <Icon name="check-circle" className="mr-1 text-xs" />
              Published
            </button>
            <button
              onClick={() => onStatusChange('scheduled')}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              disabled={loading}
            >
              <Icon name="clock" className="mr-1 text-xs" />
              Scheduled
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
