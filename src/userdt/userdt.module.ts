import { Module } from '@nestjs/common';
import { UserdtService } from './userdt.service';
import { UserdtController } from './userdt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Userdt} from './entities/userdt.entity'
import { AuthModule } from '../auth/auth.module';

@Module({
  // 3. Userdt 엔티티를 DB에 연결
  imports: [TypeOrmModule.forFeature([Userdt]), AuthModule],
  controllers: [UserdtController],
  providers: [UserdtService],
  exports: [UserdtService], // UserdtService를 내보냄
})
export class UserdtModule {}
