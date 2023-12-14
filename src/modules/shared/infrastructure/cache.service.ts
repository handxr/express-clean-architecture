import { LRUCache } from "lru-cache";
import { ICacheService } from "../domain/interfaces/cache-service";

export class CacheService implements ICacheService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
