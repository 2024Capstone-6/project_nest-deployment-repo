import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 추가
  app.enableCors({
    origin: 'http://localhost:5173', // 허용할 클라이언트의 URL
    credentials: true,               // 쿠키와 같은 자격 증명 정보를 허용할 경우
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
