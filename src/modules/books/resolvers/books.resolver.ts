import { Resolver, Query } from '@nestjs/graphql';
import { Book } from '../schemas/book.schema';
import { FindAllBooksService } from '../services/find-all-books/find-all.books.service';

@Resolver()
export class BookResolver {
  constructor(private readonly findAllBooksService: FindAllBooksService) {}

  @Query(() => [Book])
  async books(): Promise<Book[] | number> {
    return await this.findAllBooksService.findAll();
  }
}
