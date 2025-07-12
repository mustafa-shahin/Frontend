export const APP_CONFIG = {
  NAME: 'CMS Designer',
  VERSION: '1.0.0',
  API_TIMEOUT: 30000,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const USER_ROLES = {
  CUSTOMER: 'Customer',
  ADMIN: 'Admin',
  DEV: 'Dev',
} as const;

export const PAGE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  SCHEDULED: 'scheduled',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PAGES: '/pages',
  DESIGNER: '/designer',
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '/404',
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PAGES: {
    LIST: '/page',
    BY_ID: (id: number) => `/page/${id}`,
    BY_SLUG: (slug: string) => `/page/by-slug/${slug}`,
    PUBLISHED: '/page/published',
    HIERARCHY: '/page/hierarchy',
    SEARCH: '/page/search',
  },
} as const;
