import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingPage, apiClient, ENDPOINTS, useAuth } from '@frontend/shared';
import { UserButton } from './user-components/UserButton';
import { NotFoundPage } from '../pages/NotFoundPage';

interface PageData {
  id: number;
  name: string;
  title: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status: string;
  requiresLogin: boolean;
  adminOnly: boolean;
  content: Record<string, any>;
  layout: Record<string, any>;
  settings: Record<string, any>;
  styles: Record<string, any>;
}

interface ComponentData {
  id: string;
  type: string;
  name: string;
  props: Record<string, any>;
  styles: Record<string, any>;
  position: {
    row: number;
    column: number;
    span: number;
  };
}

export const PageRenderer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated, hasAnyRole } = useAuth();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (slug) {
      loadPage();
    }
  }, [slug]);

  // Update page metadata when page loads
  useEffect(() => {
    if (page) {
      document.title = page.metaTitle || page.title || page.name;

      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute(
        'content',
        page.metaDescription || page.description || ''
      );

      // Update meta keywords
      if (page.metaKeywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', page.metaKeywords);
      }
    }
  }, [page]);

  const loadPage = async () => {
    if (!slug) return;

    setLoading(true);
    setError('');

    try {
      const pageData = await apiClient.get<PageData>(
        ENDPOINTS.pages.getBySlug(slug)
      );

      // Check access permissions
      if (pageData.requiresLogin && !isAuthenticated) {
        setError('This page requires you to be logged in.');
        return;
      }

      if (pageData.adminOnly && !hasAnyRole(['Admin'])) {
        setError('You do not have permission to view this page.');
        return;
      }

      setPage(pageData);
    } catch (err: any) {
      if (err.status === 404) {
        setError('Page not found');
      } else {
        setError('Failed to load page. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const renderComponent = (component: ComponentData) => {
    const commonProps = {
      key: component.id,
      ...component.props,
      className: getComponentClasses(component),
      style: getComponentStyles(component),
    };

    switch (component.type) {
      case 'Button':
        return <UserButton {...commonProps} />;
      default:
        return (
          <div {...commonProps}>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Unknown component: {component.type}
              </p>
            </div>
          </div>
        );
    }
  };

  const getComponentClasses = (component: ComponentData) => {
    const baseClasses = `col-span-${component.position.span}`;
    const customClasses = component.props.customClasses || '';
    return `${baseClasses} ${customClasses}`.trim();
  };

  const getComponentStyles = (component: ComponentData) => {
    const styles: React.CSSProperties = {};

    // Apply spacing styles
    if (component.props.marginTop) styles.marginTop = component.props.marginTop;
    if (component.props.marginBottom)
      styles.marginBottom = component.props.marginBottom;
    if (component.props.marginLeft)
      styles.marginLeft = component.props.marginLeft;
    if (component.props.marginRight)
      styles.marginRight = component.props.marginRight;
    if (component.props.paddingTop)
      styles.paddingTop = component.props.paddingTop;
    if (component.props.paddingBottom)
      styles.paddingBottom = component.props.paddingBottom;
    if (component.props.paddingLeft)
      styles.paddingLeft = component.props.paddingLeft;
    if (component.props.paddingRight)
      styles.paddingRight = component.props.paddingRight;
    if (component.props.textAlign) styles.textAlign = component.props.textAlign;

    return styles;
  };

  const renderPageContent = () => {
    if (!page?.content?.components) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            This page has no content yet.
          </p>
        </div>
      );
    }

    const components = page.content.components as ComponentData[];

    // Group components by rows
    const componentsByRow = new Map<number, ComponentData[]>();
    components.forEach((component) => {
      const row = component.position.row;
      if (!componentsByRow.has(row)) {
        componentsByRow.set(row, []);
      }
      componentsByRow.get(row)!.push(component);
    });

    // Sort components within each row by column
    componentsByRow.forEach((rowComponents) => {
      rowComponents.sort((a, b) => a.position.column - b.position.column);
    });

    // Get all rows and sort them
    const rows = Array.from(componentsByRow.keys()).sort((a, b) => a - b);

    return (
      <div className="space-y-6">
        {rows.map((rowNumber) => {
          const rowComponents = componentsByRow.get(rowNumber) || [];

          return (
            <div key={rowNumber} className="grid grid-cols-12 gap-4">
              {rowComponents.map(renderComponent)}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return <LoadingPage message="Loading page..." />;
  }

  if (error === 'Page not found') {
    return <NotFoundPage />;
  }

  if (error) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Unable to Load Page
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={loadPage}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!page) {
    return <NotFoundPage />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {page.title}
        </h1>
        {page.description && (
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {page.description}
          </p>
        )}
      </div>

      {/* Page Content */}
      <div className="min-h-96">{renderPageContent()}</div>
    </div>
  );
};
