import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://127.0.0.1:5500',
      // 'http://localhost:3000/proveedor/',
    ],
    methods:['GET']
  })
  // app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))
  await app.listen(3000);
}
bootstrap();
