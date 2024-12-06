import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './member.entity';
import { S3Module } from '../s3/s3.module';

// 멤버와 관련된 기능을 처리하는 모듈
@Module({
  imports: [TypeOrmModule.forFeature([Member]), S3Module], // TypeORM 레포지토리와 S3 모듈 추가
  controllers: [MemberController], // 멤버 컨트롤러 등록
  providers: [MemberService], // 멤버 서비스 등록
})
export class MemberModule {}