import { Module } from '@nestjs/common';

import { ActivitiesController } from './activities/activities.controller';
import { JapaneseController } from './japanese/japanese.controller';

import { ActivitiesService } from './activities/activities.service';
import { JapaneseService } from './japanese/japanese.service';

@Module({
  controllers: [ActivitiesController, JapaneseController],
  providers: [ActivitiesService, JapaneseService],
})
export class JapanModule {}
