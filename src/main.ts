// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  // Add cookie parser middleware
  app.use(cookieParser());

  await app.listen(3080);
}
bootstrap();

