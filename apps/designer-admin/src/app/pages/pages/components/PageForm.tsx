import React, { useEffect } from 'react';
import {
  createPageSchema,
  PageStatus,
  CreatePageFormData,
  UpdatePageFormData,
  PageDto,
  slugify,
} from '@frontend/shared';
import {
  GenericForm,
  FormField,
} from '../../../components/auth/forms/GenericForm';

interface PageFormProps {
  initialData?: PageDto;
  onSubmit: (data: CreatePageFormData | UpdatePageFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const PageForm: React.FC<PageFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [autoSlug, setAutoSlug] = React.useState(!initialData?.slug);

  const fields: FormField[] = [
    {
      name: 'name',
      label: 'Page Name',
      type: 'text',
      placeholder: 'Enter page name',
      required: true,
      helper: 'Internal name for the page (not visible to visitors)',
      leftIcon: <i className="fas fa-file-alt"></i>,
    },
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      placeholder: 'Enter page title',
      required: true,
      helper: 'Title displayed to visitors and in browser tabs',
      leftIcon: <i className="fas fa-heading"></i>,
    },
    {
      name: 'slug',
      label: 'URL Slug',
      type: 'text',
      placeholder: 'Enter URL slug',
      required: true,
      helper: 'URL-friendly version (e.g., about-us)',
      leftIcon: <i className="fas fa-link"></i>,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter page description (optional)',
      rows: 3,
      helper: 'Brief description of the page content',
    },
    {
      name: 'metaTitle',
      label: 'Meta Title',
      type: 'text',
      placeholder: 'Enter SEO title (optional)',
      helper: 'Title for search engines (if different from page title)',
    },
    {
      name: 'metaDescription',
      label: 'Meta Description',
      type: 'textarea',
      placeholder: 'Enter SEO description (optional)',
      rows: 2,
      helper: 'Description for search engines (150-160 characters recommended)',
    },
    {
      name: 'metaKeywords',
      label: 'Meta Keywords',
      type: 'text',
      placeholder: 'Enter keywords separated by commas (optional)',
      helper: 'Keywords for search engines (comma-separated)',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Draft', value: PageStatus.Draft },
        { label: 'Published', value: PageStatus.Published },
        { label: 'Scheduled', value: PageStatus.Scheduled },
        { label: 'Archived', value: PageStatus.Archived },
      ],
      helper: 'Current status of the page',
    },
    {
      name: 'template',
      label: 'Template',
      type: 'text',
      placeholder: 'Enter template name (optional)',
      helper: 'Template to use for rendering this page',
    },
    {
      name: 'requiresLogin',
      label: 'Requires Login',
      type: 'checkbox',
      helper: 'Only logged-in users can view this page',
    },
    {
      name: 'adminOnly',
      label: 'Admin Only',
      type: 'checkbox',
      helper: 'Only administrators can view this page',
    },
  ];

  const defaultValues: CreatePageFormData = {
    name: initialData?.name || '',
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || '',
    metaKeywords: initialData?.metaKeywords || '',
    status: initialData?.status || PageStatus.Draft,
    template: initialData?.template || '',
    priority: initialData?.priority || 0,
    parentPageId: initialData?.parentPageId || undefined,
    requiresLogin: initialData?.requiresLogin || false,
    adminOnly: initialData?.adminOnly || false,
    content: initialData?.content || {},
    layout: initialData?.layout || {},
    settings: initialData?.settings || {},
    styles: initialData?.styles || {},
  };

  const handleSubmit = (data: CreatePageFormData) => {
    // Auto-generate slug if not provided
    if (!data.slug && data.title) {
      data.slug = slugify(data.title);
    }

    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <i className="fas fa-info-circle text-blue-400"></i>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Page {initialData ? 'Update' : 'Creation'}
            </h3>
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              <p>
                {initialData
                  ? 'Update the page information below. Changes will be saved immediately.'
                  : 'After creating the page, you can use the visual designer to add content and components. The page will be accessible to visitors only when published.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <GenericForm
        fields={fields}
        schema={createPageSchema}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        onCancel={onCancel}
        submitText={initialData ? 'Update Page' : 'Create Page'}
        isLoading={isLoading}
      />
    </div>
  );
};
