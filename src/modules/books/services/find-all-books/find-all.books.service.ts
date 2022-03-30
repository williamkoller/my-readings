import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { booksTransform } from '@/modules/books/transforms/books.transform';
import { BookOutputType } from '@/modules/books/types/book-output.type';

@Injectable()
export class FindAllBooksService {
  constructor(private readonly booksRepo: BooksRepository) {}

  async findAll(): Promise<BookOutputType[]> {
    const books = await this.booksRepo.findAll();

    if (!books.length) {
      throw new NotFoundException('no record found.');
    }

    return booksTransform(books);
  }
}
