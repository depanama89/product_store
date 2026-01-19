import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3500);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // <--- CETTE LIGNE EST CRUCIALE
      transformOptions: {
        enableImplicitConversion: true, // Permet aussi de convertir les types simples automatiquement
      },
    }),
  );
}
bootstrap();
