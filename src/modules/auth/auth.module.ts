import { Module } from '@nestjs/common';
import { imports } from '@/modules/auth/imports';
import { providers } from '@/modules/auth/providers';
import { controllers } from '@/modules/auth/controllers';

@Module({
  imports,
  providers,
  controllers,
})
export class AuthModule {}
