import { Module } from '@nestjs/common';
import { providers } from './core.settings';

@Module({
  providers,
})
export class CoreModule {}
