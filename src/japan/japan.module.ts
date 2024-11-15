import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivitiesController } from './activities/activities.controller';
import { JapaneseController } from './japanese/japanese.controller';

import { Activities } from './entities/activities/activities.entity';
// import { Japanese } from './entities/japanese/japanese.entity';

import { ActivitiesService } from './activities/activities.service';
import { JapaneseService } from './japanese/japanese.service';

@Module({
  imports: [TypeOrmModule.forFeature([Activities])],
  controllers: [ActivitiesController, JapaneseController],
  providers: [ActivitiesService, JapaneseService],
})
export class JapanModule {}
