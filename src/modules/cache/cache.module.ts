import { Module } from '@nestjs/common';
import { imports, providers } from './cache.settings';

@Module({
  imports,
  providers,
})
export class CacheModule {}
