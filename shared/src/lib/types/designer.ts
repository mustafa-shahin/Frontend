import { PageStatus } from './page';

// Component Enums
export enum ComponentType {
  Button = 'Button',
  Text = 'Text',
  Image = 'Image',
  Container = 'Container',
  Grid = 'Grid',
  Form = 'Form',
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

export interface PublishPageDto {
  pageId: number;
  publishMessage?: string;
  scheduledAt?: string;
  createVersion: boolean;
}

export interface GeneratePreviewDto {
  settings?: Record<string, any>;
}

export interface CreateVersionDto {
  changeNotes?: string;
  metadata?: Record<string, any>;
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
    href?: string;
    fullWidth?: boolean;
  };
}
