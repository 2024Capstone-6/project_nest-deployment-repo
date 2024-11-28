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
    ConfigModule.forRoot({ isGlobal: true }), // .env 파일을 불러오기 위한 설정
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10), // 10진수로 변환
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Member], // 엔티티 경로 설정
      synchronize: true, // 데이터베이스 스키마 동기화
    }),
    MemberModule, // Members 모듈 import
    S3Module, // S3 모듈 import
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}