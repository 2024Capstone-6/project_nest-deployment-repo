import { Module } from '@nestjs/common';
import { UserdtService } from './userdt.service';
import { UserdtController } from './userdt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Userdt} from './entities/userdt.entity'

@Module({
  // 3. Userdt 엔티티를 DB에 연결
  imports: [TypeOrmModule.forFeature([Userdt])],
  controllers: [UserdtController],
  providers: [UserdtService],
})
export class UserdtModule {}
