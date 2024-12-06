import { Injectable } from '@nestjs/common';

// 루트 경로와 관련된 비즈니스 로직을 처리
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}