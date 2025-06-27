import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header, Button, LoadingPage, PageStatus } from '@frontend/shared';
import { DesignerSidebar } from './components/DesignerSidebar';
import { DesignerCanvas } from './components/DesignerCanvas';
import { ComponentProperties } from './components/ComponentProperties';
import { DesignerToolbar } from './components/DesignerToolbar';
import { useDesignerState } from './hooks/useDesignerState';
import { useDesignerApi } from './hooks/useDesignerApi';
import { PreviewModal } from './components/PreviewModal';

export const Designer: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [propertiesPanelOpen, setPropertiesPanelOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  const {
    page,
    setPage,
    selectedComponent,
    setSelectedComponent,
    components,
    setComponents,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent,
    hasUnsavedChanges,
    setHasUnsavedChanges,
  } = useDesignerState();

  const {
    loadPage,
    savePage,
    publishPage,
    generatePreview,
    autoSavePage,
    loading,
    saving,
    publishing,
  } = useDesignerApi();

  useEffect(() => {
    if (pageId) {
      loadDesignerPage();
    }
  }, [pageId]);

  // Auto-save functionality
  useEffect(() => {
    if (!hasUnsavedChanges || !pageId || !page) return;

    const autoSaveTimer = setTimeout(() => {
      handleAutoSave();
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [hasUnsavedChanges, pageId, page, components]);

  const loadDesignerPage = async () => {
    if (!pageId) return;

    try {
      const pageData = await loadPage(parseInt(pageId));
      setPage(pageData);

      // Load components from page content
      if (pageData.content?.components) {
        setComponents(pageData.content.components);
      }

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to load page:', error);
      navigate('/dashboard/pages');
    }
  };

  const handleAutoSave = useCallback(async () => {
    if (!pageId || !hasUnsavedChanges) return;

    try {
      await autoSavePage(parseInt(pageId), {
        content: { components },
        layout: {},
        settings: {},
        styles: {},
      });
      console.log('Auto-saved successfully');
    } catch (error) {
      console.warn('Auto-save failed:', error);
    }
  }, [pageId, hasUnsavedChanges, components, autoSavePage]);

  const handleSave = async () => {
    if (!pageId) return;

    try {
      const updatedPage = await savePage(parseInt(pageId), {
        content: { components },
        layout: {},
        settings: {},
        styles: {},
        changeDescription: 'Manual save from designer',
        createVersion: true,
      });

      setPage(updatedPage);
      setHasUnsavedChanges(false);
      setLastSavedAt(new Date());

      console.log('Page saved successfully');
    } catch (error) {
      console.error('Failed to save page:', error);
      // You might want to show a toast notification here
    }
  };

  const handlePublish = async () => {
    if (!pageId) return;

    try {
      // Save first if there are unsaved changes
      if (hasUnsavedChanges) {
        await handleSave();
      }

      // Then publish
      const publishedPage = await publishPage(parseInt(pageId), {
        publishMessage: 'Published from designer',
        createVersion: true,
      });

      setPage(publishedPage);
      console.log('Page published successfully');
    } catch (error) {
      console.error('Failed to publish page:', error);
      // You might want to show a toast notification here
    }
  };

  const handlePreview = async () => {
    if (!pageId) return;

    try {
      await generatePreview(parseInt(pageId));
      setPreviewModalOpen(true);
    } catch (error) {
      console.error('Failed to generate preview:', error);
    }
  };

  const handleComponentSelect = (componentId: string | null) => {
    setSelectedComponent(componentId);
    setPropertiesPanelOpen(!!componentId);
  };

  const handleComponentUpdate = (componentId: string, props: any) => {
    updateComponent(componentId, { props });
    setHasUnsavedChanges(true);
  };

  const handleComponentAdd = (
    componentType: string,
    position: { row: number; column: number }
  ) => {
    const newComponent = addComponent(componentType, position);
    setSelectedComponent(newComponent.id);
    setPropertiesPanelOpen(true);
    setHasUnsavedChanges(true);
  };

  const handleComponentDelete = (componentId: string) => {
    deleteComponent(componentId);
    if (selectedComponent === componentId) {
      setSelectedComponent(null);
      setPropertiesPanelOpen(false);
    }
    setHasUnsavedChanges(true);
  };

  const handleComponentMove = (
    componentId: string,
    newPosition: { row: number; column: number; span: number }
  ) => {
    moveComponent(componentId, newPosition);
    setHasUnsavedChanges(true);
  };

  if (loading) {
    return <LoadingPage message="Loading designer..." />;
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The page you're trying to edit doesn't exist.
          </p>
          <Button onClick={() => navigate('/dashboard/pages')}>
            Back to Pages
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header
        isDesignerMode={true}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Designer Toolbar */}
      <DesignerToolbar
        hasUnsavedChanges={hasUnsavedChanges}
        onSave={handleSave}
        onPublish={handlePublish}
        onPreview={handlePreview}
        saving={saving}
        publishing={publishing}
        pageName={page.name}
        lastSavedAt={lastSavedAt}
        componentsCount={components.length}
        onBack={() => navigate('/dashboard/pages')}
        pageStatus={PageStatus.Draft}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Component Library Sidebar */}
        <DesignerSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Canvas Area */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-auto">
            <DesignerCanvas
              components={components}
              selectedComponent={selectedComponent}
              onComponentSelect={handleComponentSelect}
              onComponentAdd={handleComponentAdd}
              onComponentDelete={handleComponentDelete}
              onComponentMove={handleComponentMove}
            />
          </div>

          {/* Properties Panel */}
          {propertiesPanelOpen && selectedComponent && (
            <ComponentProperties
              component={components.find((c) => c.id === selectedComponent)}
              onUpdate={(props) =>
                handleComponentUpdate(selectedComponent, props)
              }
              onClose={() => {
                setSelectedComponent(null);
                setPropertiesPanelOpen(false);
              }}
            />
          )}
        </div>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Preview Modal */}
      <PreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        pageId={pageId ? parseInt(pageId) : 0}
      />
    </div>
  );
};
