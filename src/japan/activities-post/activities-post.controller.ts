import { Controller, Post, Body } from '@nestjs/common';
import { ActivitiesPostService } from './activities-post.service';
import { ActivitiesPost } from '../entities/activities/activities.entity';

@Controller('activities-post')
export class ActivitiesPostController {
  constructor(private readonly activitiesPostService: ActivitiesPostService) {}

  @Post()
  async create(@Body() ActivitiesPostData: ActivitiesPost) {
    return this.activitiesPostService.create(ActivitiesPostData);
  }
}
