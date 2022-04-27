import envFolderPath, { environments } from '@/config/environments';
import { AuthModule } from '@/modules/auth/auth.module';
import { AwsModule } from '@/modules/aws/aws.module';
import { BooksModule } from '@/modules/books/books.module';
import { UsersModule } from '@/modules/users/users.module';
import { forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@/modules/cache/cache.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule } from '@nestjs/throttler';
import { CoreModule } from '@/modules/core/core.module';
import { GraphqlModule } from '@/modules/graphql/graphql.module';

export const imports = [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: envFolderPath.folderPath,
    load: [environments],
  }),
  // MongooseModule.forRootAsync({
  //   imports: [ConfigModule],
  //   inject: [ConfigService],
  //   useFactory: async (config: ConfigService) => ({
  //     uri: config.get<string>('mongoUri'),
  //   }),
  // }),
  MongooseModule.forRoot(process.env.MONGODB_URI),
  ScheduleModule.forRoot(),
  forwardRef(() => BooksModule),
  forwardRef(() => UsersModule),
  forwardRef(() => AuthModule),
  forwardRef(() => AwsModule),
  forwardRef(() => CacheModule),
  forwardRef(() => CoreModule),
  forwardRef(() => GraphqlModule),
  ThrottlerModule.forRoot({
    ttl: 60,
    limit: 10,
  }),
];
