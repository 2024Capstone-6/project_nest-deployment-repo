import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Userdt } from 'src/userdt/entities/userdt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  // 인증 관련 로직 관리 모듈
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Userdt]),
    JwtModule.registerAsync({
      // 비동기로 JwtModule을 설정
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // 환경 변수에서 비밀 키 불러오기
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule], // JwtModule을 exports하여 다른 모듈에서 JWT 사용 가능
})
export class AuthModule {}
