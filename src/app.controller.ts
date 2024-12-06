import { Controller, Get } from '@nestjs/common';

// 루트 경로("/")와 관련된 요청을 처리하는 컨트롤러
@Controller()
export class AppController {
  // 루트 경로에서 메시지를 반환하는 API
  @Get()
  getRoot() {
    return { message: 'Welcome to the API' };
  }
  // api/status 경로에서 메시지를 반환하는 API
  @Get('api/status')
  getStatus() {
    console.log(process.env.DATABASE_USER)
    return { message: 'API is running' };
  }
}
