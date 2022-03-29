import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import envFolderPath, { environments } from '@/config/environments';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFolderPath.folderPath,
      load: [environments],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
