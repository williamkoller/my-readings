import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddBookDto } from '@/modules/books/dtos/add-book.dto';
import { Book } from '@/modules/books/schemas/book.schema';
import { AddBookService } from '@/modules/books/services/add-book/add-book.service';
import { FindAllBooksService } from '@/modules/books/services/find-all-books/find-all.books.service';
import { FindByIdBookService } from '@/modules/books/services/find-by-id/find-by-id-book.service';
import { UpdateBookDto } from '@/modules/books/dtos/update-book.dto';
import { UpdateBookService } from '@/modules/books/services/update-book/update-book.service';
import { DeleteBookService } from '@/modules/books/services/delete-book/delete-book.service';

@Controller('books')
export class BooksController {
  constructor(
    private readonly addBookService: AddBookService,
    private readonly findAllBooksService: FindAllBooksService,
    private readonly findByIdBookService: FindByIdBookService,
    private readonly updateBookService: UpdateBookService,
    private readonly deleteBookService: DeleteBookService,
  ) {}

  @Post()
  async add(@Body() addBookDto: AddBookDto): Promise<Book> {
    return await this.addBookService.add(addBookDto);
  }

  @Get()
  async index(): Promise<Book[]> {
    return await this.findAllBooksService.findAll();
  }

  @Get(':_id')
  async show(@Param('_id') _id: string): Promise<Book> {
    return await this.findByIdBookService.findById(_id);
  }

  @Put(':_id')
  async update(
    @Param('_id') _id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return await this.updateBookService.updateBook(_id, updateBookDto);
  }

  @Delete(':_id')
  async delete(@Param('_id') _id: string): Promise<{ message: string }> {
    return await this.deleteBookService.delete(_id);
  }
}
