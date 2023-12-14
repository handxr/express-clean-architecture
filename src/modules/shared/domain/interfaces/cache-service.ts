export interface ICacheService {
  get(key: string): unknown;
  set(key: string, value: unknown): boolean;
  del(key: string): void;
}
