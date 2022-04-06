import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '@/modules/books/schemas/book.schema';

export const imports = [
  MongooseModule.forFeature([
    {
      name: Book.name,
      schema: BookSchema,
    },
  ]),
];
