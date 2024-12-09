import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserdtService } from '../userdt/userdt.service';

@Injectable() // 서비스를 의존성 주입이 가능한 상태로 만듬
export class AuthService {
  constructor(
    // 객체가 생성될 때 초기화시켜주는 함수
    private readonly userdtService: UserdtService,
    private readonly jwtService: JwtService,
    // AuthService의 생성자에서 UserdtService와 JwtService를 주입받아 사용
  ) {}

  // 사용자의 이메일과 비밀번호를 확인하여 유효성을 검증하는 메서드
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userdtService.validateUser(email, password); // UserdtService의 validateUser 메서드를 호출하여 이메일과 비밀번호가 맞는 사용자를 찾기
    if (user) {
      const { ...result } = user;
      return result;
    }
    return null; // 사용자가 유효하지 않을 경우 null을 반환
  }

  // 사용자가 로그인 요청을 하면 호출되는 메서드
  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      nickname: user.nickname,
    }; // JWT의 payload로 사용할 데이터를 생성
    console.log('Payload:', payload); // payload 확인
    const access_token = this.jwtService.sign(payload); // JwtService를 사용해 JWT 토큰을 생성
    console.log('Generated access_token:', access_token);
    return {
      message: 'Login successful',
      access_token: access_token,
      user: {
        email: user.email,
        id: user.id,
        nickname: user.nickname,
      },
    };
  }
}
