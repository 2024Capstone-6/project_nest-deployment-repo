import { Controller, Get, Post, Body, Query, Patch, Param, Delete, UnauthorizedException } from '@nestjs/common';
import { UserdtService } from './userdt.service';
import { CreateUserdtDto } from './dto/create-userdt.dto';

@Controller('userdt')
export class UserdtController {
  constructor(private readonly userdtService: UserdtService) {}

  /* @Post()
  create(@Body() createUserdtDto: CreateUserdtDto) {
    return this.userdtService.create(createUserdtDto);
  }

  @Get()
  findAll() {
    return this.userdtService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userdtService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserdtDto: UpdateUserdtDto) {
    return this.userdtService.update(+id, updateUserdtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userdtService.remove(+id);
  } */

  // 5. 클라이언트에서 데이터를 받을 엔드포인트 생성
  @Post()
  async create(@Body() createUserdtDto: CreateUserdtDto) {
    try {
      const newUser = await this.userdtService.create(createUserdtDto);
      return { message: "User created successfully", user: newUser };
    } catch (error) {
      return { message: "Error creating user", error: error.message };
    }
  }

  // GET 요청 추가: 모든 사용자 정보 조회
  @Get()
  async findAll() {
    try {
      const users = await this.userdtService.findAll();
      return { message: 'Users retrieved successfully', users };
    } catch (error) {
      return { message: 'Error retrieving users', error: error.message };
    }
  }

  // 로그인 API
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const user = await this.userdtService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return { message: 'Login successful', user };
  }

  // 닉네임 중복 확인 엔드포인트 추가
  @Get('check-nickname')
  async checkNickname(@Query('nickname') nickname: string) {
    const isAvailable = await this.userdtService.isNicknameAvailable(nickname);
    return { available: isAvailable };
  }

  // 이메일 중복 확인 엔드포인트 추가
  @Get('check-email')
  async checkEmail(@Query('email') email: string) {
    const isAvailable = await this.userdtService.isEmailAvailable(email);
    return { available: isAvailable };
  }
}
