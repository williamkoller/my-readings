import envFolderPath, { environments } from '@/config/environments';
import { AuthModule } from '@/modules/auth/auth.module';
import { BooksModule } from '@/modules/books/books.module';
import { UsersModule } from '@/modules/users/users.module';
import { forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

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
  forwardRef(() => BooksModule),
  forwardRef(() => UsersModule),
  forwardRef(() => AuthModule),
];
