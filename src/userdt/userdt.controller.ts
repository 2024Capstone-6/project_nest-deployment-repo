import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  UsePipes,
  UnauthorizedException,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { UserdtService } from './userdt.service';
import { CreateUserdtDto } from './dto/create-userdt.dto';
import { AuthService } from '../auth/auth.service'; // 추가

@Controller('userdt')
export class UserdtController {
  constructor(
    private readonly userdtService: UserdtService,
    private readonly authService: AuthService, // 추가
  ) {}

  // 5. 클라이언트에서 데이터를 받을 엔드포인트 생성
  @Post()
  async create(@Body() createUserdtDto: CreateUserdtDto) {
    try {
      const newUser = await this.userdtService.create(createUserdtDto);
      return { message: 'User created successfully', user: newUser };
    } catch (error) {
      return { message: 'Error creating user', error };
    }
  }

  // GET 요청 추가: 모든 사용자 정보 조회
  @Get()
  async findAll() {
    try {
      const users = await this.userdtService.findAll();
      return { message: 'Users retrieved successfully', users };
    } catch (error) {
      return { message: 'Error retrieving users', error };
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

    const { access_token } = await this.authService.login(user); // 로그인 후 토큰 생성
    return {
      message: 'Login successful',
      access_token, // JWT 토큰을 함께 반환
      user: {
        email: user.email,
        id: user.id,
        nickname: user.nickname,
      },
    };
  }

  // 닉네임 중복 확인 엔드포인트 추가
  @Get('check-nickname')
  async checkNickname(@Query('nickname') nickname: string) {
    const { isValid, isAvailable } =
      await this.userdtService.isNicknameAvailable(nickname);
    return { valid: isValid, available: isAvailable };
  }

  // 이메일 중복 확인 엔드포인트 추가
  @Get('check-email')
  async checkEmail(@Query('email') email: string) {
    const { isValid, isAvailable } =
      await this.userdtService.isEmailAvailable(email);
    return { valid: isValid, available: isAvailable };
  }

  // 비밀번호 유효성 검사 API 추가
  @Get('check-password')
  async checkPassword(@Query('password') password: string) {
    const isValid = await this.userdtService.isPasswordValid(password);
    return { valid: isValid };
  }

  // 유효성 검사 API
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createUser(@Body() createUserdtDto: CreateUserdtDto) {
    // 유효성 검사가 통과되면 여기서 로직 처리
    return { message: 'User created successfully!' };
  }
}
