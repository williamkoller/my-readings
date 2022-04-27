import { CacheModule as BaseCacheModule } from '@nestjs/common';
import { CachesRepository } from './repositories/caches.repository';

export const imports = [
  BaseCacheModule.register({
    url: process.env.REDIS_URL,
    isGlobal: true,
  }),
];

export const providers = [CachesRepository];
