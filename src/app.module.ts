import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { JapanModule } from './japan/japan.module';
import { UserdtModule } from './userdt/userdt.module';
import { SpecialModule } from './special/special.module';

import { Userdt } from './userdt/entities/userdt.entity'
import { Activities } from './japan/entities/activities.entity';
import { Japanese } from './japan/entities/japanese.entity';
import { Special } from './special/entities/special.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .env 파일을 불러오기 위한 설정
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Userdt, Activities, Japanese],
      synchronize: true,
    }),
    UserdtModule, JapanModule, SpecialModule // 모듈 import
  ],
})

export class AppModule {}
