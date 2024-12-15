// main.ts: NestJS 애플리케이션의 진입점
// 애플리케이션을 생성하고 설정하며 실행하는 역할
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// 애플리케이션을 비동기로 실행하는 함수
// 비동기 작업(데이터베이스 연결, 초기화 등)을 처리할 수 있도록 하기 위해
async function bootstrap() {
  // AppModule을 기반으로 NestJS 애플리케이션 생성
  // NestFactory: NestJS 애플리케이션의 인스턴스를 생성하는 데 사용
  const app = await NestFactory.create(AppModule);

  // ValidationPipe 전역 설정 추가
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성은 자동으로 제거
      transform: true, // 입력 데이터를 DTO 클래스의 인스턴스로 자동 변환
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 요청 거부
    }),
  );

  // CORS(Cross-Origin Resource Sharing) 활성화
  // CORS: 브라우저가 다른 도메인 또는 포트에서의 요청을 허용하도록 하는 설정
  app.enableCors({
    origin: 'http://localhost:5173', // 허용할 도메인 지정
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드 지정
    credentials: true, // 클라이언트와 서버 간 쿠키, 인증 헤더 등의 자격 증명 허용
  });
  // 애플리케이션이 지정된 포트에서 요청을 수신
  // 환경 변수가 없으면 3000 포트에서 애플리케이션 실행
  await app.listen(process.env.PORT ?? 3000);
}
// 함수 호출. 애플리케이션 실행
bootstrap();
