import { z } from 'zod';

// Enums
export enum PageStatus {
  Draft = 'Draft',
  Published = 'Published',
  Scheduled = 'Scheduled',
  Archived = 'Archived',
}

export enum UserRole {
  Customer = 'Customer',
  Admin = 'Admin',
  Developer = 'Developer',
}

export enum ComponentType {
  Button = 'Button',
  Text = 'Text',
  Image = 'Image',
  Container = 'Container',
  Grid = 'Grid',
  Form = 'Form',
}

// User DTOs
export interface UserDto {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isLocked: boolean;
  lastLoginAt?: string;
  pictureFileId?: number;
  pictureUrl?: string;
  emailVerifiedAt?: string;
  role: UserRole;
  roleName: string;
  createdAt: string;
  updatedAt: string;
}

// Page DTOs (matching backend)
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

// Designer DTOs
export interface DesignerPageDto {
  id: number;
  name: string;
  title: string;
  slug: string;
  description?: string;
  status: PageStatus;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  content: Record<string, any>;
  layout: Record<string, any>;
  settings: Record<string, any>;
  styles: Record<string, any>;
  hasUnsavedChanges: boolean;
  currentVersion: number;
}

export interface SaveDesignerPageDto {
  pageId: number;
  content: Record<string, any>;
  layout: Record<string, any>;
  settings: Record<string, any>;
  styles: Record<string, any>;
  changeDescription?: string;
  createVersion: boolean;
  autoSave: boolean;
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

export interface DesignerPreviewDto {
  pageId: number;
  previewUrl: string;
  previewToken: string;
  expiresAt: string;
  settings: Record<string, any>;
}

export interface DesignerStateDto {
  pageId: number;
  selectedComponentKey?: string;
  expandedComponents: string[];
  activeBreakpoint: string;
  viewMode: string;
  zoomLevel: number;
  showGrid: boolean;
  showRulers: boolean;
  snapToGrid: boolean;
  preferences: Record<string, any>;
  lastModified: string;
}

// Paged Result
export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

// Component DTOs for Designer
export interface BaseComponent {
  id: string;
  type: ComponentType;
  name: string;
  props: Record<string, any>;
  styles: Record<string, any>;
  children?: BaseComponent[];
  position: {
    row: number;
    column: number;
    span: number;
  };
}

export interface ButtonComponent extends BaseComponent {
  type: ComponentType.Button;
  props: {
    text: string;
    variant: 'primary' | 'secondary' | 'danger' | 'outline';
    size: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    onClick?: string;
    icon?: string;
    loading?: boolean;
  };
}

// Zod Schemas for validation
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().default(false),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

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
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreatePageFormData = z.infer<typeof createPageSchema>;
export type UpdatePageFormData = z.infer<typeof updatePageSchema>;

// Utility types
export type User = UserDto;
export type Page = PageDto;
export type PageListItem = PageListDto;
