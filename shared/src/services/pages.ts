import { apiService } from './api';

export interface PageSearchParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  sortBy?: string;
  sortDirection?: string;
}

export interface PagedResult<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Page {
  id: number;
  name: string;
  title: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status: 'draft' | 'published' | 'archived' | 'scheduled';
  template?: string;
  priority?: number;
  parentPageId?: number;
  requiresLogin: boolean;
  adminOnly: boolean;
  publishedOn?: string;
  publishedBy?: string;
  createdAt: string;
  updatedAt: string;
  content: Record<string, any>;
  layout: Record<string, any>;
  settings: Record<string, any>;
  styles: Record<string, any>;
  childPages?: Page[];
}

export interface PageListItem {
  id: number;
  name: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived' | 'scheduled';
  createdAt: string;
  updatedAt: string;
  publishedOn?: string;
  hasChildren: boolean;
  versionCount: number;
  currentVersion: number;
}

export class PagesService {
  /**
   * Get paginated list of pages
   */
  async getPages(
    params: PageSearchParams = {}
  ): Promise<PagedResult<PageListItem>> {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    });

    return apiService.get<PagedResult<PageListItem>>(
      `/page?${searchParams.toString()}`
    );
  }

  /**
   * Get page by ID
   */
  async getPage(id: number): Promise<Page> {
    return apiService.get<Page>(`/page/${id}`);
  }

  /**
   * Get page by slug (public)
   */
  async getPageBySlug(slug: string): Promise<Page> {
    return apiService.get<Page>(`/page/by-slug/${slug}`);
  }

  /**
   * Get published pages (public)
   */
  async getPublishedPages(): Promise<Page[]> {
    return apiService.get<Page[]>('/page/published');
  }

  /**
   * Get page hierarchy
   */
  async getPageHierarchy(): Promise<Page[]> {
    return apiService.get<Page[]>('/page/hierarchy');
  }
}

export const pagesService = new PagesService();
