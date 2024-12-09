import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'; // passport-jwt 모듈에서 JWT 전략(Strategy)과 JWT를 추출하는 유틸리티(ExtractJwt)를 가져옴

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // 만료된 토큰은 인증 실패로 처리
      secretOrKey: process.env.JWT_SECRET || 'Myjwt1234!',
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
      nickname: payload.nickname,
    }; // JWT가 유효한 경우 호출되는 메서드로, payload는 디코딩된 JWT의 내용
  }
}
