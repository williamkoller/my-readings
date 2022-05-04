import { Test, TestingModule } from '@nestjs/testing';
import { AddBookService } from './add-book.service';
import { BooksRepository } from '@/modules/books/repositories/books.repository';
import { CachesRepository } from '@/modules/cache/repositories/caches.repository';
import { imports } from '@/modules/books/test/books.settings';

describe('AddBookService', () => {
  let service: AddBookService;
  let repo: BooksRepository;
  let cache: CachesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports,
      providers: [AddBookService, BooksRepository, CachesRepository],
    }).compile();

    service = module.get<AddBookService>(AddBookService);
    repo = module.get<BooksRepository>(BooksRepository);
    cache = module.get<CachesRepository>(CachesRepository);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
