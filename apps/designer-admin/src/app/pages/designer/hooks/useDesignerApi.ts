import { useState } from 'react';
import {
  apiClient,
  ENDPOINTS,
  DesignerPageDto,
  SaveDesignerPageDto,
  DesignerPreviewDto,
  PublishPageDto,
  DesignerStateDto,
  PageVersionDto,
  CreateVersionDto,
} from '@frontend/shared';

export const useDesignerApi = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const loadPage = async (pageId: number): Promise<DesignerPageDto> => {
    setLoading(true);
    try {
      const response = await apiClient.get<DesignerPageDto>(
        ENDPOINTS.designer.getPage(pageId)
      );
      console.log('Loaded designer page:', response);
      return response;
    } finally {
      setLoading(false);
    }
  };

  const savePage = async (
    pageId: number,
    data: Partial<SaveDesignerPageDto>
  ): Promise<DesignerPageDto> => {
    setSaving(true);
    try {
      const saveData: SaveDesignerPageDto = {
        pageId,
        content: data.content || {},
        layout: data.layout || {},
        settings: data.settings || {},
        styles: data.styles || {},
        changeDescription: data.changeDescription,
        createVersion: data.createVersion ?? true,
        autoSave: data.autoSave ?? false,
      };

      console.log('Saving designer page:', saveData);

      const response = await apiClient.post<DesignerPageDto>(
        ENDPOINTS.designer.savePage(pageId),
        saveData
      );

      console.log('Saved designer page:', response);
      return response;
    } finally {
      setSaving(false);
    }
  };

  const autoSavePage = async (
    pageId: number,
    data: Partial<SaveDesignerPageDto>
  ): Promise<DesignerPageDto | null> => {
    try {
      const autoSaveData: SaveDesignerPageDto = {
        pageId,
        content: data.content || {},
        layout: data.layout || {},
        settings: data.settings || {},
        styles: data.styles || {},
        autoSave: true,
        createVersion: false,
      };

      console.log('Auto-saving designer page:', autoSaveData);

      const response = await apiClient.post<DesignerPageDto>(
        ENDPOINTS.designer.autoSave(pageId),
        autoSaveData
      );

      console.log('Auto-saved designer page:', response);
      return response;
    } catch (error) {
      // Silently fail auto-save
      console.warn('Auto-save failed:', error);
      return null;
    }
  };

  const publishPage = async (
    pageId: number,
    publishData?: Partial<PublishPageDto>
  ): Promise<DesignerPageDto> => {
    setPublishing(true);
    try {
      const data: PublishPageDto = {
        pageId,
        publishMessage:
          publishData?.publishMessage || 'Published from designer',
        createVersion: publishData?.createVersion ?? true,
        scheduledAt: publishData?.scheduledAt,
      };

      console.log('Publishing page:', data);

      const response = await apiClient.post<DesignerPageDto>(
        ENDPOINTS.designer.publishPage(pageId),
        data
      );

      console.log('Published page:', response);
      return response;
    } finally {
      setPublishing(false);
    }
  };

  const unpublishPage = async (pageId: number): Promise<DesignerPageDto> => {
    setPublishing(true);
    try {
      const response = await apiClient.post<DesignerPageDto>(
        ENDPOINTS.designer.unpublishPage(pageId)
      );
      console.log('Unpublished page:', response);
      return response;
    } finally {
      setPublishing(false);
    }
  };

  const generatePreview = async (
    pageId: number,
    settings?: Record<string, any>
  ): Promise<DesignerPreviewDto> => {
    try {
      const response = await apiClient.post<DesignerPreviewDto>(
        ENDPOINTS.designer.generatePreview(pageId),
        { settings: settings || {} }
      );
      console.log('Generated preview:', response);
      return response;
    } catch (error) {
      console.error('Failed to generate preview:', error);
      throw new Error('Failed to generate preview');
    }
  };

  const getPreviewContent = async (previewToken: string): Promise<string> => {
    try {
      const response = await apiClient.get<string>(
        ENDPOINTS.designer.getPreview(previewToken)
      );
      return response;
    } catch (error) {
      console.error('Failed to load preview content:', error);
      throw new Error('Failed to load preview content');
    }
  };

  const createVersion = async (
    pageId: number,
    versionData?: CreateVersionDto
  ): Promise<PageVersionDto> => {
    try {
      const data: CreateVersionDto = {
        changeNotes: versionData?.changeNotes,
        metadata: {
          source: 'designer',
          ...versionData?.metadata,
        },
      };

      const response = await apiClient.post<PageVersionDto>(
        ENDPOINTS.designer.createVersion(pageId),
        data
      );
      console.log('Created version:', response);
      return response;
    } catch (error) {
      console.error('Failed to create version:', error);
      throw new Error('Failed to create version');
    }
  };

  const getVersions = async (pageId: number): Promise<PageVersionDto[]> => {
    try {
      const response = await apiClient.get<PageVersionDto[]>(
        ENDPOINTS.designer.getVersions(pageId)
      );
      return response;
    } catch (error) {
      console.error('Failed to load versions:', error);
      throw new Error('Failed to load versions');
    }
  };

  const restoreVersion = async (
    pageId: number,
    versionId: number
  ): Promise<DesignerPageDto> => {
    try {
      const response = await apiClient.post<DesignerPageDto>(
        ENDPOINTS.designer.restoreVersion(pageId, versionId)
      );
      console.log('Restored version:', response);
      return response;
    } catch (error) {
      console.error('Failed to restore version:', error);
      throw new Error('Failed to restore version');
    }
  };

  const getDesignerState = async (
    pageId: number
  ): Promise<DesignerStateDto> => {
    try {
      const response = await apiClient.get<DesignerStateDto>(
        ENDPOINTS.designer.getState(pageId)
      );
      return response;
    } catch (error) {
      // Return default state if none exists
      console.warn('Failed to load designer state, using defaults:', error);
      return {
        pageId,
        selectedComponentKey: undefined,
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

  const saveDesignerState = async (
    pageId: number,
    state: Partial<DesignerStateDto>
  ): Promise<DesignerStateDto | null> => {
    try {
      const stateData: DesignerStateDto = {
        pageId,
        selectedComponentKey: state.selectedComponentKey ?? undefined,
        expandedComponents: state.expandedComponents || [],
        activeBreakpoint: state.activeBreakpoint || 'lg',
        viewMode: state.viewMode || 'desktop',
        zoomLevel: state.zoomLevel || 1.0,
        showGrid: state.showGrid ?? true,
        showRulers: state.showRulers ?? false,
        snapToGrid: state.snapToGrid ?? true,
        preferences: state.preferences || {},
        lastModified: new Date().toISOString(),
      };

      const response = await apiClient.post<DesignerStateDto>(
        ENDPOINTS.designer.saveState(pageId),
        stateData
      );
      return response;
    } catch (error) {
      console.warn('Failed to save designer state:', error);
      return null;
    }
  };

  const clearDesignerState = async (pageId: number): Promise<void> => {
    try {
      await apiClient.delete(ENDPOINTS.designer.clearState(pageId));
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
