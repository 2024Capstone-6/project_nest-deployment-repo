import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { S3Module } from './member/s3/s3.module';

import { UserdtModule } from './userdt/userdt.module';
import { MemberModule } from './member/member.module';
import { JapanModule } from './japan/japan.module';
import { SpecialModule } from './special/special.module';

import { Userdt } from './userdt/entities/userdt.entity';
import { Member } from './member/member.entity';
import { Activities } from './japan/entities/activities.entity';
import { Japanese } from './japan/entities/japanese.entity';
import { Special } from './special/entities/special.entity';
// 루트 모듈: 애플리케이션의 시작점, 주요 모듈과 데이터베이스 연결 설정을 담당
// @Module: NestJS의 모듈 정의 데코레이터
// 애플리케이션의 구성 요소 설정(import, controllers, providers, exports)
@Module({
  // 외부 및 사용자 정의 모듈
  imports: [
    // ConfigModule: 환경 변수(.env)를 관리하기 위한 모듈
    // .forRoot: 환경 변수를 애플리케이션에서 사용할 수 있게 설정
    ConfigModule.forRoot({ isGlobal: true }), // 환경 변수를 전역적으로 사용
    // TypeOrmModule: NestJS에서 데이터베이스와 연결하고 관리하기 위한 모듈
    // TypeORM: 객체-관계 매핑(ORM) 도구, 엔티티(Entity)를 통해 데이터베이스 테이블을 관리
    // TypeOrmModule.forRoot(): 데이터베이스 연결 설정을 정의
    TypeOrmModule.forRoot({
      type: 'mysql', // MySQL 사용
      // 환경 변수로 데이터베이스 정보 설정
      host: process.env.DATABASE_HOST, // 서버 주소
      port: +process.env.DATABASE_PORT, // 포트 번호
      username: process.env.DATABASE_USER, // 사용자 이름
      password: process.env.DATABASE_PASSWORD, // 비밀번호
      database: process.env.DATABASE_NAME, // 사용할 데이터베이스 이름
      // 데이터베이스 테이블과 매핑
      entities: [Userdt, Member, Activities, Japanese, Special],
      // 테이블 자동 동기화
      synchronize: true,
    }),
    UserdtModule,
    MemberModule,
    S3Module, 
    JapanModule,
    SpecialModule,
    PassportModule,
    JwtModule, // 모듈 import
  ],
})
export class AppModule {}