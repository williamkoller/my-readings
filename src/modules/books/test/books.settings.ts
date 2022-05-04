import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Book, BookSchema } from '@/modules/books/schemas/book.schema';
import { CacheModule } from '@nestjs/common';
import envFolderPath, { environments } from '@/config/environments';

export const imports = [
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
];
