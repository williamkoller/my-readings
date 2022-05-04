import { Test, TestingModule } from '@nestjs/testing';
import { AddBookService } from './add-book.service';
import { BooksRepository } from '../../repositories/books.repository';
import { CachesRepository } from '@/modules/cache/repositories/caches.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Book, BookSchema } from '../../schemas/book.schema';
import { CacheModule } from '@nestjs/common';
import envFolderPath, { environments } from '@/config/environments';

describe('AddBookService', () => {
  let service: AddBookService;
  let repo: BooksRepository;
  let cache: CachesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: envFolderPath.folderPath,
          load: [environments],
        }),
        MongooseModule.forRoot(`${process.env.MONGODB_URI}`),
        MongooseModule.forFeature([
          {
            name: Book.name,
            schema: BookSchema,
          },
        ]),
        CacheModule.register(),
      ],
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
