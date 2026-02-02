import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:4200', // dev
      'https://ton-frontend.vercel.app', // prod (à mettre plus tard)
    ],
    credentials: true,
  });


  // ✅ IMPORTANT : middleware AVANT listen
  const uploadsPath = path.join(__dirname, '..', 'uploads');
  app.use('/uploads', express.static(uploadsPath));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
