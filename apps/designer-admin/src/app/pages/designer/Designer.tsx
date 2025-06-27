import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header, Button, LoadingPage } from '@frontend/shared';
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

  const {
    page,
    selectedComponent,
    setSelectedComponent,
    components,
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
    loading,
    saving,
    publishing,
  } = useDesignerApi();

  useEffect(() => {
    if (pageId) {
      loadDesignerPage();
    }
  }, [pageId]);

  const loadDesignerPage = async () => {
    if (!pageId) return;

    try {
      const pageData = await loadPage(parseInt(pageId));
      // Initialize designer state with page data
    } catch (error) {
      console.error('Failed to load page:', error);
      navigate('/dashboard/pages');
    }
  };

  const handleSave = async () => {
    if (!pageId) return;

    try {
      await savePage(parseInt(pageId), {
        content: { components },
        layout: {},
        settings: {},
        styles: {},
      });
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Failed to save page:', error);
    }
  };

  const handlePublish = async () => {
    if (!pageId) return;

    try {
      // Save first
      await handleSave();
      // Then publish
      await publishPage(parseInt(pageId));
    } catch (error) {
      console.error('Failed to publish page:', error);
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
    updateComponent(componentId, props);
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

  if (loading) {
    return <LoadingPage message="Loading designer..." />;
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
        pageName={page?.name || 'Untitled Page'}
        onBack={() => navigate('/dashboard/pages')}
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
              onComponentMove={moveComponent}
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
