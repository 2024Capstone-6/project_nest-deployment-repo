import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// 모듈 import
import { JapanModule } from './japan/japan.module';

// 엔티티 import
import { Activities } from './japan/entities/activities.entity';
import { Japanese } from './japan/entities/japanese.entity';
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
      entities: [Activities, Japanese], // 엔티티를 수동으로 로드
      // 본인 엔티티 import 후 넣어서 작업하세요
      synchronize: true, // 데이터베이스 스키마 동기화
    }),
    JapanModule, // 모듈 import
  ],
})
export class AppModule {}
