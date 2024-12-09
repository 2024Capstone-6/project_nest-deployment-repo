import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';

@Module({
  providers: [S3Service], // S3 서비스 제공
  exports: [S3Service], // 다른 모듈에서 사용할 수 있도록 내보내기
})
export class S3Module {}