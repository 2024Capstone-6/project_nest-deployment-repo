import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 설정 추가
  app.enableCors({
    origin: 'http://localhost:5173', // 허용할 클라이언트의 URL
    credentials: true,               // 쿠키와 같은 자격 증명 정보를 허용할 경우
  });

  // 전역 ValidationPipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의된 속성만 허용
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 요청 거부
      transform: true, // 요청 데이터를 DTO 클래스 인스턴스로 자동 변환
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
