import { useState, useCallback } from 'react';
import { PagesList, usePages, type PageItem } from '@frontend/shared';
import type { FilterOptions } from '@frontend/shared';

export function PagesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    sortBy: 'UpdatedAt',
    sortDirection: 'desc',
  });

  const { pages, loading, error, setSearchParams, refetch } = usePages({
    initialParams: {
      pageNumber: 1,
      pageSize: 12,
      sortBy: 'UpdatedAt',
      sortDirection: 'Desc',
    },
  });

  const handlePageChange = useCallback(
    (page: number) => {
      setSearchParams({ pageNumber: page });
    },
    [setSearchParams]
  );

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      setSearchParams({ pageNumber: 1, pageSize });
    },
    [setSearchParams]
  );

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      setSearchParams({
        pageNumber: 1,
        searchTerm: query || undefined,
      });
    },
    [setSearchParams]
  );

  const handleFiltersChange = useCallback(
    (newFilters: FilterOptions) => {
      setFilters(newFilters);
      setSearchParams({
        pageNumber: 1,
        status: newFilters.status || undefined,
        sortBy: newFilters.sortBy || 'UpdatedAt',
        sortDirection: newFilters.sortDirection === 'asc' ? 'Asc' : 'Desc',
      });
    },
    [setSearchParams]
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleOpenDesigner = useCallback((page: PageItem) => {
    // TODO: Implement designer mode redirect
    console.log('Open page in designer mode:', page.id);
    // For now, just log - designer mode will be implemented later
    alert(`Designer mode for page "${page.title}" will be implemented soon.`);
  }, []);

  const handleCreatePage = useCallback(() => {
    // TODO: Implement page creation
    console.log('Create new page');
    alert('Page creation will be implemented soon.');
  }, []);

  const handleEditPage = useCallback((page: PageItem) => {
    // TODO: Implement page editing
    console.log('Edit page:', page.id);
    alert(`Edit page "${page.title}" will be implemented soon.`);
  }, []);

  const handleDuplicatePage = useCallback((page: PageItem) => {
    console.log('Duplicate page:', page.id);
    alert(`Duplicate page "${page.title}" will be implemented soon.`);
  }, []);

  const handleDeletePage = useCallback((page: PageItem) => {
    // TODO: Implement page deletion with confirmation
    console.log('Delete page:', page.id);
  }, []);

  const handlePublishPage = useCallback((page: PageItem) => {
    // TODO: Implement page publishing
    console.log('Publish page:', page.id);
    alert(`Publish page "${page.title}" will be implemented soon.`);
  }, []);

  const handleUnpublishPage = useCallback((page: PageItem) => {
    // TODO: Implement page unpublishing
    console.log('Unpublish page:', page.id);
    alert(`Unpublish page "${page.title}" will be implemented soon.`);
  }, []);

  return (
    <PagesList
      pages={pages}
      loading={loading}
      error={error}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      onSearch={handleSearch}
      onFiltersChange={handleFiltersChange}
      onRefresh={handleRefresh}
      onOpenDesigner={handleOpenDesigner}
      onCreatePage={handleCreatePage}
      onEditPage={handleEditPage}
      onDuplicatePage={handleDuplicatePage}
      onDeletePage={handleDeletePage}
      onPublishPage={handlePublishPage}
      onUnpublishPage={handleUnpublishPage}
      searchQuery={searchQuery}
      filters={filters}
    />
  );
}
