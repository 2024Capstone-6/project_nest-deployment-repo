import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// 애플리케이션의 진입점, NestJS 애플리케이션을 생성 및 실행
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ValidationPipe 전역 설정 추가
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성은 자동으로 제거
      transform: true, // 입력 데이터를 DTO 클래스의 인스턴스로 자동 변환
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 요청 거부
    }),
  );

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
// dto를 사용하는 명시 없음
bootstrap();
