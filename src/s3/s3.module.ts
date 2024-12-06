import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';

// AWS S3와의 상호작용을 처리하는 S3Service를 제공
@Module({
  providers: [S3Service], // S3 서비스 등록
  exports: [S3Service], // S3 서비스를 외부에서 사용할 수 있도록 export
})
export class S3Module {}