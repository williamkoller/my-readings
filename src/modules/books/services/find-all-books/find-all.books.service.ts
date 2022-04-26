import { Injectable, NotFoundException } from '@nestjs/common';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { booksTransform } from '@/modules/books/transforms/books.transform';
import { CachesRepository } from '@/modules/cache/repositories/caches.repository';
import { GET_BOOKS_CACHE_KEY } from '@/modules/cache/constants/books-cache-key.constant';
import { Book } from '../../schemas/book.schema';

@Injectable()
export class FindAllBooksService {
  private TEN_MINUTES = 10;
  constructor(
    private readonly booksRepo: BooksRepository,
    private readonly cachesRepository: CachesRepository,
  ) {}

  async findAll(): Promise<Book[] | number> {
    const cache = await this.cachesRepository.getCache(GET_BOOKS_CACHE_KEY);

    if (cache) {
      return cache;
    }

    const books = await this.booksRepo.findAll();

    await this.cachesRepository.clearCache();

    await this.cachesRepository.setCache(
      GET_BOOKS_CACHE_KEY,
      booksTransform(books),
      this.TEN_MINUTES,
    );

    if (!books.length) {
      throw new NotFoundException('no record found.');
    }

    return booksTransform(books);
  }
}
