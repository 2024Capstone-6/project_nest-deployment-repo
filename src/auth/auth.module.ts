/* import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserdtModule } from '../userdt/userdt.module'; // UserdtModule import
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserdtModule, // User Service 사용을 위해
    PassportModule, // Passport를 사용
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // .env에 추가 가능
      signOptions: { expiresIn: '1h' }, // 토큰 유효기간 설정
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // 다른 모듈에서 사용 가능하게 export
})
export class AuthModule {} */