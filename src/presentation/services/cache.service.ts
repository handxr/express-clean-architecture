import { LRUCache } from "lru-cache";

export class CacheService {
  private cache: LRUCache<string, any>;

  constructor() {
    this.cache = new LRUCache({
      max: 500,
    });
  }

  get(key: string): unknown {
    return this.cache.get(key);
  }

  set(key: string, value: unknown): boolean {
    const result = this.cache.set(key, value);
    return result !== undefined;
  }

  del(key: string): void {
    this.cache.delete(key);
  }
}
