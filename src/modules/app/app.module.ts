import { Module } from '@nestjs/common';
import { imports } from '@/modules/app/app.settings';

@Module({
  imports,
})
export class AppModule {}
