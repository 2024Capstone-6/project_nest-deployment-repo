import { Module } from '@nestjs/common';
import { SpecialService } from './special.service';
import { SpecialController } from './special.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Special } from './entities/special.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    TypeOrmModule.forFeature([Special]),
    JwtModule.register({
    secret: process.env.JWT_SECRET,  // 비밀 키 설정
    signOptions:{expiresIn:'1h'}
  }),],
  controllers: [SpecialController],
  providers: [SpecialService],
})
export class SpecialModule {}
