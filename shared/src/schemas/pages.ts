import { z } from 'zod';

export const pageStatusSchema = z.enum([
  'draft',
  'published',
  'archived',
  'scheduled',
]);

export const createPageSchema = z.object({
  name: z
    .string()
    .min(1, 'form:validation.required')
    .max(255, 'form:validation.maxLength'),
  title: z
    .string()
    .min(1, 'form:validation.required')
    .max(500, 'form:validation.maxLength'),
  slug: z
    .string()
    .min(1, 'form:validation.required')
    .max(255, 'form:validation.maxLength')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers, and hyphens'
    ),
  description: z.string().max(1000, 'form:validation.maxLength').optional(),
  metaTitle: z.string().max(255, 'form:validation.maxLength').optional(),
  metaDescription: z.string().max(500, 'form:validation.maxLength').optional(),
  metaKeywords: z.string().max(500, 'form:validation.maxLength').optional(),
  status: pageStatusSchema.default('draft'),
  template: z.string().max(255, 'form:validation.maxLength').optional(),
  priority: z.number().int().min(0).max(100).optional(),
  parentPageId: z.number().int().positive().optional(),
  requiresLogin: z.boolean().default(false),
  adminOnly: z.boolean().default(false),
  content: z.record(z.any()).default({}),
  layout: z.record(z.any()).default({}),
  settings: z.record(z.any()).default({}),
  styles: z.record(z.any()).default({}),
});

export const updatePageSchema = createPageSchema.partial().extend({
  id: z.number().int().positive(),
});

export const pageSearchSchema = z.object({
  pageNumber: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(20),
  search: z.string().optional(),
  status: pageStatusSchema.optional(),
  sortBy: z.string().default('updatedAt'),
  sortDirection: z.enum(['asc', 'desc']).default('desc'),
  parentPageId: z.number().int().positive().optional(),
  requiresLogin: z.boolean().optional(),
  adminOnly: z.boolean().optional(),
  template: z.string().optional(),
  isPublished: z.boolean().optional(),
  createdFrom: z.string().datetime().optional(),
  createdTo: z.string().datetime().optional(),
  updatedFrom: z.string().datetime().optional(),
  updatedTo: z.string().datetime().optional(),
});

export type CreatePageFormData = z.infer<typeof createPageSchema>;
export type UpdatePageFormData = z.infer<typeof updatePageSchema>;
export type PageSearchFormData = z.infer<typeof pageSearchSchema>;
