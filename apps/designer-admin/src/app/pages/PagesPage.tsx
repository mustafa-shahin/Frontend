import { useState } from 'react';
import { PagesList, usePages, type PageItem } from '@frontend/shared';

export function PagesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const { pages, loading, error, setSearchParams } = usePages({
    initialParams: {
      pageNumber: 1,
      pageSize: 12, // Changed to 12 for better grid layout
      sortBy: 'UpdatedAt',
      sortDirection: 'Desc',
    },
  });

  const handlePageChange = (page: number) => {
    setSearchParams({ pageNumber: page });
  };

  const handlePageSizeChange = (pageSize: number) => {
    setSearchParams({ pageNumber: 1, pageSize });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchParams({ pageNumber: 1, searchTerm: query });
  };

  const handleOpenDesigner = (page: PageItem) => {
    // TODO: Implement designer mode redirect
    console.log('Open page in designer mode:', page.id);
    // For now, just log - designer mode will be implemented later
    alert(`Designer mode for page "${page.title}" will be implemented soon.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <PagesList
          pages={pages}
          loading={loading}
          error={error}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          onSearch={handleSearch}
          onOpenDesigner={handleOpenDesigner}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
}
