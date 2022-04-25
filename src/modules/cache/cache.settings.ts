import { CacheModule as BaseCacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { CachesRepository } from './repositories/caches.repository';

export const imports = [
  BaseCacheModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      store: redisStore,
      host: config.get('redisHost'),
      port: config.get('redisPort'),
      ttl: 60 * 3600 * 1000,
    }),
  }),
];

export const providers = [CachesRepository];
