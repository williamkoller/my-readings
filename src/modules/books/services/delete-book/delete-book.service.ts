import { Injectable } from '@nestjs/common';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { FindByIdBookService } from '@/modules/books/services/find-by-id/find-by-id-book.service';

@Injectable()
export class DeleteBookService {
  constructor(
    private readonly findByIdBookService: FindByIdBookService,
    private readonly booksRepo: BooksRepository,
  ) {}

  async delete(_id: string): Promise<{ message: string }> {
    const bookFound = await this.findByIdBookService.findById(_id);
    await this.booksRepo.delete(bookFound._id);
    return {
      message: 'Book deleted with successfully',
    };
  }
}
