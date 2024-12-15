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

// 파일 업로드 기능을 제공하는 인터셉터
import { FileInterceptor } from '@nestjs/platform-express';

import { ActivitiesService } from './activities.service';
import { Activities } from '../entities/activities.entity';

// 활동 생성 및 업데이트에 필요한 DTO 클래스
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

// S3 서비스 클래스
import { AwsS3Service } from '../S3/aws-s3.service';

// 컨트롤러임을 선언, 기본 라우트 경로가 activities로 설정
@Controller('activities')
export class ActivitiesController {
  constructor(
    // 활동 데이터를 데이터베이스에서 처리하는 서비스
    private readonly activitiesService: ActivitiesService,
    // S3와 관련된 이미지 업로드 및 삭제 작업을 처리하는 서비스
    private readonly awsS3Service: AwsS3Service,
  ) {}

  // CREATE - 활동 생성 및 이미지 업로드
  @Post()
  // 요청에서 image 필드의 파일을 처리하도록 설정, 파일은 multer를 사용하여 관리
  @UseInterceptors(FileInterceptor('image'))
  async createActivity(
    @Body() createActivityDto: CreateActivityDto,
    @UploadedFile() file: Express.Multer.File, // 업로드된 파일을 받음
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

  // READ - 모든 활동 조회
  @Get()
  async findAllActivities() {
    return this.activitiesService.findAllActivities();
  }

  // READ - 페이지네이션을 적용한 활동 조회
  @Get('page')
  async findActivitiesWithPagination(
    @Query('page') page: number, // 페이지 번호
    @Query('limit') limit: number, // 페이지당 항목 수
  ): Promise<{ items: Activities[]; total: number }> {
    // 페이지네이션 결과를 반환하는 타입
    return this.activitiesService.findActivitiesWithPagination(page, limit);
  }

  // READ - ID로 특정 활동 조회
  @Get(':id')
  async findActivityById(@Param('id') id: number) {
    return this.activitiesService.findActivityById(+id);
  }

  // UPDATE - 활동 수정
  @Patch(':id')
  // 요청에서 image 필드의 파일을 처리하도록 설정, 파일은 multer를 사용하여 관리
  @UseInterceptors(FileInterceptor('image'))
  async updateActivity(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivityDto, // 요청 본문 데이터
    @UploadedFile() file: Express.Multer.File, // 업로드된 파일을 받음
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

  // DELETE - 활동 삭제
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
