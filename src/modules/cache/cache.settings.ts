import { CacheModule as BaseCacheModule } from '@nestjs/common';
import { CachesRepository } from './repositories/caches.repository';
import * as redisStore from 'cache-manager-redis-store';

export const imports = [
  BaseCacheModule.register({
    store: redisStore,
    url: process.env.REDIS_URL,
    isGlobal: true,
  }),
];

export const providers = [CachesRepository];
