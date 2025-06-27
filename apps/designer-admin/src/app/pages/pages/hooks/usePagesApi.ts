import { useState } from 'react';
import {
  apiClient,
  ENDPOINTS,
  PagedResult,
  PageListDto,
  PageDto,
  CreatePageDto,
  UpdatePageDto,
  CreatePageFormData,
  UpdatePageFormData,
} from '@frontend/shared';

export const usePagesApi = () => {
  const [loading, setLoading] = useState(false);

  const getPages = async (
    page = 1,
    pageSize = 10,
    search?: string
  ): Promise<PagedResult<PageListDto>> => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (search) {
        params.append('search', search);
      }

      const response = await apiClient.get<PagedResult<PageListDto>>(
        `${ENDPOINTS.pages.list}?${params.toString()}`
      );

      return response;
    } finally {
      setLoading(false);
    }
  };

  const getPageById = async (id: number): Promise<PageDto> => {
    setLoading(true);
    try {
      return await apiClient.get<PageDto>(ENDPOINTS.pages.getById(id));
    } finally {
      setLoading(false);
    }
  };

  const createPage = async (formData: CreatePageFormData): Promise<PageDto> => {
    setLoading(true);
    try {
      // Transform form data to match backend DTO exactly
      const createPageDto: CreatePageDto = {
        name: formData.name,
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        metaKeywords: formData.metaKeywords,
        status: formData.status,
        template: formData.template,
        priority: formData.priority || 0,
        parentPageId: formData.parentPageId,
        requiresLogin: formData.requiresLogin,
        adminOnly: formData.adminOnly,
        content: formData.content || {},
        layout: formData.layout || {},
        settings: formData.settings || {},
        styles: formData.styles || {},
      };

      console.log('Creating page with data:', createPageDto);

      return await apiClient.post<PageDto>(
        ENDPOINTS.pages.create,
        createPageDto
      );
    } finally {
      setLoading(false);
    }
  };

  const updatePage = async (
    id: number,
    formData: UpdatePageFormData
  ): Promise<PageDto> => {
    setLoading(true);
    try {
      // Transform form data to match backend DTO exactly
      const updatePageDto: UpdatePageDto = {
        name: formData.name,
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        metaKeywords: formData.metaKeywords,
        status: formData.status,
        template: formData.template,
        priority: formData.priority || 0,
        parentPageId: formData.parentPageId,
        requiresLogin: formData.requiresLogin,
        adminOnly: formData.adminOnly,
        content: formData.content || {},
        layout: formData.layout || {},
        settings: formData.settings || {},
        styles: formData.styles || {},
      };

      console.log('Updating page with data:', updatePageDto);

      return await apiClient.put<PageDto>(
        ENDPOINTS.pages.update(id),
        updatePageDto
      );
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      await apiClient.delete(ENDPOINTS.pages.delete(id));
    } finally {
      setLoading(false);
    }
  };

  const publishPage = async (id: number): Promise<PageDto> => {
    setLoading(true);
    try {
      return await apiClient.post<PageDto>(ENDPOINTS.pages.publish(id));
    } finally {
      setLoading(false);
    }
  };

  const unpublishPage = async (id: number): Promise<PageDto> => {
    setLoading(true);
    try {
      return await apiClient.post<PageDto>(ENDPOINTS.pages.unpublish(id));
    } finally {
      setLoading(false);
    }
  };

  const duplicatePage = async (
    id: number,
    newName: string
  ): Promise<PageDto> => {
    setLoading(true);
    try {
      return await apiClient.post<PageDto>(ENDPOINTS.pages.duplicate(id), {
        newName,
        duplicateContent: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const validateSlug = async (
    slug: string,
    excludePageId?: number
  ): Promise<boolean> => {
    try {
      const params = new URLSearchParams({ slug });
      if (excludePageId) {
        params.append('excludePageId', excludePageId.toString());
      }

      const response = await apiClient.get<{ isValid: boolean }>(
        `${ENDPOINTS.pages.validateSlug}?${params.toString()}`
      );
      return response.isValid;
    } catch (error) {
      console.error('Error validating slug:', error);
      return false;
    }
  };

  return {
    loading,
    getPages,
    getPageById,
    createPage,
    updatePage,
    deletePage,
    publishPage,
    unpublishPage,
    duplicatePage,
    validateSlug,
  };
};
