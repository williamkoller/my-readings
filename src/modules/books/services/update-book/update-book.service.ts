import { Injectable } from '@nestjs/common';
import { UpdateBookDto } from '../../dtos/update-book.dto';
import { BooksRepository } from '../../repositories/books.repository';
import { Book } from '../../schemas/book.schema';
import { FindByIdBookService } from '../find-by-id/find-by-id-book.service';

@Injectable()
export class UpdateBookService {
  constructor(
    private readonly findByIdService: FindByIdBookService,
    private readonly booksRepo: BooksRepository,
  ) {}

  async updateBook(_id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const bookFound = await this.findByIdService.findById(_id);
    return await this.booksRepo.update(bookFound._id, updateBookDto);
  }
}
