import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MemberModule } from './member/member.module';
import { S3Module } from './s3/s3.module';
import { Member } from './member/member.entity';

// AppModule은 애플리케이션의 루트 모듈로,
// 데이터베이스 연결 및 필요한 하위 모듈들을 통합 관리한다.
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 환경 변수를 글로벌로 사용하도록 설정
    TypeOrmModule.forRoot({
      type: 'mysql', // 사용하는 데이터베이스 타입 (MySQL)
      host: process.env.DATABASE_HOST, // 데이터베이스 호스트 정보
      port: parseInt(process.env.DATABASE_PORT, 10), // 포트 번호 (10진수 변환)
      username: process.env.DATABASE_USER, // 데이터베이스 사용자 이름
      password: process.env.DATABASE_PASSWORD, // 데이터베이스 비밀번호
      database: process.env.DATABASE_NAME, // 사용할 데이터베이스 이름
      entities: [Member], // 엔티티 목록 (데이터베이스 모델)
      synchronize: true, // 애플리케이션 시작 시 스키마를 동기화
    }),
    MemberModule, // Member와 관련된 기능을 처리하는 모듈
    S3Module, // AWS S3 업로드 관련 기능을 처리하는 모듈
  ],
})
export class AppModule {}