import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  search: z.string().optional(),
});

export const idSchema = z.object({
  id: z.string().uuid(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
