import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remueve propiedades que no estén definidas en el DTO
    forbidNonWhitelisted: true, // lanza un error cuando hay propiedades no definidas en el DTO
    transform: true, // transforma los tipos de datos a los especificados en el DTO
    transformOptions: { // habilita la conversión de tipos de datos
      enableImplicitConversion: true
    }
  }));

  await app.listen(process.env.PORT || 3000);
  console.log(`App is running on port ${process.env.PORT || 3000}`);
}
bootstrap();
