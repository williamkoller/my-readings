import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { booksTransform } from '@/modules/books/transforms/books.transform';
import { BookOutputType } from '@/modules/books/types/book-output.type';
import { CacheManagement } from '@/utils/cache/cache-management';
import { GET_BOOKS_CACHE_KEY } from '@/utils/cache/books-cache-key.constant';

@Injectable()
export class FindAllBooksService {
  constructor(
    private readonly booksRepo: BooksRepository,
    private readonly cacheManagement: CacheManagement,
  ) {}

  async findAll(): Promise<BookOutputType[] | string> {
    const cache = await this.cacheManagement.getCache(GET_BOOKS_CACHE_KEY);

    if (cache) {
      return cache;
    }

    const books = await this.booksRepo.findAll();

    await this.cacheManagement.clearCache();

    await this.cacheManagement.addCache(
      GET_BOOKS_CACHE_KEY,
      booksTransform(books),
    );

    if (!books.length) {
      throw new NotFoundException('no record found.');
    }

    return booksTransform(books);
  }
}
