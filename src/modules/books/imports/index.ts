import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '@/modules/books/schemas/book.schema';
import { CacheModule } from '@nestjs/common';

export const imports = [
  MongooseModule.forFeature([
    {
      name: Book.name,
      schema: BookSchema,
    },
  ]),
  CacheModule.register(),
];
