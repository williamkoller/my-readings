import { GET_BOOKS_CACHE_KEY } from '@/modules/cache/constants/books-cache-key.constant';
import { CachesRepository } from '@/modules/cache/repositories/caches.repository';
import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Book } from '@/modules/books/schemas/book.schema';

type BookType = {
  toJSON(): Book;
};

@Injectable()
export class BooksCountService {
  private logger = new Logger(BooksCountService.name);
  private limit = 10;
  private TEN_MINUTES = 1 * 60 * 10;
  constructor(
    private readonly booksRepository: BooksRepository,
    private readonly cachesRepository: CachesRepository,
    @InjectQueue('books')
    private readonly booksQueue: Queue,
  ) {}

  @Interval(5000)
  async countBooks() {
    let offset = await this.cachesRepository.getCache(GET_BOOKS_CACHE_KEY);

    offset = offset === undefined ? 0 : offset;

    this.logger.log(`offset ${JSON.stringify(offset)}.`);

    const countBooks = await this.booksRepository.countBooks(
      offset,
      this.limit,
    );

    this.logger.log(`${countBooks.length} found`);

    if (countBooks.length === this.limit) {
      this.cachesRepository.setCache(
        GET_BOOKS_CACHE_KEY,
        offset + this.limit,
        this.TEN_MINUTES,
      );
    }

    this.logger.log(`found ${this.limit} books.`);
    this.booksQueue.add({
      books: countBooks.map((book: BookType) => book.toJSON()),
    });
  }
}
