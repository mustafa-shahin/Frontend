import { useState, useEffect, useCallback } from 'react';
import {
  pagesService,
  type PageSearchParams,
  type CreatePageData,
  type UpdatePageData,
} from '../services/pages';
import type { PageItem, PagesData } from '../components/pages/PagesList';

interface UsePagesOptions {
  initialParams?: PageSearchParams;
  autoFetch?: boolean;
}

interface UsePagesReturn {
  pages: PagesData;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  setSearchParams: (params: PageSearchParams) => void;
  createPage: (data: CreatePageData) => Promise<PageItem>;
  updatePage: (id: number, data: Partial<UpdatePageData>) => Promise<PageItem>;
  deletePage: (id: number) => Promise<void>;
  publishPage: (id: number) => Promise<PageItem>;
  unpublishPage: (id: number) => Promise<PageItem>;
  duplicatePage: (id: number, newName: string) => Promise<PageItem>;
}

const defaultPagesData: PagesData = {
  data: [],
  pageNumber: 1,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

export function usePages(options: UsePagesOptions = {}): UsePagesReturn {
  const { initialParams = {}, autoFetch = true } = options;

  const [pages, setPages] = useState<PagesData>(defaultPagesData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<PageSearchParams>({
    pageNumber: 1,
    pageSize: 10,
    ...initialParams,
  });

  const fetchPages = useCallback(
    async (params?: PageSearchParams) => {
      try {
        setLoading(true);
        setError(null);

        const finalParams = params || searchParams;
        const result = await pagesService.getPages(finalParams);

        setPages(result);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch pages';
        setError(errorMessage);
        console.error('Error fetching pages:', err);
      } finally {
        setLoading(false);
      }
    },
    [searchParams]
  );

  const updateSearchParams = useCallback((newParams: PageSearchParams) => {
    setSearchParams((prev) => ({ ...prev, ...newParams }));
  }, []);

  const createPage = useCallback(
    async (data: CreatePageData): Promise<PageItem> => {
      try {
        setError(null);
        const newPage = await pagesService.createPage(data);
        await fetchPages(); // Refresh the list
        return newPage;
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create page';
        setError(errorMessage);
        throw err;
      }
    },
    [fetchPages]
  );

  const updatePage = useCallback(
    async (id: number, data: Partial<UpdatePageData>): Promise<PageItem> => {
      try {
        setError(null);
        const updatedPage = await pagesService.updatePage(id, data);
        await fetchPages(); // Refresh the list
        return updatedPage;
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update page';
        setError(errorMessage);
        throw err;
      }
    },
    [fetchPages]
  );

  const deletePage = useCallback(
    async (id: number): Promise<void> => {
      try {
        setError(null);
        await pagesService.deletePage(id);
        await fetchPages(); // Refresh the list
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete page';
        setError(errorMessage);
        throw err;
      }
    },
    [fetchPages]
  );

  const publishPage = useCallback(
    async (id: number): Promise<PageItem> => {
      try {
        setError(null);
        const publishedPage = await pagesService.publishPage(id);
        await fetchPages(); // Refresh the list
        return publishedPage;
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to publish page';
        setError(errorMessage);
        throw err;
      }
    },
    [fetchPages]
  );

  const unpublishPage = useCallback(
    async (id: number): Promise<PageItem> => {
      try {
        setError(null);
        const unpublishedPage = await pagesService.unpublishPage(id);
        await fetchPages(); // Refresh the list
        return unpublishedPage;
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to unpublish page';
        setError(errorMessage);
        throw err;
      }
    },
    [fetchPages]
  );

  const duplicatePage = useCallback(
    async (id: number, newName: string): Promise<PageItem> => {
      try {
        setError(null);
        const duplicatedPage = await pagesService.duplicatePage(id, newName);
        await fetchPages(); // Refresh the list
        return duplicatedPage;
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to duplicate page';
        setError(errorMessage);
        throw err;
      }
    },
    [fetchPages]
  );

  // Auto-fetch when search params change
  useEffect(() => {
    if (autoFetch) {
      fetchPages(searchParams);
    }
  }, [searchParams, autoFetch, fetchPages]);

  return {
    pages,
    loading,
    error,
    refetch: () => fetchPages(),
    setSearchParams: updateSearchParams,
    createPage,
    updatePage,
    deletePage,
    publishPage,
    unpublishPage,
    duplicatePage,
  };
}
