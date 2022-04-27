import { CacheModule as BaseCacheModule } from '@nestjs/common';
import { CachesRepository } from './repositories/caches.repository';
import * as redisStore from 'cache-manager-redis-store';

export const imports = [
  BaseCacheModule.register({
    store: redisStore,
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT || 12290,
    },
  }),
];

export const providers = [CachesRepository];
