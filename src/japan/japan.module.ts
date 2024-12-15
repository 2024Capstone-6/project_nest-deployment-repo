import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ActivitiesController } from './activities/activities.controller';
import { JapaneseController } from './japanese/japanese.controller';

import { ActivitiesService } from './activities/activities.service';
import { JapaneseService } from './japanese/japanese.service';
import { AwsS3Service } from './S3/aws-s3.service';

// JapanModule: 일본 관련 기능들을 모듈로 묶어서 관리
@Module({
  imports: [ConfigModule.forRoot()], // 환경 변수 설정을 위한 ConfigModule 임포트
  controllers: [ActivitiesController, JapaneseController], // 활동과 일본어 컨트롤러 등록
  providers: [ActivitiesService, JapaneseService, AwsS3Service], // 필요한 서비스들을 제공자로 등록
})
export class JapanModule {}
