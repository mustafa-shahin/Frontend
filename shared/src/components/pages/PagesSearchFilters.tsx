import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { useTranslation } from '../../hooks/useTranslation';

export interface FilterOptions {
  status?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

interface PagesSearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: (query: string) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  loading?: boolean;
  className?: string;
}

const STATUS_OPTIONS = [
  { value: '', label: 'allStatuses' },
  { value: 'Published', label: 'published' },
  { value: 'Draft', label: 'draft' },
  { value: 'Archived', label: 'archived' },
];

const SORT_OPTIONS = [
  { value: 'UpdatedAt', label: 'lastUpdated' },
  { value: 'Title', label: 'title' },
  { value: 'CreatedAt', label: 'dateCreated' },
  { value: 'Name', label: 'name' },
];

export function PagesSearchFilters({
  searchQuery,
  onSearchChange,
  onSearch,
  filters,
  onFiltersChange,
  loading = false,
  className
}: PagesSearchFiltersProps) {
  const { t } = useTranslation();
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSortDirectionToggle = () => {
    const newDirection = filters.sortDirection === 'asc' ? 'desc' : 'asc';
    onFiltersChange({ ...filters, sortDirection: newDirection });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
    onSearchChange('');
  };

  const hasActiveFilters = searchQuery || filters.status || filters.sortBy !== 'UpdatedAt';

  return (
    <div className={cn(
      'bg-surface rounded-xl border border-border-light shadow-card',
      className
    )}>
      {/* Search Section */}
      <div className="p-6">
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="flex-1">
            <Input
              type="search"
              placeholder={t('pages.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              leftIcon={<Icon name="search" className="h-4 w-4 text-text-tertiary" />}
              className="bg-background-secondary border-border-light focus:bg-surface focus:border-brand-300 focus:ring-brand-100"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="bg-brand-600 hover:bg-brand-700 text-white shadow-sm px-6"
          >
            {t('common.search')}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className={cn(
              "border-border-medium hover:bg-background-secondary",
              isFiltersExpanded && "bg-background-secondary"
            )}
          >
            <Icon name="filter" className="h-4 w-4" />
            <span className="hidden sm:inline-block ml-2">
              {t('common.filter')}
            </span>
            <Icon 
              name={isFiltersExpanded ? "chevron-up" : "chevron-down"}
              className="h-4 w-4 ml-1"
            />
          </Button>
        </form>
      </div>

      {/* Filters Section */}
      {isFiltersExpanded && (
        <div className="border-t border-border-light p-6 bg-background-secondary/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">
                {t('pages.filterByStatus')}
              </label>
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full rounded-md border border-border-light bg-surface px-3 py-2 text-sm text-text-primary focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(`pages.${option.label}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">
                {t('pages.sortBy')}
              </label>
              <select
                value={filters.sortBy || 'UpdatedAt'}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full rounded-md border border-border-light bg-surface px-3 py-2 text-sm text-text-primary focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t(`pages.${option.label}`)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Direction */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">
                {t('pages.sortDirection')}
              </label>
              <Button
                type="button"
                variant="outline"
                onClick={handleSortDirectionToggle}
                className="w-full justify-start border-border-light hover:bg-background-secondary"
              >
                <Icon 
                  name={filters.sortDirection === 'asc' ? 'arrow-up' : 'arrow-down'}
                  className="h-4 w-4 mr-2"
                />
                {t(filters.sortDirection === 'asc' ? 'pages.sortAscending' : 'pages.sortDescending')}
              </Button>
            </div>

            {/* Clear Filters */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-secondary">
                {t('common.actions')}
              </label>
              <Button
                type="button"
                variant="outline"
                onClick={clearAllFilters}
                disabled={!hasActiveFilters}
                className="w-full justify-start border-border-light hover:bg-background-secondary disabled:opacity-50"
              >
                <Icon name="times" className="h-4 w-4 mr-2" />
                {t('common.clear')}
              </Button>
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-border-light">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-text-secondary">
                  {t('common.activeFilters')}:
                </span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-50 text-brand-700 text-xs">
                    {t('common.search')}: "{searchQuery}"
                    <button
                      onClick={() => onSearchChange('')}
                      className="hover:text-brand-900"
                    >
                      <Icon name="times" className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {filters.status && (
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-50 text-brand-700 text-xs">
                    {t('pages.status')}: {t(`pages.${filters.status.toLowerCase()}`)}
                    <button
                      onClick={() => handleFilterChange('status', '')}
                      className="hover:text-brand-900"
                    >
                      <Icon name="times" className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}