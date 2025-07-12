import { z } from 'zod';

export const paginationSchema = z.object({
  pageNumber: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().max(100).default(10),
});

export const sortSchema = z.object({
  sortBy: z.string().default('createdAt'),
  sortDirection: z.enum(['asc', 'desc']).default('desc'),
});

export const searchSchema = z.object({
  searchTerm: z.string().optional(),
  filters: z.record(z.any()).default({}),
});

export const baseEntitySchema = z.object({
  id: z.number().int().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  createdByUserId: z.number().int().positive().optional(),
  updatedByUserId: z.number().int().positive().optional(),
});

export type PaginationData = z.infer<typeof paginationSchema>;
export type SortData = z.infer<typeof sortSchema>;
export type SearchData = z.infer<typeof searchSchema>;
export type BaseEntity = z.infer<typeof baseEntitySchema>;
