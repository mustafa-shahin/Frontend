import { apiService } from './api';
import type { PageItem, PagesData } from '../components/pages/PagesList';

export interface PageSearchParams {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  status?: string;
  sortBy?: string;
  sortDirection?: string;
}

export interface CreatePageData {
  name: string;
  title: string;
  slug: string;
  description?: string;
  template?: string;
  parentPageId?: number;
  requiresLogin?: boolean;
  adminOnly?: boolean;
}

export interface UpdatePageData extends CreatePageData {
  id: number;
}

class PagesService {
  private readonly basePath = '/page';

  /**
   * Get paginated list of pages
   */
  async getPages(params: PageSearchParams = {}): Promise<PagesData> {
    const queryParams = new URLSearchParams();

    if (params.pageNumber)
      queryParams.set('pageNumber', params.pageNumber.toString());
    if (params.pageSize)
      queryParams.set('pageSize', params.pageSize.toString());
    if (params.searchTerm) queryParams.set('search', params.searchTerm);
    if (params.status) queryParams.set('status', params.status);
    if (params.sortBy) queryParams.set('sortBy', params.sortBy);
    if (params.sortDirection)
      queryParams.set('sortDirection', params.sortDirection);

    const url = `${this.basePath}?${queryParams.toString()}`;
    return await apiService.get<PagesData>(url);
  }

  /**
   * Get a specific page by ID
   */
  async getPage(id: number): Promise<PageItem> {
    return await apiService.get<PageItem>(`${this.basePath}/${id}`);
  }

  /**
   * Get a page by slug (public endpoint)
   */
  async getPageBySlug(slug: string): Promise<PageItem> {
    return await apiService.get<PageItem>(`${this.basePath}/by-slug/${slug}`);
  }

  /**
   * Create a new page
   */
  async createPage(data: CreatePageData): Promise<PageItem> {
    return await apiService.post<PageItem>(this.basePath, data);
  }

  /**
   * Update a page
   */
  async updatePage(
    id: number,
    data: Partial<UpdatePageData>
  ): Promise<PageItem> {
    return await apiService.put<PageItem>(`${this.basePath}/${id}`, data);
  }

  /**
   * Delete a page
   */
  async deletePage(id: number): Promise<void> {
    await apiService.delete(`${this.basePath}/${id}`);
  }

  /**
   * Publish a page
   */
  async publishPage(id: number): Promise<PageItem> {
    return await apiService.post<PageItem>(`${this.basePath}/${id}/publish`);
  }

  /**
   * Unpublish a page
   */
  async unpublishPage(id: number): Promise<PageItem> {
    return await apiService.post<PageItem>(`${this.basePath}/${id}/unpublish`);
  }

  /**
   * Duplicate a page
   */
  async duplicatePage(id: number, newName: string): Promise<PageItem> {
    return await apiService.post<PageItem>(`${this.basePath}/${id}/duplicate`, {
      newName,
    });
  }

  /**
   * Validate slug availability
   */
  async validateSlug(
    slug: string,
    excludePageId?: number
  ): Promise<{ isValid: boolean }> {
    const queryParams = new URLSearchParams({ slug });
    if (excludePageId) {
      queryParams.set('excludePageId', excludePageId.toString());
    }

    return await apiService.get<{ isValid: boolean }>(
      `${this.basePath}/validate-slug?${queryParams.toString()}`
    );
  }

  /**
   * Get page hierarchy
   */
  async getPageHierarchy(): Promise<PageItem[]> {
    return await apiService.get<PageItem[]>(`${this.basePath}/hierarchy`);
  }

  /**
   * Search pages
   */
  async searchPages(params: PageSearchParams): Promise<PagesData> {
    return await apiService.post<PagesData>(`${this.basePath}/search`, params);
  }
}

export const pagesService = new PagesService();
export { PagesService };
