import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddBookDto } from '@/modules/books/dtos/add-book.dto';
import { Book } from '@/modules/books/schemas/book.schema';
import { AddBookService } from '@/modules/books/services/add-book/add-book.service';
import { FindAllBooksService } from '@/modules/books/services/find-all-books/find-all.books.service';

@Controller('books')
export class BooksController {
  constructor(
    private readonly addBookService: AddBookService,
    private readonly findAllBooksService: FindAllBooksService,
  ) {}

  @Post()
  async add(@Body() addBookDto: AddBookDto): Promise<Book> {
    return await this.addBookService.add(addBookDto);
  }

  @Get()
  async index(): Promise<Book[]> {
    return await this.findAllBooksService.findAll();
  }
}
