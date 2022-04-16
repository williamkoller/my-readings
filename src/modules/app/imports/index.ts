import envFolderPath, { environments } from '@/config/environments';
import { AuthModule } from '@/modules/auth/auth.module';
import { AwsModule } from '@/modules/aws/aws.module';
import { BooksModule } from '@/modules/books/books.module';
import { UsersModule } from '@/modules/users/users.module';
import { forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

export const imports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: envFolderPath.folderPath,
    load: [environments],
  }),
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get('mongoUri'),
    }),
  }),
  CacheModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      store: redisStore,
      host: config.get('redisHost'),
      port: config.get('redisPort'),
      ttl: 60 * 3600 * 1000,
    }),
  }),
  forwardRef(() => BooksModule),
  forwardRef(() => UsersModule),
  forwardRef(() => AuthModule),
  forwardRef(() => AwsModule),
];
