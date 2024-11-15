import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { Activities } from '../entities/activities/activities.entity';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  // CREATE 메서드
  @Post()
  async createActivity(@Body() activitiesData: Activities) {
    return this.activitiesService.createActivity(activitiesData);
  }

  // READ 메서드 - 모든 활동 가져오기
  @Get()
  async findAllActivities() {
    return this.activitiesService.findAllActivities();
  }

  // READ 메서드 - ID로 특정 활동 가져오기
  @Get(':id')
  async findActivityById(@Param('id') id: string) {
    return this.activitiesService.findActivityById(+id);
  }

  // READ 메서드 - 이메일이나 제목으로 활동 검색
  @Get('search')
  async findActivitiesByEmailOrTitle(
    @Query('email') email: string,
    @Query('title') title: string,
  ): Promise<Activities[]> {
    return this.activitiesService.findActivitiesByEmailOrTitle(email, title);
  }

  // UPDATE 메서드
  @Patch(':id')
  async updateActivity(
    @Param('id') id: string,
    @Body() activitiesData: Activities,
  ) {
    return this.activitiesService.updateActivity(+id, activitiesData);
  }

  // DELETE 메서드
  @Delete(':id')
  async removeActivity(@Param('id') id: string) {
    return this.activitiesService.removeActivity(+id);
  }
}
