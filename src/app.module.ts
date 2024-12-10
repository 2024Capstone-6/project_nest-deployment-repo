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
      entities: [Userdt, Member, Activities, Japanese, Special],
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