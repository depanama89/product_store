import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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

  app.enableCors({
    origin: process.env.SERVER_URL,
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3500);
}
bootstrap();
