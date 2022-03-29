import { Injectable } from '@nestjs/common';
import { AddBookDto } from '@/modules/books/dtos/add-book.dto';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { Book } from '@/modules/books/schemas/book.schema';

@Injectable()
export class AddBookService {
  constructor(private readonly booksRepo: BooksRepository) {}

  async add(addBookDto: AddBookDto): Promise<Book> {
    return await this.booksRepo.add(addBookDto);
  }
}
