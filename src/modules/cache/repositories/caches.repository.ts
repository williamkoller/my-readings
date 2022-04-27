import { GET_BOOKS_CACHE_KEY } from '@/modules/cache/constants/books-cache-key.constant';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

import { Cache } from 'cache-manager';

@Injectable()
export class CachesRepository {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async clearCache(): Promise<void> {
    const keys: string[] = await this.cacheManager.store.keys();

    keys.forEach((key) => {
      if (key.startsWith(GET_BOOKS_CACHE_KEY)) {
        this.cacheManager.del(key);
      }
    });
  }

  async setCache<T>(name: string, payload: T, ttl: number): Promise<void> {
    await this.cacheManager.set(name, payload, { ttl });
  }

  async getCache(name: string): Promise<number> {
    return await this.cacheManager.get<number>(name);
  }
}
