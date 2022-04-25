import { Module } from '@nestjs/common';
import {
  controllers,
  imports,
  providers,
} from '@/modules/users/users.settings';

@Module({
  controllers,
  imports,
  providers,
})
export class UsersModule {}
