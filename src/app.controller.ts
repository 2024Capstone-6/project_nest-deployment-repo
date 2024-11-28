import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return { message: 'Welcome to the API' };
  }

  @Get('api/status')
  getStatus() {
    console.log(process.env.DATABASE_USER)
    return { message: 'API is running' };
  }
}
