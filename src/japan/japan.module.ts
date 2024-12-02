import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { ActivitiesController } from './activities/activities.controller';
import { JapaneseController } from './japanese/japanese.controller';

import { Activities } from './entities/activities.entity';
import { Japanese } from './entities/japanese.entity';

import { ActivitiesService } from './activities/activities.service';
import { JapaneseService } from './japanese/japanese.service';
import { AwsS3Service } from './S3/aws-s3.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Activities, Japanese]),
  ],
  controllers: [ActivitiesController, JapaneseController],
  providers: [ActivitiesService, JapaneseService, AwsS3Service],
})
export class JapanModule {}
