import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Table,
  TableColumn,
  ConfirmModal,
  PagedResult,
  PageStatus,
  PageListDto,
  CreatePageFormData,
  UpdatePageFormData,
  formatDateTime,
  LoadingSpinner,
  getPageStatusLabel,
} from '@frontend/shared';
import { CrudModal } from '../../components/auth/crud/CrudModal';
import { PageForm } from './components/PageForm';
import { usePagesApi } from './hooks/usePagesApi';

export const Pages: React.FC = () => {
  const [pages, setPages] = useState<PageListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState<PageListDto | null>(null);
  const [editPageData, setEditPageData] = useState<any>(null);
  const [loadingEditData, setLoadingEditData] = useState(false);

  // Notification states
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    getPages,
    getPageById,
    createPage,
    updatePage,
    deletePage,
    publishPage,
    unpublishPage,
    loading: apiLoading,
  } = usePagesApi();

  const loadPages = async (page = 1, pageSize = 10, search?: string) => {
    try {
      setLoading(true);
      console.log('Loading pages...', { page, pageSize, search });
      const result = await getPages(page, pageSize, search);
      console.log('Pages loaded:', result);

      setPages(result.items || []);
      setPagination({
        current: page,
        pageSize,
        total: result.totalCount || 0,
      });
      setErrorMessage('');
    } catch (error) {
      console.error('Failed to load pages:', error);
      setErrorMessage('Failed to load pages. Please try again.');
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  // Auto-hide success/error messages
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  // Handle search with debounce
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm !== '') {
        loadPages(1, pagination.pageSize, searchTerm);
      } else {
        loadPages(1, pagination.pageSize);
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm]);

  const handleCreatePage = async (data: CreatePageFormData) => {
    try {
      console.log('Creating page with data:', data);
      const newPage = await createPage(data);
      console.log('Page created successfully:', newPage);

      setCreateModalOpen(false);
      setSuccessMessage(`Page "${newPage.name}" created successfully!`);
      loadPages(pagination.current, pagination.pageSize, searchTerm);
    } catch (error: any) {
      console.error('Failed to create page:', error);

      // Extract error message from the API response
      let errorMsg = 'Failed to create page. Please try again.';
      if (error?.data?.errors) {
        const errors = Object.values(error.data.errors).flat();
        errorMsg = `Validation errors: ${errors.join(', ')}`;
      } else if (error?.message) {
        errorMsg = error.message;
      }

      setErrorMessage(errorMsg);
    }
  };

  const handleEditClick = async (page: PageListDto) => {
    try {
      setLoadingEditData(true);
      setSelectedPage(page);
      setEditModalOpen(true);

      console.log('Loading page data for editing:', page.id);
      // Load full page data for editing
      const fullPageData = await getPageById(page.id);
      console.log('Full page data loaded:', fullPageData);

      setEditPageData(fullPageData);
      setErrorMessage('');
    } catch (error) {
      console.error('Failed to load page for editing:', error);
      setErrorMessage('Failed to load page data for editing.');
      setEditModalOpen(false);
      setSelectedPage(null);
    } finally {
      setLoadingEditData(false);
    }
  };

  const handleEditPage = async (data: UpdatePageFormData) => {
    if (!selectedPage) return;

    try {
      console.log('Updating page with data:', data);
      const updatedPage = await updatePage(selectedPage.id, data);
      console.log('Page updated successfully:', updatedPage);

      setEditModalOpen(false);
      setSelectedPage(null);
      setEditPageData(null);
      setSuccessMessage(`Page "${updatedPage.name}" updated successfully!`);
      loadPages(pagination.current, pagination.pageSize, searchTerm);
    } catch (error: any) {
      console.error('Failed to update page:', error);

      let errorMsg = 'Failed to update page. Please try again.';
      if (error?.data?.errors) {
        const errors = Object.values(error.data.errors).flat();
        errorMsg = `Validation errors: ${errors.join(', ')}`;
      } else if (error?.message) {
        errorMsg = error.message;
      }

      setErrorMessage(errorMsg);
    }
  };

  const handleDeleteClick = (page: PageListDto) => {
    setSelectedPage(page);
    setDeleteModalOpen(true);
  };

  const handleDeletePage = async () => {
    if (!selectedPage) return;

    try {
      console.log('Deleting page:', selectedPage.id);
      await deletePage(selectedPage.id);
      setDeleteModalOpen(false);
      setSuccessMessage(`Page "${selectedPage.name}" deleted successfully!`);
      setSelectedPage(null);
      loadPages(pagination.current, pagination.pageSize, searchTerm);
    } catch (error) {
      console.error('Failed to delete page:', error);
      setErrorMessage('Failed to delete page. Please try again.');
    }
  };

  const handlePublishToggle = async (page: PageListDto) => {
    try {
      let updatedPage;
      if (page.status === PageStatus.Published) {
        updatedPage = await unpublishPage(page.id);
        setSuccessMessage(`Page "${page.name}" unpublished successfully!`);
      } else {
        updatedPage = await publishPage(page.id);
        setSuccessMessage(`Page "${page.name}" published successfully!`);
      }
      console.log('Page status updated:', updatedPage);
      loadPages(pagination.current, pagination.pageSize, searchTerm);
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
      setErrorMessage('Failed to update page status. Please try again.');
    }
  };

  const columns: TableColumn<PageListDto>[] = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      render: (value, record) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-gray-100">
            {value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {record.title}
          </div>
        </div>
      ),
    },
    {
      key: 'slug',
      title: 'Slug',
      dataIndex: 'slug',
      render: (value) => (
        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          /{value}
        </code>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (value) => {
        const statusColors = {
          [PageStatus.Published]:
            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          [PageStatus.Draft]:
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
          [PageStatus.Scheduled]:
            'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
          [PageStatus.Archived]:
            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        };

        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[value as PageStatus]
            }`}
          >
            {getPageStatusLabel(value)}
          </span>
        );
      },
    },
    {
      key: 'updatedAt',
      title: 'Last Modified',
      dataIndex: 'updatedAt',
      render: (value) => formatDateTime(value),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <Link
            to={`/designer/${record.id}`}
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
            title="Design"
          >
            <i className="fas fa-paint-brush"></i>
          </Link>

          <button
            onClick={() => handleEditClick(record)}
            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded"
            title="Edit"
          >
            <i className="fas fa-edit"></i>
          </button>

          <button
            onClick={() => handlePublishToggle(record)}
            className={`p-1 rounded ${
              record.status === PageStatus.Published
                ? 'text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300'
                : 'text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300'
            }`}
            title={
              record.status === PageStatus.Published ? 'Unpublish' : 'Publish'
            }
          >
            <i
              className={`fas ${
                record.status === PageStatus.Published
                  ? 'fa-eye-slash'
                  : 'fa-globe'
              }`}
            ></i>
          </button>

          <button
            onClick={() => handleDeleteClick(record)}
            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
            title="Delete"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {successMessage && (
        <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800 animate-fade-in">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-check-circle text-green-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                {successMessage}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setSuccessMessage('')}
                className="text-green-400 hover:text-green-600 dark:hover:text-green-200"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 animate-fade-in">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-exclamation-circle text-red-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800 dark:text-red-200">
                {errorMessage}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setErrorMessage('')}
                className="text-red-400 hover:text-red-600 dark:hover:text-red-200"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Pages
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your website pages and content
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <Button
            onClick={() => setCreateModalOpen(true)}
            icon={<i className="fas fa-plus"></i>}
          >
            Create Page
          </Button>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <Table
          data={pages}
          columns={columns}
          loading={loading}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: pagination.total,
            onChange: (page, pageSize) => loadPages(page, pageSize, searchTerm),
          }}
          emptyText="No pages found. Create your first page to get started."
        />
      </div>

      {/* Create Modal */}
      <CrudModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create New Page"
        size="xl"
        icon="fas fa-plus"
        description="Create a new page that can be designed with the visual editor"
      >
        <PageForm
          onSubmit={handleCreatePage}
          onCancel={() => setCreateModalOpen(false)}
          isLoading={apiLoading}
        />
      </CrudModal>

      {/* Edit Modal */}
      <CrudModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedPage(null);
          setEditPageData(null);
        }}
        title="Edit Page"
        size="xl"
        icon="fas fa-edit"
        description={
          selectedPage
            ? `Modify settings for "${selectedPage.name}"`
            : 'Edit page settings'
        }
      >
        {loadingEditData ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
            <span className="ml-3 text-gray-600 dark:text-gray-400">
              Loading page data...
            </span>
          </div>
        ) : editPageData ? (
          <PageForm
            initialData={editPageData}
            onSubmit={handleEditPage}
            onCancel={() => {
              setEditModalOpen(false);
              setSelectedPage(null);
              setEditPageData(null);
            }}
            isLoading={apiLoading}
          />
        ) : null}
      </CrudModal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedPage(null);
        }}
        onConfirm={handleDeletePage}
        title="Delete Page"
        message={`Are you sure you want to delete "${selectedPage?.name}"? This action cannot be undone and will also delete all associated content and versions.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};
