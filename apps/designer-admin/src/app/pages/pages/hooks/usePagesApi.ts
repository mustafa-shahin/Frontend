import { useState } from 'react';
import {
  apiClient,
  ENDPOINTS,
  PagedResult,
  PageListDto,
  PageDto,
  CreatePageDto,
  UpdatePageDto,
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

  const createPage = async (data: CreatePageDto): Promise<PageDto> => {
    setLoading(true);
    try {
      return await apiClient.post<PageDto>(ENDPOINTS.pages.create, data);
    } finally {
      setLoading(false);
    }
  };

  const updatePage = async (
    id: number,
    data: UpdatePageDto
  ): Promise<PageDto> => {
    setLoading(true);
    try {
      return await apiClient.put<PageDto>(ENDPOINTS.pages.update(id), data);
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
