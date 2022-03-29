import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { Book } from '@/modules/books/schemas/book.schema';

@Injectable()
export class FindByIdBookService {
  constructor(private readonly booksRepo: BooksRepository) {}

  async findById(_id: string): Promise<Book> {
    const bookFound = await this.booksRepo.findById(_id);

    if (!bookFound) {
      throw new NotFoundException('book not found');
    }

    return bookFound;
  }
}
