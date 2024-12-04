import {
  Controller, // 클래스를 컨트롤러로 정의
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param, // URL의 매개변수를 메서드의 매개변수로 주입하는 데 사용
  Query, // 쿼리 매개변수를 메서드의 매개변수로 주입하는 데 사용
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { ActivitiesService } from './activities.service';
import { Activities } from '../entities/activities.entity';

import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

import { AwsS3Service } from '../S3/aws-s3.service';

@Controller('activities')
export class ActivitiesController {
  constructor(
    private readonly activitiesService: ActivitiesService,
    private readonly awsS3Service: AwsS3Service,
  ) {}

  // 활동 생성 및 이미지 업로드
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createActivity(
    @Body() createActivityDto: CreateActivityDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl = null;

    if (file) {
      try {
        // S3에 이미지 업로드 후 URL 받아오기
        imageUrl = await this.awsS3Service.uploadImage(file);
      } catch (error) {
        throw error;
      }
    }

    // 활동 생성 및 이미지 URL 저장
    return this.activitiesService.createActivity({
      ...createActivityDto,
      mediaUrl: imageUrl,
    });
  }

  // 모든 활동 조회
  @Get()
  async findAllActivities() {
    return this.activitiesService.findAllActivities();
  }

  // 페이지네이션을 적용한 활동 조회
  @Get('page')
  async findActivitiesWithPagination(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ items: Activities[]; total: number }> {
    return this.activitiesService.findActivitiesWithPagination(page, limit);
  }

  // ID로 특정 활동 조회
  @Get(':id')
  async findActivityById(@Param('id') id: number) {
    return this.activitiesService.findActivityById(+id);
  }

  // 활동 수정
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateActivity(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivityDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl = null;

    if (file) {
      // 기존 이미지가 있다면 삭제
      const existingActivity =
        await this.activitiesService.findActivityById(id);
      if (existingActivity?.mediaUrl) {
        await this.awsS3Service.deleteImage(existingActivity.mediaUrl);
      }

      // 새 이미지 업로드
      imageUrl = await this.awsS3Service.uploadImage(file);
    }

    return this.activitiesService.updateActivity(+id, {
      ...updateActivityDto,
      ...(imageUrl && { mediaUrl: imageUrl }),
    });
  }

  // 활동 삭제
  @Delete(':id')
  async removeActivity(@Param('id') id: string) {
    // 삭제 전 활동 정보 조회
    const activity = await this.activitiesService.findActivityById(+id);

    // S3에서 이미지 삭제
    if (activity?.mediaUrl) {
      await this.awsS3Service.deleteImage(activity.mediaUrl);
    }

    // DB에서 활동 삭제
    return this.activitiesService.removeActivity(+id);
  }
}
