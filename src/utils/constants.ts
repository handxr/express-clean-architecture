export const INVALIDATE_CACHE_METHODS = [
  "PUT",
  "DELETE",
  "PATCH",
  "POST",
] as const;

export type InvalidateCacheMethod = (typeof INVALIDATE_CACHE_METHODS)[number];
