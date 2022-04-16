import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { GET_BOOKS_CACHE_KEY } from './books-cache-key.constant';

@Injectable()
export class CacheManagement {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
  async clearCache(): Promise<void> {
    const keys: string[] = await this.cacheManager.store.keys();

    keys.forEach((key) => {
      if (key.startsWith(GET_BOOKS_CACHE_KEY)) {
        this.cacheManager.del(key);
      }
    });
  }

  async addCache<T>(name: string, payload: T): Promise<void> {
    await this.cacheManager.set(name, payload, { ttl: 1000 });
  }

  async getCache(name: string): Promise<string> {
    return await this.cacheManager.get(name);
  }
}
