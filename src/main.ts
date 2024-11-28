import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 필요에 따라 CORS 설정 추가
  await app.listen(3000);
}
bootstrap();