import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PagesList, usePages, type PageItem } from '@frontend/shared';

export function PagesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const {
    pages,
    loading,
    error,
    setSearchParams,
    createPage,
    deletePage,
    duplicatePage,
    publishPage,
    unpublishPage,
  } = usePages({
    initialParams: {
      pageNumber: 1,
      pageSize: 10,
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

  const handleEdit = (page: PageItem) => {
    navigate(`/pages/${page.id}/edit`);
  };

  const handleView = (page: PageItem) => {
    // Open in new tab to view the actual page
    const baseUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : window.location.origin;
    window.open(`${baseUrl}/${page.slug}`, '_blank');
  };

  const handleDelete = async (page: PageItem) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${page.title}"? This action cannot be undone.`
      )
    ) {
      try {
        await deletePage(page.id);
      } catch (error) {
        console.error('Failed to delete page:', error);
        // Error is already handled by the hook
      }
    }
  };

  const handleDuplicate = async (page: PageItem) => {
    const newName = prompt(
      'Enter a name for the duplicated page:',
      `${page.name} (Copy)`
    );
    if (newName && newName.trim()) {
      try {
        await duplicatePage(page.id, newName.trim());
      } catch (error) {
        console.error('Failed to duplicate page:', error);
        // Error is already handled by the hook
      }
    }
  };

  const handleCreate = () => {
    navigate('/pages/create');
  };

  const handlePublishToggle = async (page: PageItem) => {
    try {
      if (page.status === 'Published') {
        await unpublishPage(page.id);
      } else {
        await publishPage(page.id);
      }
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <PagesList
        pages={pages}
        loading={loading}
        error={error}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        onSearch={handleSearch}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
        onDuplicate={handleDuplicate}
        onCreate={handleCreate}
        searchQuery={searchQuery}
      />
    </div>
  );
}
