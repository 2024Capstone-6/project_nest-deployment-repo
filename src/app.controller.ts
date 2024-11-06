import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return { message: 'Welcome to the API' };
  }

  @Get('api/status')
  getStatus() {
    return { message: 'API is running' };
  }
}
