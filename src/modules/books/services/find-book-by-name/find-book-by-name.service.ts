import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { Book } from '@/modules/books/schemas/book.schema';

@Injectable()
export class FindBookByNameService {
  constructor(private readonly booksRepo: BooksRepository) {}

  async findByName(name: string): Promise<Book> {
    const bookFound = await this.booksRepo.findByName(name);

    if (!bookFound) {
      throw new NotFoundException('book not found.');
    }

    return bookFound;
  }
}
