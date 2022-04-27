import { CacheModule as BaseCacheModule } from '@nestjs/common';
import { CachesRepository } from './repositories/caches.repository';
import * as redisStore from 'cache-manager-redis-store';

export const imports = [
  BaseCacheModule.register({
    store: redisStore.create({
      url: process.env.REDIS_URL,
    }),
  }),
];

export const providers = [CachesRepository];
