import { Book } from '@/modules/books/schemas/book.schema';
import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('books')
export class SendBooksJob {
  private logger = new Logger(SendBooksJob.name);

  @Process()
  handler(job: Job<Book>) {
    this.logger.log(`${JSON.stringify(job.data)}`);
  }
}
