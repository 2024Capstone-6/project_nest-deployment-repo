import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { S3Module } from './s3/s3.module';
import { Member } from './member/member.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 환경변수(.env)를 전역적으로 사용하기 위한 설정
    TypeOrmModule.forRoot({
      type: 'mysql', // 사용할 데이터베이스 타입
      host: process.env.DATABASE_HOST, // 데이터베이스 호스트
      port: parseInt(process.env.DATABASE_PORT, 10), // 데이터베이스 포트 (10진수 변환)
      username: process.env.DATABASE_USER, // 데이터베이스 사용자 이름
      password: process.env.DATABASE_PASSWORD, // 데이터베이스 비밀번호
      database: process.env.DATABASE_NAME, // 데이터베이스 이름
      entities: [Member], // 사용할 엔티티 리스트
      synchronize: true, // 엔티티와 데이터베이스 동기화 (주의: 프로덕션 환경에서는 false 추천)
    }),
    MemberModule, // 멤버 관련 기능을 포함한 모듈
    S3Module, // S3 관련 기능을 포함한 모듈
  ],
  controllers: [AppController], // 앱의 기본 컨트롤러
  providers: [AppService], // 서비스 제공
})
export class AppModule {}