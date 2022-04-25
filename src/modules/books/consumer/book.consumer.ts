import {
  InjectQueue,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bull';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { Book } from '@/modules/books/schemas/book.schema';
import { FindBookByNameService } from '@/modules/books/services/find-book-by-name/find-book-by-name.service';

@Processor('books')
export class BookConsumer {
  private logger = new Logger(BookConsumer.name);
  constructor(
    private readonly booksRepo: BooksRepository,
    private readonly findBookByNameService: FindBookByNameService,
    @InjectQueue('books') private readonly booksQueue: Queue,
  ) {}

  @Process('process_book')
  async processBook(job: Job<Book>): Promise<void> {
    const { name, description, author, status, url } = job.data;

    await this.findBookByNameService.findByName(name);

    await this.booksRepo.add({
      name,
      description,
      author,
      status,
      url: url ? url : null,
    });
  }

  @OnQueueCompleted()
  async onCompleted(job: Job<Book>): Promise<void> {
    this.logger.log(`onCompleted: ${JSON.stringify(job.data)}`);
    const numberOfJobs = await this.booksQueue.count();
    const activeJobs = await this.booksQueue.getActiveCount();

    if (numberOfJobs === 0 && activeJobs === 0) {
      await this.booksQueue.empty();
    }
  }

  @OnQueueFailed()
  public async onQueueFailed(job: Job<Book>): Promise<void> {
    this.logger.log(
      `Error in processing queue: ${JSON.stringify(job.failedReason)}`,
    );
  }
}
