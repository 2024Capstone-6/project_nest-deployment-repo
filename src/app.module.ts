import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

// 모듈 import
//import { JapanModule } from './japan/japan.module';

// 엔티티 import
//import { Activities } from './japan/entities/activities/activities.entity';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserdtModule } from './userdt/userdt.module';
import { Userdt } from './userdt/entities/userdt.entity'

@Module({
  // 6. DB 연결 설정
  imports: [
    PassportModule, // JWT
    ConfigModule.forRoot({ isGlobal: true }), // .env 파일을 불러오기 위한 설정
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10), // 10진수로 변환
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Userdt], // 엔티티를 수동으로 로드
      // 본인 엔티티 import 후 넣어서 작업하세요
      synchronize: true, // 데이터베이스 스키마 동기화
    }), UserdtModule,
    // JapanModule, // 모듈 import
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
