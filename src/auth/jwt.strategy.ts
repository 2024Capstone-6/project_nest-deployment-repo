/* import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';  // JwtPayload 인터페이스 추가 필요

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      noreExpiration: false, // 만료된 토큰 거부
      secretOrKey: 'your_secret_key', // 비밀 키
    });
  }

  async validate(payload: JwtPayload) {
    // JWT 검증 후 처리 로직
    return { userId: payload.sub, username: payload.username };
  }
}
 */