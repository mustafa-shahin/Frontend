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
} from '@frontend/shared';
import { CrudModal } from '../../components/auth/crud/CrudModal';
import { PageForm } from './components/PageForm';
import { usePagesApi } from './hooks/usePagesApi';

export const Pages: React.FC = () => {
  const [pages, setPages] = useState<PageListDto[]>([]);
  const [loading, setLoading] = useState(true);
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
      const result = await getPages(page, pageSize, search);
      setPages(result.items);
      setPagination({
        current: page,
        pageSize,
        total: result.totalCount,
      });
    } catch (error) {
      console.error('Failed to load pages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  const handleCreatePage = async (data: CreatePageFormData) => {
    try {
      await createPage(data);
      setCreateModalOpen(false);
      loadPages(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error('Failed to create page:', error);
      // You might want to show a toast notification here
    }
  };

  const handleEditClick = async (page: PageListDto) => {
    try {
      // Load full page data for editing
      const fullPageData = await getPageById(page.id);
      setEditPageData(fullPageData);
      setSelectedPage(page);
      setEditModalOpen(true);
    } catch (error) {
      console.error('Failed to load page for editing:', error);
    }
  };

  const handleEditPage = async (data: UpdatePageFormData) => {
    if (!selectedPage) return;

    try {
      await updatePage(selectedPage.id, data);
      setEditModalOpen(false);
      setSelectedPage(null);
      setEditPageData(null);
      loadPages(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error('Failed to update page:', error);
    }
  };

  const handleDeleteClick = (page: PageListDto) => {
    setSelectedPage(page);
    setDeleteModalOpen(true);
  };

  const handleDeletePage = async () => {
    if (!selectedPage) return;

    try {
      await deletePage(selectedPage.id);
      setDeleteModalOpen(false);
      setSelectedPage(null);
      loadPages(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error('Failed to delete page:', error);
    }
  };

  const handlePublishToggle = async (page: PageListDto) => {
    try {
      if (page.status === PageStatus.Published) {
        await unpublishPage(page.id);
      } else {
        await publishPage(page.id);
      }
      loadPages(pagination.current, pagination.pageSize);
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
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
            {value}
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
            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
            title="Design"
          >
            <i className="fas fa-paint-brush"></i>
          </Link>

          <button
            onClick={() => handleEditClick(record)}
            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
            title="Edit"
          >
            <i className="fas fa-edit"></i>
          </button>

          <button
            onClick={() => handlePublishToggle(record)}
            className={`${
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
            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Pages
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your website pages and content
          </p>
        </div>
        <Button
          onClick={() => setCreateModalOpen(true)}
          icon={<i className="fas fa-plus"></i>}
        >
          Create Page
        </Button>
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
            onChange: (page, pageSize) => loadPages(page, pageSize),
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
      >
        {selectedPage ? (
          <div className="mb-4 text-gray-700 dark:text-gray-300">
            Modify settings for "{selectedPage.name}"
          </div>
        ) : (
          <div className="mb-4 text-gray-700 dark:text-gray-300">
            Edit page settings
          </div>
        )}
        {editPageData && (
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
        )}
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
        message={`Are you sure you want to delete "${selectedPage?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
};
