import { Module } from '@nestjs/common';
import {
  controllers,
  imports,
  providers,
} from '@/modules/books/books.settings';

@Module({
  controllers,
  imports,
  providers,
})
export class BooksModule {}
