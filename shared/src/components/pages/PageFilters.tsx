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
}

export function PageFilters({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  className,
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

  return (
    <div className={cn('space-y-4', className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2">
          <FormInput
            type="text"
            placeholder={t('pages:searchPages')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Icon name="search" className="text-gray-400" />}
            className="h-10"
          />
        </div>

        {/* Status Filter */}
        <div>
          <FormSelect
            options={statusOptions}
            value={statusFilter}
            onChange={onStatusChange}
            placeholder={t('pages:filterByStatus')}
            className="h-10"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">
              Active filters:
            </span>
            <div className="flex items-center space-x-2">
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Icon name="search" className="mr-1 text-xs" />"{searchTerm}"
                  <button
                    onClick={() => onSearchChange('')}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <Icon name="times" className="text-xs" />
                  </button>
                </span>
              )}
              {statusFilter && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Icon name="filter" className="mr-1 text-xs" />
                  {t(`pages:status.${statusFilter}`)}
                  <button
                    onClick={() => onStatusChange('')}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <Icon name="times" className="text-xs" />
                  </button>
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              onSearchChange('');
              onStatusChange('');
            }}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center"
          >
            <Icon name="times" className="mr-1 text-xs" />
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
