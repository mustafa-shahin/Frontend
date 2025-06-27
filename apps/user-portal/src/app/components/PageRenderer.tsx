import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  LoadingPage,
  apiClient,
  ENDPOINTS,
  useAuth,
  UserRole,
  PageStatus,
} from '@frontend/shared';
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
  status: PageStatus;
  requiresLogin: boolean;
  adminOnly: boolean;
  publishedOn?: string;
  content: Record<string, unknown>;
  layout: Record<string, unknown>;
  settings: Record<string, unknown>;
  styles: Record<string, unknown>;
}

interface ComponentData {
  id: string;
  type: string;
  name: string;
  props: Record<string, unknown>;
  styles: Record<string, unknown>;
  position: {
    row: number;
    column: number;
    span: number;
  };
}

interface ComponentProps {
  key?: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export const PageRenderer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated, hasAnyRole } = useAuth();
  const [page, setPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const loadPage = useCallback(async () => {
    if (!slug) return;

    setLoading(true);
    setError('');

    try {
      const pageData = await apiClient.get<PageData>(
        ENDPOINTS.pages.getBySlug(slug)
      );

      // Check if page is published
      if (pageData.status !== PageStatus.Published) {
        setError('Page not found');
        return;
      }

      // Check access permissions
      if (pageData.requiresLogin && !isAuthenticated) {
        setError('This page requires you to be logged in.');
        return;
      }

      if (pageData.adminOnly && !hasAnyRole([UserRole.Admin])) {
        setError('You do not have permission to view this page.');
        return;
      }

      setPage(pageData);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'status' in err) {
        const apiError = err as { status: number };
        if (apiError.status === 404) {
          setError('Page not found');
        } else {
          setError('Failed to load page. Please try again later.');
        }
      } else {
        setError('Failed to load page. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, [slug, isAuthenticated, hasAnyRole]);

  useEffect(() => {
    if (slug) {
      loadPage();
    }
  }, [slug, loadPage]);

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

  const renderComponent = (component: ComponentData) => {
    const commonProps: ComponentProps = {
      key: component.id,
      ...component.props,
      className: getComponentClasses(component),
      style: getComponentStyles(component),
    };

    console.log('Rendering component:', component.type, commonProps);

    switch (component.type) {
      case 'Button':
        return <UserButton {...commonProps} />;
      case 'Text':
        return (
          <div {...commonProps}>
            <div className="prose dark:prose-invert">
              {typeof component.props.content === 'string' ||
              typeof component.props.content === 'number'
                ? component.props.content
                : 'Text content'}
            </div>
          </div>
        );
      case 'Image':
        return (
          <div {...commonProps}>
            <img
              src={(component.props.src as string) || ''}
              alt={(component.props.alt as string) || 'Image'}
              className="w-full h-auto"
              style={{
                width: (component.props.width as string) || '100%',
                height: (component.props.height as string) || 'auto',
              }}
            />
          </div>
        );
      case 'Container':
        return (
          <div {...commonProps}>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              Container Content
            </div>
          </div>
        );
      default:
        // For development: show unknown components
        console.warn('Unknown component type:', component.type);
        return (
          <div {...commonProps}>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Component: {component.type}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {component.name}
              </p>
            </div>
          </div>
        );
    }
  };

  const getComponentClasses = (component: ComponentData): string => {
    const baseClasses = `col-span-${component.position.span}`;
    const customClasses = (component.props.customClasses as string) || '';

    // Handle responsive hiding
    const hiddenClasses = [];
    if (component.props.hidden) hiddenClasses.push('hidden md:block');
    if (component.props.hiddenTablet) hiddenClasses.push('md:hidden lg:block');
    if (component.props.hiddenDesktop) hiddenClasses.push('lg:hidden');

    return `${baseClasses} ${customClasses} ${hiddenClasses.join(' ')}`.trim();
  };

  const getComponentStyles = (
    component: ComponentData
  ): React.CSSProperties => {
    const styles: React.CSSProperties = {};
    const props = component.props;

    // Apply spacing styles with proper type checking
    if (typeof props.marginTop === 'string') styles.marginTop = props.marginTop;
    if (typeof props.marginBottom === 'string')
      styles.marginBottom = props.marginBottom;
    if (typeof props.marginLeft === 'string')
      styles.marginLeft = props.marginLeft;
    if (typeof props.marginRight === 'string')
      styles.marginRight = props.marginRight;
    if (typeof props.paddingTop === 'string')
      styles.paddingTop = props.paddingTop;
    if (typeof props.paddingBottom === 'string')
      styles.paddingBottom = props.paddingBottom;
    if (typeof props.paddingLeft === 'string')
      styles.paddingLeft = props.paddingLeft;
    if (typeof props.paddingRight === 'string')
      styles.paddingRight = props.paddingRight;
    if (typeof props.textAlign === 'string') {
      styles.textAlign = props.textAlign as React.CSSProperties['textAlign'];
    }

    return styles;
  };

  const renderPageContent = () => {
    console.log('Page content:', page?.content);

    if (!page?.content?.components) {
      return (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-file-alt text-gray-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Page Content Coming Soon
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              This page has no content yet. Check back later!
            </p>
          </div>
        </div>
      );
    }

    const components = page.content.components as ComponentData[];

    if (!Array.isArray(components) || components.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-cube text-gray-400 text-xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No Components
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              This page doesn't have any components yet.
            </p>
          </div>
        </div>
      );
    }

    console.log('Rendering components:', components);

    // Group components by rows
    const componentsByRow = new Map<number, ComponentData[]>();
    components.forEach((component) => {
      const row = component.position.row;
      if (!componentsByRow.has(row)) {
        componentsByRow.set(row, []);
      }
      const rowComponents = componentsByRow.get(row);
      if (rowComponents) {
        rowComponents.push(component);
      }
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
        <div className="text-center max-w-md mx-auto">
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
    <div className="min-h-screen">
      {/* Page Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {page.title}
            </h1>
            {page.description && (
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {page.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPageContent()}
      </div>
    </div>
  );
};
