import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';
import { useTranslation } from '../../hooks/useTranslation';

interface PagesFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: (query: string) => void;
  loading?: boolean;
}

export function PagesFilters({
  searchQuery,
  onSearchChange,
  onSearch,
  loading = false,
}: PagesFiltersProps) {
  const { t } = useTranslation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <form onSubmit={handleSearchSubmit} className="flex gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder={t('pages.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={<Icon name="search" />}
            className="bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-300 focus:ring-blue-100"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm px-8"
        >
          {t('common.search')}
        </Button>
      </form>
    </div>
  );
}
