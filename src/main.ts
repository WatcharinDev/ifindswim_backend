
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/api/v1/uploads', express.static('uploads'));
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: 'http://localhost:3000', // กำหนด URL ของ frontend ที่อนุญาต
    methods: 'GET,POST', // กำหนด HTTP methods ที่อนุญาต
    allowedHeaders: 'Content-Type, Authorization', // กำหนด headers ที่อนุญาต
  });
  const config = new DocumentBuilder()
    .setTitle('I Find Swim Api')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('Images')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();

