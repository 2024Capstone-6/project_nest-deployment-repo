import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ActivitiesController } from './activities/activities.controller';
import { JapaneseController } from './japanese/japanese.controller';

import { ActivitiesService } from './activities/activities.service';
import { JapaneseService } from './japanese/japanese.service';
import { AwsS3Service } from './S3/aws-s3.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ActivitiesController, JapaneseController],
  providers: [ActivitiesService, JapaneseService, AwsS3Service],
})
export class JapanModule {}
