import { Module } from '@nestjs/common';
import { controllers, imports, providers } from '@/modules/auth/auth.settings';

@Module({
  controllers,
  imports,
  providers,
})
export class AuthModule {}
