import { useState, useEffect, useCallback } from 'react';
import {
  pagesService,
  PageSearchParams,
  PagedResult,
  PageListItem,
} from '../services/pages';

export interface UsePagesOptions {
  pageSize?: number;
  autoFetch?: boolean;
}

export interface UsePagesReturn {
  pages: PageListItem[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters: {
    searchTerm: string;
    statusFilter: string;
  };
  actions: {
    fetchPages: (params?: PageSearchParams) => Promise<void>;
    setPage: (page: number) => void;
    setSearchTerm: (term: string) => void;
    setStatusFilter: (status: string) => void;
    refresh: () => Promise<void>;
  };
}

export function usePages(options: UsePagesOptions = {}): UsePagesReturn {
  const { pageSize = 20, autoFetch = true } = options;

  const [pages, setPages] = useState<PageListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Initialize pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
    pageSize,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const fetchPages = useCallback(
    async (params: PageSearchParams = {}) => {
      try {
        setLoading(true);
        setError(null);

        const searchParams = {
          pageNumber: currentPage,
          pageSize,
          search: searchTerm || undefined,
          status: statusFilter || undefined,
          sortBy: 'updatedAt',
          sortDirection: 'desc',
          ...params,
        };

        const result = await pagesService.getPages(searchParams);

        setPages(result.data);
        setPagination({
          currentPage: result.pageNumber,
          totalPages: result.totalPages,
          totalCount: result.totalCount,
          pageSize: result.pageSize,
          hasNextPage: result.hasNextPage,
          hasPreviousPage: result.hasPreviousPage,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch pages';
        setError(errorMessage);
        console.error('Failed to fetch pages:', err);
      } finally {
        setLoading(false);
      }
    },
    [currentPage, pageSize, searchTerm, statusFilter]
  );

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSetSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const handleSetStatusFilter = useCallback((status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  const refresh = useCallback(async () => {
    await fetchPages();
  }, [fetchPages]);

  // Auto-fetch on dependency changes
  useEffect(() => {
    if (autoFetch) {
      fetchPages();
    }
  }, [fetchPages, autoFetch]);

  // Debounce search term
  useEffect(() => {
    if (!autoFetch) return;

    const timeoutId = setTimeout(() => {
      fetchPages();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, statusFilter, fetchPages, autoFetch]);

  return {
    pages,
    loading,
    error,
    pagination,
    filters: {
      searchTerm,
      statusFilter,
    },
    actions: {
      fetchPages,
      setPage,
      setSearchTerm: handleSetSearchTerm,
      setStatusFilter: handleSetStatusFilter,
      refresh,
    },
  };
}
