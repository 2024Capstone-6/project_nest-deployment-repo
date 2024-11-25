import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserdtDto } from './dto/create-userdt.dto';
import { Userdt } from './entities/userdt.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserdtService {
  // 사용자 생성 메서드
  constructor(
    @InjectRepository(Userdt)
    private readonly userdtRepository: Repository<Userdt>,
  ) {}

  async create(createUserdtDto: CreateUserdtDto): Promise<Userdt> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserdtDto.password, saltOrRounds);

    const user = this.userdtRepository.create({
      ...createUserdtDto,
      password: hashedPassword,
    });
    return this.userdtRepository.save(user);
  }

  // 사용자 조회 메서드: 모든 사용자 반환
  async findAll(): Promise<Userdt[]> {
    return this.userdtRepository.find(); // 모든 사용자 데이터를 가져옵니다
  }

  // validateUser 서비스
  async validateUser(email: string, password: string): Promise<Userdt | null> {
    const user = await this.userdtRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user; // 유효한 사용자
    }
    return null; // 인증 실패
  }
  
  async findByNickname(nickname: string): Promise<Userdt | undefined> {
    return this.userdtRepository.findOne({ where: { nickname } });
  }

  async findByEmail(email: string): Promise<Userdt | undefined> {
    return this.userdtRepository.findOne({ where: { email } });
  } 

  // nickname 중복 확인 로직 추가
  async isNicknameAvailable(nickname: string): Promise<boolean> {
    const isAvailable = await this.userdtRepository.findOne({ where: { nickname } });
    console.log('Nickname Query Result:', isAvailable)
    return !isAvailable;
  }

  // email 중복 확인 로직 추가
  async isEmailAvailable(email: string): Promise<boolean> {
    const isAvailable = await this.userdtRepository.findOne({ where: { email } });
    return !isAvailable;
  }
}
