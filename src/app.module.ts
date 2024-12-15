import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { S3Module } from './member/s3/s3.module';

import { UserdtModule } from './userdt/userdt.module';
import { MemberModule } from './member/member.module';
import { JapanModule } from './japan/japan.module';
import { BoardModule } from './board/board/board.module';
import { SpecialModule } from './special/special.module';

import { Userdt } from './userdt/entities/userdt.entity';
import { Member } from './member/member.entity';
import { Activities } from './japan/entities/activities.entity';
import { Japanese } from './japan/entities/japanese.entity';
import { Board } from './board/board/entities/board.entity';
import { Special } from './special/entities/special.entity';
// 루트 모듈: 애플리케이션의 시작점, 주요 모듈과 데이터베이스 연결 설정을 담당
// @Module: NestJS의 모듈 정의 데코레이터
// 애플리케이션의 구성 요소 설정(import, controllers, providers, exports)

import { AwsModule } from './board/board_aws/aws.module';
import { ChatModule } from './board/board_chat/chat.module';
import { Chat } from './board/board_chat/entities/chat.entity';

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
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Userdt, Member, Activities, Japanese, Board, Chat, Special],
      synchronize: true, // 개발 환경에서만 true로 설정
    }),
    UserdtModule,
    MemberModule,
    S3Module,
    JapanModule,
    BoardModule,
    AwsModule,
    ChatModule,
    SpecialModule, // 모듈 import
  ],
})
export class AppModule {}
