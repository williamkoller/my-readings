import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swagger = (app: NestExpressApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('My Readings Example')
    .setDescription('My Readings API description')
    .setVersion('2.0.2')
    .addTag('auth')
    .addTag('books')
    .addTag('users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
};
