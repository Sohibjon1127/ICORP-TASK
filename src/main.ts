import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dotenvConfig } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(dotenvConfig.PORT);
}
bootstrap();
