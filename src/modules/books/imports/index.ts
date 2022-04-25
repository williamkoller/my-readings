import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from '@/modules/books/schemas/book.schema';
import { CacheModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const imports = [
  MongooseModule.forFeature([
    {
      name: Book.name,
      schema: BookSchema,
    },
  ]),
  CacheModule.register(),
  BullModule.registerQueueAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    name: 'books',
    useFactory: async (config: ConfigService) => ({
      redis: {
        host: config.get('redisHost'),
        port: config.get('redisPort'),
      },
    }),
  }),
];
