export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://localhost:7206',
  httpURL: import.meta.env.VITE_API_HTTP_URL || 'http://localhost:5252',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

export const ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    refresh: '/api/auth/refresh',
    logout: '/api/auth/logout',
    me: '/api/auth/me',
    forgotPassword: '/api/auth/forgot-password',
    resetPassword: '/api/auth/reset-password',
  },
  pages: {
    list: '/api/page',
    getById: (id: number) => `/api/page/${id}`,
    getBySlug: (slug: string) => `/api/page/by-slug/${slug}`,
    create: '/api/page',
    update: (id: number) => `/api/page/${id}`,
    delete: (id: number) => `/api/page/${id}`,
    publish: (id: number) => `/api/page/${id}/publish`,
    unpublish: (id: number) => `/api/page/${id}/unpublish`,
    duplicate: (id: number) => `/api/page/${id}/duplicate`,
    validateSlug: '/api/page/validate-slug',
    versions: (id: number) => `/api/page/${id}/versions`,
    restoreVersion: (id: number, versionId: number) =>
      `/api/page/${id}/versions/${versionId}/restore`,
    structure: (id: number) => `/api/page/${id}/structure`,
    hierarchy: '/api/page/hierarchy',
    published: '/api/page/published',
  },
  designer: {
    getPage: (id: number) => `/api/designer/pages/${id}`,
    savePage: (id: number) => `/api/designer/pages/${id}/save`,
    autoSave: (id: number) => `/api/designer/pages/${id}/autosave`,
    deletePage: (id: number) => `/api/designer/pages/${id}`,
    generatePreview: (id: number) => `/api/designer/pages/${id}/preview`,
    getPreview: (token: string) => `/api/designer/preview/${token}`,
    publishPage: (id: number) => `/api/designer/pages/${id}/publish`,
    unpublishPage: (id: number) => `/api/designer/pages/${id}/unpublish`,
    createVersion: (id: number) => `/api/designer/pages/${id}/versions`,
    getVersions: (id: number) => `/api/designer/pages/${id}/versions`,
    restoreVersion: (id: number, versionId: number) =>
      `/api/designer/pages/${id}/versions/${versionId}/restore`,
    getState: (id: number) => `/api/designer/pages/${id}/state`,
    saveState: (id: number) => `/api/designer/pages/${id}/state`,
    clearState: (id: number) => `/api/designer/pages/${id}/state`,
  },
} as const;
