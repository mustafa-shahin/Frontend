import { z } from 'zod';

export enum PageStatus {
  Draft = 0,
  Published = 1,
  Archived = 2,
  Scheduled = 3,
}

// Helper function to get display name for PageStatus
export const getPageStatusLabel = (status: PageStatus): string => {
  switch (status) {
    case PageStatus.Draft:
      return 'Draft';
    case PageStatus.Published:
      return 'Published';
    case PageStatus.Archived:
      return 'Archived';
    case PageStatus.Scheduled:
      return 'Scheduled';
    default:
      return 'Unknown';
  }
};

// Helper function to get all status options for forms
export const getPageStatusOptions = () => [
  { label: 'Draft', value: PageStatus.Draft },
  { label: 'Published', value: PageStatus.Published },
  { label: 'Scheduled', value: PageStatus.Scheduled },
  { label: 'Archived', value: PageStatus.Archived },
];

export interface PageDto {
  id: number;
  name: string;
  title: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status: PageStatus;
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
  childPages: PageDto[];
}

export interface CreatePageDto {
  name: string;
  title: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status: PageStatus;
  template?: string;
  priority?: number;
  parentPageId?: number;
  requiresLogin: boolean;
  adminOnly: boolean;
  content: Record<string, any>;
  layout: Record<string, any>;
  settings: Record<string, any>;
  styles: Record<string, any>;
}

export interface UpdatePageDto {
  name: string;
  title: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  status: PageStatus;
  template?: string;
  priority?: number;
  parentPageId?: number;
  requiresLogin: boolean;
  adminOnly: boolean;
  content: Record<string, any>;
  layout: Record<string, any>;
  settings: Record<string, any>;
  styles: Record<string, any>;
}

export interface PageListDto {
  id: number;
  name: string;
  title: string;
  slug: string;
  status: PageStatus;
  createdAt: string;
  updatedAt: string;
  publishedOn?: string;
  hasChildren: boolean;
  versionCount: number;
  currentVersion: number;
}

export interface DuplicatePageDto {
  newName: string;
  duplicateContent: boolean;
}

export interface CreatePageVersionDto {
  changeNotes?: string;
  metadata?: Record<string, any>;
}

export interface PageVersionDto {
  id: number;
  versionNumber: number;
  changeNotes?: string;
  createdAt: string;
  createdByUserName?: string;
  createdByUserId?: number;
  isPublished: boolean;
  publishedAt?: string;
  metadata: Record<string, any>;
}

export interface SavePageStructureDto {
  pageId: number;
  content: Record<string, any>;
  layout: Record<string, any>;
  settings: Record<string, any>;
  styles: Record<string, any>;
  changeDescription?: string;
  createVersion: boolean;
}

// Page Validation Schemas
export const createPageSchema = z.object({
  name: z.string().min(1, 'Page name is required'),
  title: z.string().min(1, 'Page title is required'),
  slug: z
    .string()
    .min(1, 'Page slug is required')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers, and hyphens'
    ),
  description: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  status: z.nativeEnum(PageStatus).default(PageStatus.Draft),
  template: z.string().optional(),
  priority: z.number().optional(),
  parentPageId: z.number().optional(),
  requiresLogin: z.boolean().default(false),
  adminOnly: z.boolean().default(false),
  content: z.record(z.any()).default({}),
  layout: z.record(z.any()).default({}),
  settings: z.record(z.any()).default({}),
  styles: z.record(z.any()).default({}),
});

export const updatePageSchema = createPageSchema;

// Type exports for forms
export type CreatePageFormData = z.infer<typeof createPageSchema>;
export type UpdatePageFormData = z.infer<typeof updatePageSchema>;

// Utility types
export type Page = PageDto;
export type PageListItem = PageListDto;
