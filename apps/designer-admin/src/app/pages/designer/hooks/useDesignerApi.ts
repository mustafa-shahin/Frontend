import { useState } from 'react';
import { apiClient, ENDPOINTS } from '@frontend/shared';

export interface SaveDesignerPageDto {
  content: Record<string, any>;
  layout: Record<string, any>;
  settings: Record<string, any>;
  styles: Record<string, any>;
  changeDescription?: string;
  createVersion?: boolean;
  autoSave?: boolean;
}

export interface DesignerPreview {
  pageId: number;
  previewUrl: string;
  previewToken: string;
  expiresAt: string;
  settings: Record<string, any>;
}

export const useDesignerApi = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const loadPage = async (pageId: number) => {
    setLoading(true);
    try {
      return await apiClient.get(ENDPOINTS.designer.getPage(pageId));
    } finally {
      setLoading(false);
    }
  };

  const savePage = async (pageId: number, data: SaveDesignerPageDto) => {
    setSaving(true);
    try {
      return await apiClient.post(ENDPOINTS.designer.savePage(pageId), data);
    } finally {
      setSaving(false);
    }
  };

  const autoSavePage = async (pageId: number, data: SaveDesignerPageDto) => {
    try {
      const autoSaveData = { ...data, autoSave: true, createVersion: false };
      return await apiClient.post(
        ENDPOINTS.designer.autoSave(pageId),
        autoSaveData
      );
    } catch (error) {
      // Silently fail auto-save
      console.warn('Auto-save failed:', error);
    }
  };

  const publishPage = async (pageId: number) => {
    setPublishing(true);
    try {
      return await apiClient.post(ENDPOINTS.designer.publishPage(pageId), {
        publishMessage: 'Published from designer',
        createVersion: true,
      });
    } finally {
      setPublishing(false);
    }
  };

  const unpublishPage = async (pageId: number) => {
    setPublishing(true);
    try {
      return await apiClient.post(ENDPOINTS.designer.unpublishPage(pageId));
    } finally {
      setPublishing(false);
    }
  };

  const generatePreview = async (
    pageId: number,
    settings?: Record<string, any>
  ): Promise<DesignerPreview> => {
    try {
      return await apiClient.post(ENDPOINTS.designer.generatePreview(pageId), {
        settings: settings || {},
      });
    } catch (error) {
      throw new Error('Failed to generate preview');
    }
  };

  const getPreviewContent = async (previewToken: string) => {
    try {
      return await apiClient.get(ENDPOINTS.designer.getPreview(previewToken));
    } catch (error) {
      throw new Error('Failed to load preview content');
    }
  };

  const createVersion = async (pageId: number, changeNotes?: string) => {
    try {
      return await apiClient.post(ENDPOINTS.designer.createVersion(pageId), {
        changeNotes,
        metadata: { source: 'designer' },
      });
    } catch (error) {
      throw new Error('Failed to create version');
    }
  };

  const getVersions = async (pageId: number) => {
    try {
      return await apiClient.get(ENDPOINTS.designer.getVersions(pageId));
    } catch (error) {
      throw new Error('Failed to load versions');
    }
  };

  const restoreVersion = async (pageId: number, versionId: number) => {
    try {
      return await apiClient.post(
        ENDPOINTS.designer.restoreVersion(pageId, versionId)
      );
    } catch (error) {
      throw new Error('Failed to restore version');
    }
  };

  const getDesignerState = async (pageId: number) => {
    try {
      return await apiClient.get(ENDPOINTS.designer.getState(pageId));
    } catch (error) {
      // Return default state if none exists
      return {
        pageId,
        selectedComponentKey: null,
        expandedComponents: [],
        activeBreakpoint: 'lg',
        viewMode: 'desktop',
        zoomLevel: 1.0,
        showGrid: true,
        showRulers: false,
        snapToGrid: true,
        preferences: {},
        lastModified: new Date().toISOString(),
      };
    }
  };

  const saveDesignerState = async (pageId: number, state: any) => {
    try {
      return await apiClient.post(ENDPOINTS.designer.saveState(pageId), state);
    } catch (error) {
      console.warn('Failed to save designer state:', error);
    }
  };

  const clearDesignerState = async (pageId: number) => {
    try {
      return await apiClient.delete(ENDPOINTS.designer.clearState(pageId));
    } catch (error) {
      console.warn('Failed to clear designer state:', error);
    }
  };

  return {
    loading,
    saving,
    publishing,
    loadPage,
    savePage,
    autoSavePage,
    publishPage,
    unpublishPage,
    generatePreview,
    getPreviewContent,
    createVersion,
    getVersions,
    restoreVersion,
    getDesignerState,
    saveDesignerState,
    clearDesignerState,
  };
};
