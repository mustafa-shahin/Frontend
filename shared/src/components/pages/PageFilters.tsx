import { useTranslation } from 'react-i18next';
import { FormInput } from '../form/FormInput';
import { FormSelect, FormSelectOption } from '../form/FormSelect';
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
    { value: 'draft', label: t('pages:status.draft') },
    { value: 'published', label: t('pages:status.published') },
    { value: 'archived', label: t('pages:status.archived') },
    { value: 'scheduled', label: t('pages:status.scheduled') },
  ];

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
      <div>
        <FormInput
          type="text"
          placeholder={t('pages:searchPages')}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          leftIcon={<i className="fas fa-search" />}
        />
      </div>
      <div>
        <FormSelect
          options={statusOptions}
          value={statusFilter}
          onChange={onStatusChange}
          placeholder={t('pages:filterByStatus')}
        />
      </div>
    </div>
  );
}
