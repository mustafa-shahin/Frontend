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
  PageStatus,
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

      if (search && search.trim()) {
        params.append('search', search.trim());
      }

      const url = `${ENDPOINTS.pages.list}?${params.toString()}`;
      console.log('Getting pages from:', url);

      const response = await apiClient.get<PagedResult<PageListDto>>(url);
      console.log('Pages API response:', response);

      // Ensure response has the expected structure
      if (!response) {
        throw new Error('No response received from pages API');
      }

      return {
        items: response.items || [],
        totalCount: response.totalCount || 0,
        pageSize: response.pageSize || pageSize,
        page: response.page ?? page,
        totalPages:
          response.totalPages ??
          Math.ceil(
            (response.totalCount || 0) / (response.pageSize || pageSize)
          ),
      };
    } catch (error) {
      console.error('Error in getPages:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getPageById = async (id: number): Promise<PageDto> => {
    setLoading(true);
    try {
      console.log('Getting page by ID:', id);
      const response = await apiClient.get<PageDto>(
        ENDPOINTS.pages.getById(id)
      );
      console.log('Page by ID response:', response);

      if (!response) {
        throw new Error(`Page with ID ${id} not found`);
      }

      return response;
    } catch (error) {
      console.error('Error in getPageById:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createPage = async (formData: CreatePageFormData): Promise<PageDto> => {
    setLoading(true);
    try {
      // Transform form data to match backend DTO exactly
      const createPageDto: CreatePageDto = {
        name: formData.name.trim(),
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        description: formData.description?.trim() || '',
        metaTitle: formData.metaTitle?.trim() || '',
        metaDescription: formData.metaDescription?.trim() || '',
        metaKeywords: formData.metaKeywords?.trim() || '',
        status: Number(formData.status), // Ensure status is sent as number
        template: formData.template?.trim() || '',
        priority: formData.priority || 0,
        parentPageId: formData.parentPageId,
        requiresLogin: formData.requiresLogin || false,
        adminOnly: formData.adminOnly || false,
        content: formData.content || {},
        layout: formData.layout || {},
        settings: formData.settings || {},
        styles: formData.styles || {},
      };

      console.log('Creating page with data:', createPageDto);

      const response = await apiClient.post<PageDto>(
        ENDPOINTS.pages.create,
        createPageDto
      );

      console.log('Create page response:', response);
      return response;
    } catch (error) {
      console.error('Error in createPage:', error);
      throw error;
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
        name: formData.name.trim(),
        title: formData.title.trim(),
        slug: formData.slug.trim(),
        description: formData.description?.trim() || '',
        metaTitle: formData.metaTitle?.trim() || '',
        metaDescription: formData.metaDescription?.trim() || '',
        metaKeywords: formData.metaKeywords?.trim() || '',
        status: Number(formData.status), // Ensure status is sent as number
        template: formData.template?.trim() || '',
        priority: formData.priority || 0,
        parentPageId: formData.parentPageId,
        requiresLogin: formData.requiresLogin || false,
        adminOnly: formData.adminOnly || false,
        content: formData.content || {},
        layout: formData.layout || {},
        settings: formData.settings || {},
        styles: formData.styles || {},
      };

      console.log('Updating page with data:', updatePageDto);

      const response = await apiClient.put<PageDto>(
        ENDPOINTS.pages.update(id),
        updatePageDto
      );

      console.log('Update page response:', response);
      return response;
    } catch (error) {
      console.error('Error in updatePage:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      console.log('Deleting page with ID:', id);
      await apiClient.delete(ENDPOINTS.pages.delete(id));
      console.log('Page deleted successfully');
    } catch (error) {
      console.error('Error in deletePage:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const publishPage = async (id: number): Promise<PageDto> => {
    setLoading(true);
    try {
      console.log('Publishing page with ID:', id);
      const response = await apiClient.post<PageDto>(
        ENDPOINTS.pages.publish(id)
      );
      console.log('Publish page response:', response);
      return response;
    } catch (error) {
      console.error('Error in publishPage:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const unpublishPage = async (id: number): Promise<PageDto> => {
    setLoading(true);
    try {
      console.log('Unpublishing page with ID:', id);
      const response = await apiClient.post<PageDto>(
        ENDPOINTS.pages.unpublish(id)
      );
      console.log('Unpublish page response:', response);
      return response;
    } catch (error) {
      console.error('Error in unpublishPage:', error);
      throw error;
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
      console.log('Duplicating page:', { id, newName });
      const response = await apiClient.post<PageDto>(
        ENDPOINTS.pages.duplicate(id),
        {
          newName: newName.trim(),
          duplicateContent: true,
        }
      );
      console.log('Duplicate page response:', response);
      return response;
    } catch (error) {
      console.error('Error in duplicatePage:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const validateSlug = async (
    slug: string,
    excludePageId?: number
  ): Promise<boolean> => {
    try {
      const params = new URLSearchParams({ slug: slug.trim() });
      if (excludePageId) {
        params.append('excludePageId', excludePageId.toString());
      }

      const url = `${ENDPOINTS.pages.validateSlug}?${params.toString()}`;
      console.log('Validating slug:', url);

      const response = await apiClient.get<{ isValid: boolean }>(url);
      console.log('Slug validation response:', response);

      return response?.isValid ?? false;
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
