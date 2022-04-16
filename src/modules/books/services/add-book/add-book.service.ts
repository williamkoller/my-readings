import { ConflictException, Injectable } from '@nestjs/common';
import { AddBookDto } from '@/modules/books/dtos/add-book.dto';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { BookOutputType } from '@/modules/books/types/book-output.type';
import { bookTransform } from '@/modules/books/transforms/books.transform';
import { CacheManagement } from '@/utils/cache/cache-management';
import { GET_BOOKS_CACHE_KEY } from '@/utils/cache/books-cache-key.constant';

@Injectable()
export class AddBookService {
  constructor(
    private readonly booksRepo: BooksRepository,
    private readonly cacheManagement: CacheManagement,
  ) {}

  async add(addBookDto: AddBookDto): Promise<BookOutputType> {
    const book = await this.booksRepo.findByName(addBookDto.name);

    if (book) {
      throw new ConflictException('there is already a book with that name');
    }
    const bookCreated = await this.booksRepo.add(addBookDto);

    await this.cacheManagement.addCache(GET_BOOKS_CACHE_KEY, addBookDto);
    return bookTransform(bookCreated);
  }
}
