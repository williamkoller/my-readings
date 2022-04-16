import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AddBookDto } from '@/modules/books/dtos/add-book.dto';
import { Book } from '@/modules/books/schemas/book.schema';
import { AddBookService } from '@/modules/books/services/add-book/add-book.service';
import { FindAllBooksService } from '@/modules/books/services/find-all-books/find-all.books.service';
import { FindByIdBookService } from '@/modules/books/services/find-by-id/find-by-id-book.service';
import { UpdateBookDto } from '@/modules/books/dtos/update-book.dto';
import { UpdateBookService } from '@/modules/books/services/update-book/update-book.service';
import { DeleteBookService } from '@/modules/books/services/delete-book/delete-book.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookOutputType } from '@/modules/books/types/book-output.type';
import { JwtAuthGuard } from '@/modules/auth/guards/auth.guard';
import { Cache } from 'cache-manager';

@ApiTags('books')
@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(
    private readonly addBookService: AddBookService,
    private readonly findAllBooksService: FindAllBooksService,
    private readonly findByIdBookService: FindByIdBookService,
    private readonly updateBookService: UpdateBookService,
    private readonly deleteBookService: DeleteBookService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'add new book.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'there is already a book with that name.',
  })
  async add(@Body() addBookDto: AddBookDto): Promise<BookOutputType> {
    return await this.addBookService.add(addBookDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'find all books.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'no record found.',
  })
  async index(): Promise<BookOutputType[] | string> {
    return await this.findAllBooksService.findAll();
  }

  @Get(':_id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'find by id books',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'book not found.',
  })
  async show(@Param('_id') _id: string): Promise<Book> {
    return await this.findByIdBookService.findById(_id);
  }

  @Put(':_id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'update book.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'book not found.',
  })
  async update(
    @Param('_id') _id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return await this.updateBookService.updateBook(_id, updateBookDto);
  }

  @Delete(':_id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'delete book.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'book not found.',
  })
  async delete(@Param('_id') _id: string): Promise<{ message: string }> {
    return await this.deleteBookService.delete(_id);
  }

  @Get('cached/in-memory')
  async cacheBook(): Promise<any> {
    const myFakeDB = 'naveen';
    const value = await this.cacheManager.get('cache');
    console.log(value);

    if (value) {
      return {
        dataFrom: 'In-memory cache',
        name: value,
      };
    }

    await this.cacheManager.set('cache', myFakeDB, { ttl: 1000 });

    return {
      dataFrom: 'Fake database',
      name: myFakeDB,
    };
  }
}
