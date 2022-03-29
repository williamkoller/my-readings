import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './controllers/books.controller';
import { BooksRepository } from './repositories/books.repository';
import { Book, BookSchema } from './schemas/book.schema';
import { AddBookService } from './services/add-book/add-book.service';
import { DeleteBookService } from './services/delete-book/delete-book.service';
import { FindAllBooksService } from './services/find-all-books/find-all.books.service';
import { FindByIdBookService } from './services/find-by-id/find-by-id-book.service';
import { UpdateBookService } from './services/update-book/update-book.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [
    BooksRepository,
    AddBookService,
    FindAllBooksService,
    FindByIdBookService,
    UpdateBookService,
    DeleteBookService,
  ],
})
export class BooksModule {}
