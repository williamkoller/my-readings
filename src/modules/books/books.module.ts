import { Module } from '@nestjs/common';
import { controllers } from '@/modules/books/controllers';
import { providers } from '@/modules/books/providers';
import { imports } from '@/modules/books/imports';

@Module({
  imports,
  controllers,
  providers,
})
export class BooksModule {}
