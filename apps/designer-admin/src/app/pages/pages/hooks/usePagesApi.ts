import { useState } from 'react';
import { apiClient, ENDPOINTS, PagedResult } from '@frontend/shared';

interface PageListItem {
  id: number;
  name: string;
  title: string;
  slug: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  publishedOn?: string;
  hasChildren: boolean;
  versionCount: number;
  currentVersion: number;
}

export const usePagesApi = () => {
  const [loading, setLoading] = useState(false);

  const getPages = async (
    page = 1,
    pageSize = 10,
    search?: string
  ): Promise<PagedResult<PageListItem>> => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (search) {
        params.append('search', search);
      }

      const response = await apiClient.get<PagedResult<PageListItem>>(
        `${ENDPOINTS.pages.list}?${params.toString()}`
      );

      return response;
    } finally {
      setLoading(false);
    }
  };

  const getPageById = async (id: number) => {
    setLoading(true);
    try {
      return await apiClient.get(ENDPOINTS.pages.getById(id));
    } finally {
      setLoading(false);
    }
  };

  const createPage = async (data: any) => {
    setLoading(true);
    try {
      return await apiClient.post(ENDPOINTS.pages.create, data);
    } finally {
      setLoading(false);
    }
  };

  const updatePage = async (id: number, data: any) => {
    setLoading(true);
    try {
      return await apiClient.put(ENDPOINTS.pages.update(id), data);
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (id: number) => {
    setLoading(true);
    try {
      return await apiClient.delete(ENDPOINTS.pages.delete(id));
    } finally {
      setLoading(false);
    }
  };

  const publishPage = async (id: number) => {
    setLoading(true);
    try {
      return await apiClient.post(ENDPOINTS.pages.publish(id));
    } finally {
      setLoading(false);
    }
  };

  const unpublishPage = async (id: number) => {
    setLoading(true);
    try {
      return await apiClient.post(ENDPOINTS.pages.unpublish(id));
    } finally {
      setLoading(false);
    }
  };

  const duplicatePage = async (id: number, newName: string) => {
    setLoading(true);
    try {
      return await apiClient.post(ENDPOINTS.pages.duplicate(id), { newName });
    } finally {
      setLoading(false);
    }
  };

  const validateSlug = async (slug: string, excludePageId?: number) => {
    try {
      const params = new URLSearchParams({ slug });
      if (excludePageId) {
        params.append('excludePageId', excludePageId.toString());
      }

      const response = await apiClient.get(
        `${ENDPOINTS.pages.validateSlug}?${params.toString()}`
      );
      return response.IsValid;
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
