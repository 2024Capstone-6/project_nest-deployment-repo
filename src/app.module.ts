import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
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
import { Board } from './board/entities/board.entity';
import { Special } from './special/entities/special.entity';

import { AwsModule } from './board/board_aws/aws.module';
import { ChatModule } from './board/board_chat/chat.module';
import { Chat } from './board/board_chat/entities/chat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 환경변수(.env)를 전역적으로 사용하기 위한 설정
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Userdt, Member, Activities, Japanese, Board, Chat, Special],
      synchronize: true, // 개발 환경에서만 true로 설정, 제출 시 false로 변경해줘야 함
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
