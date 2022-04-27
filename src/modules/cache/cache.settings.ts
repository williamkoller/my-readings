import { CacheModule as BaseCacheModule } from '@nestjs/common';
import { CachesRepository } from './repositories/caches.repository';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const imports = [
  BaseCacheModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      store: redisStore,
      url: config.get('redisUrl'),
      auth_pass: config.get('redisPass'),
    }),
  }),
];

export const providers = [CachesRepository];
