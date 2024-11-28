import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './member.entity';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Member]), S3Module],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}