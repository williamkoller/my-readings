import { BooksController } from '@/modules/books/controllers/books.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '@/modules/books/schemas/book.schema';
import { CacheModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { AddBookService } from '@/modules/books/services/add-book/add-book.service';
import { DeleteBookService } from '@/modules/books/services/delete-book/delete-book.service';
import { FindAllBooksService } from '@/modules/books/services/find-all-books/find-all.books.service';
import { FindByIdBookService } from '@/modules/books/services/find-by-id/find-by-id-book.service';
import { UpdateBookService } from '@/modules/books/services/update-book/update-book.service';
import { CachesRepository } from '@/modules/cache/repositories/caches.repository';
import { BooksCountService } from '@/modules/books/services/books-count/books-count.service';
import { FindBookByNameService } from '@/modules/books/services/find-book-by-name/find-book-by-name.service';
import { ProcessBook } from '@/modules/books/process/books.process';
import { BookResolver } from '@/modules/books/resolvers/books.resolver';

export const controllers = [BooksController];

export const imports = [
  MongooseModule.forFeature([
    {
      name: Book.name,
      schema: BookSchema,
    },
  ]),
  CacheModule.register(),
  BullModule.registerQueueAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    name: 'books',
    useFactory: async (config: ConfigService) => ({
      redis: {
        host: config.get('redisHost'),
        port: config.get('redisPort'),
      },
    }),
  }),
];

export const providers = [
  BooksRepository,
  AddBookService,
  FindAllBooksService,
  FindByIdBookService,
  UpdateBookService,
  DeleteBookService,
  CachesRepository,
  BooksCountService,
  FindBookByNameService,
  ProcessBook,
  BookResolver,
];
