import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 애플리케이션의 진입점, NestJS 애플리케이션을 생성 및 실행
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS 활성화 (프론트엔드와의 통신을 위해)
  await app.listen(3000); // 애플리케이션 실행
}
bootstrap();