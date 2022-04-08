import { Module } from '@nestjs/common';
import { imports } from '@/modules/users/imports';
import { providers } from '@/modules/users/providers';
import { controllers } from '@/modules/users/controllers';

@Module({
  imports,
  controllers,
  providers,
})
export class UsersModule {}
