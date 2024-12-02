import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivitiesController } from './activities/activities.controller';
import { JapaneseController } from './japanese/japanese.controller';

import { Activities } from './entities/activities.entity';
import { Japanese } from './entities/japanese.entity';

import { ActivitiesService } from './activities/activities.service';
import { JapaneseService } from './japanese/japanese.service';

@Module({
  // 모듈에서 사용할 다른 모듈을 가져옴
  imports: [TypeOrmModule.forFeature([Activities, Japanese])],
  // 모듈에서 사용할 컨트롤러를 정의
  controllers: [ActivitiesController, JapaneseController],
  // 모듈에서 사용할 프로바이더를 정의
  providers: [ActivitiesService, JapaneseService],
})
export class JapanModule {}
