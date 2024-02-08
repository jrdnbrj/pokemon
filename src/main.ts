import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remueve propiedades que no estén definidas en el DTO
    forbidNonWhitelisted: true, // lanza un error cuando hay propiedades no definidas en el DTO
  }));

  await app.listen(3000);
}
bootstrap();
