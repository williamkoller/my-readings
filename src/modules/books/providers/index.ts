import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { AddBookService } from '@/modules/books/services/add-book/add-book.service';
import { DeleteBookService } from '@/modules/books/services/delete-book/delete-book.service';
import { FindAllBooksService } from '@/modules/books/services/find-all-books/find-all.books.service';
import { FindByIdBookService } from '@/modules/books/services/find-by-id/find-by-id-book.service';
import { UpdateBookService } from '@/modules/books/services/update-book/update-book.service';

export const providers = [
  BooksRepository,
  AddBookService,
  FindAllBooksService,
  FindByIdBookService,
  UpdateBookService,
  DeleteBookService,
];
