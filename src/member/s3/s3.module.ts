import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';

// @Module: NestJS 모듈을 정의. 기능별로 서비스를 분리, 의존성을 관리하기 위해 사용
@Module({
  // providers: 이 모듈에서 제공하는 서비스를 정의
  // S3Service: AWS S3와 상호작용하는 핵심 로직을 포함한 서비스
  providers: [S3Service],
  // exports: 이 모듈에서 제공하는 서비스를 외부 모듈에서 사용할 수 있도록 내보냄
  exports: [S3Service], // 다른 모듈에서 사용할 수 있도록 내보내기
})
export class S3Module {}