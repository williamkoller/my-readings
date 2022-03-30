import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { Book } from '@/modules/books/schemas/book.schema';

@Injectable()
export class FindAllBooksService {
  constructor(private readonly booksRepo: BooksRepository) {}

  async findAll(): Promise<Book[]> {
    const books = await this.booksRepo.findAll();

    if (!books.length) {
      throw new NotFoundException('no record found.');
    }

    return books;
  }
}
