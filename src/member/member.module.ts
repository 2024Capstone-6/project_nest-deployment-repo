import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './member.entity';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), S3Module], // TypeORM과 S3 모듈 가져오기
  controllers: [MemberController], // 멤버 컨트롤러 등록
  providers: [MemberService], // 멤버 서비스 등록
})
export class MemberModule {}