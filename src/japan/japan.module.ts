import { Module } from '@nestjs/common';
import { ActivitiesPostController } from './activities-post/activities-post.controller';
import { JapanesePostController } from './japanese-post/japanese-post.controller';
import { ActivitiesPostService } from './activities-post/activities-post.service';
import { JapanesePostService } from './japanese-post/japanese-post.service';

@Module({
  controllers: [ActivitiesPostController, JapanesePostController],
  providers: [ActivitiesPostService, JapanesePostService]
})
export class JapanModule {}
