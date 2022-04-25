import { Resolver, Query } from '@nestjs/graphql';
import { Book } from '../schemas/book.schema';
import { FindAllBooksService } from '../services/find-all-books/find-all.books.service';
import { BookOutputType } from '../types/book-output.type';

@Resolver()
export class BookResolver {
  constructor(private readonly findAlllBooksService: FindAllBooksService) {}

  @Query(() => [Book])
  async books(): Promise<BookOutputType[] | number> {
    return await this.findAlllBooksService.findAll();
  }
}
