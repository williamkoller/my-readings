import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { AddBookDto } from '@/modules/books/dtos/add-book.dto';

@Injectable()
export class ProcessBook {
  constructor(@InjectQueue('books') private booksQueue: Queue) {}

  async process(addBookDto: AddBookDto): Promise<void> {
    await this.booksQueue.add(
      'process_book',
      { ...addBookDto },
      { delay: 1000 * 60 * 0.2, attempts: 1, stackTraceLimit: 1 },
    );
  }
}
