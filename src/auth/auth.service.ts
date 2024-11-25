/* import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserdtService } from '../userdt/userdt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userdtService: UserdtService,
    private readonly jwtService: JwtService,
  ) {}

  // 유저 검증 및 토큰 발행
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userdtService.findByEmail(email);
    if (user && user.password === password) { // 여기서 비밀번호 해싱 비교 추가 필요
      const { password, ...result } = user; // 비밀번호 제외한 유저 정보 반환
      return result;
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
} */