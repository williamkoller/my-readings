import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envFolderPath, { environments } from '@/config/environments';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from '@/modules/books/books.module';

@Module({
  imports: [
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
