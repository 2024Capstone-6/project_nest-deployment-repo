import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './member.entity';
import { S3Module } from './s3/s3.module';

@Module({
  // 이 모듈에서 사용할 Member 엔티티 등록
  // S3Module : S3 관련 기능(파일 업로드/다운로드 등)을 사용하는 모듈
  imports: [TypeOrmModule.forFeature([Member]), S3Module],
  controllers: [MemberController], // 멤버 컨트롤러 등록
  providers: [MemberService], // 멤버 서비스 등록
})
export class MemberModule {}