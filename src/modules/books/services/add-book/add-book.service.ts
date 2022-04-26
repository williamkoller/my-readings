import { ConflictException, Injectable } from '@nestjs/common';
import { AddBookDto } from '@/modules/books/dtos/add-book.dto';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { bookTransform } from '@/modules/books/transforms/books.transform';
import { CachesRepository } from '@/modules/cache/repositories/caches.repository';
import { GET_BOOKS_CACHE_KEY } from '@/modules/cache/constants/books-cache-key.constant';
import { Book } from '../../schemas/book.schema';

@Injectable()
export class AddBookService {
  private TEN_MINUTES = 10;
  constructor(
    private readonly booksRepo: BooksRepository,
    private readonly cachesRepository: CachesRepository,
  ) {}

  async add(addBookDto: AddBookDto): Promise<Book> {
    const book = await this.booksRepo.findByName(addBookDto.name);

    if (book) {
      throw new ConflictException('there is already a book with that name.');
    }
    const bookCreated = await this.booksRepo.add(addBookDto);

    await this.cachesRepository.setCache(
      GET_BOOKS_CACHE_KEY,
      bookTransform(bookCreated),
      this.TEN_MINUTES,
    );
    return bookTransform(bookCreated);
  }
}
