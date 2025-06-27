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

// Base Types
export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseEntity {
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
}

export interface Page extends BaseEntity {
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
  content: Record<string, any>;
  layout: Record<string, any>;
  settings: Record<string, any>;
  styles: Record<string, any>;
  childPages: Page[];
}

export interface PageListItem {
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

export interface PageVersion {
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

export interface DesignerPage {
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

export interface DesignerState {
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

export interface DesignerPreview {
  pageId: number;
  previewUrl: string;
  previewToken: string;
  expiresAt: string;
  settings: Record<string, any>;
}

export interface PagedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

// Component Types for Designer
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
    onClick?: string; // Action name or URL
    icon?: string;
    loading?: boolean;
  };
}

export interface GridLayout {
  rows: GridRow[];
}

export interface GridRow {
  id: string;
  components: BaseComponent[];
  styles?: Record<string, any>;
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

export const updatePageSchema = createPageSchema.partial().extend({
  id: z.number(),
});

export const buttonComponentSchema = z.object({
  id: z.string(),
  type: z.literal(ComponentType.Button),
  name: z.string(),
  props: z.object({
    text: z.string(),
    variant: z.enum(['primary', 'secondary', 'danger', 'outline']),
    size: z.enum(['sm', 'md', 'lg']),
    disabled: z.boolean().optional(),
    onClick: z.string().optional(),
    icon: z.string().optional(),
    loading: z.boolean().optional(),
  }),
  styles: z.record(z.any()),
  position: z.object({
    row: z.number(),
    column: z.number(),
    span: z.number().min(1).max(12),
  }),
});

// Type exports for forms
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CreatePageFormData = z.infer<typeof createPageSchema>;
export type UpdatePageFormData = z.infer<typeof updatePageSchema>;
export type ButtonComponentData = z.infer<typeof buttonComponentSchema>;
