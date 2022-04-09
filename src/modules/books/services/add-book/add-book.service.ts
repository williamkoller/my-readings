import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AddBookDto } from '@/modules/books/dtos/add-book.dto';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { BookOutputType } from '@/modules/books/types/book-output.type';
import { bookTransform } from '@/modules/books/transforms/books.transform';
import { Cache } from 'cache-manager';

@Injectable()
export class AddBookService {
  constructor(
    private readonly booksRepo: BooksRepository,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async add(addBookDto: AddBookDto): Promise<BookOutputType> {
    const book = await this.booksRepo.findByName(addBookDto.name);

    if (book) {
      throw new ConflictException('there is already a book with that name');
    }
    const bookCreated = await this.booksRepo.add(addBookDto);
    await this.cache.set('book', bookCreated);
    return bookTransform(bookCreated);
  }
}
