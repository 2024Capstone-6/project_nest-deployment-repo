import {
  Controller, //클래스를 컨트롤러로 정의
  Post, // HTTP POST 요청을 처리하는 데코레이터
  Get, // HTTP GET 요청을 처리하는 데코레이터
  Patch, // HTTP PATCH 요청을 처리하는 데코레이터
  Delete, // HTTP DELETE 요청을 처리하는 데코레이터
  Body, // 요청 본문의 메서드의 매개변수로 주입하는 데 사용
  Param, // URL의 매개변수를 메서드의 매개변수로 주입하는 데 사용
  Query, // 쿼리 매개변수를 메서드의 매개변수로 주입하는 데 사용
} from '@nestjs/common';
// ActivitiesService를 가져옴. 이 서비스는 관련된 비즈니스 로직을 처리
import { ActivitiesService } from './activities.service';
// Activities 엔티티를 가져옴. 이 엔티티는 데이터베이스 테이블과 매핑
import { Activities } from '../entities/activities.entity';

@Controller('activities')
// 'activities' 경로와 관려된 요청을 처리
export class ActivitiesController {
  // 생성자에서 ActivitiesService를 주입, 관련 비즈니스 로직을 처리
  constructor(private readonly activitiesService: ActivitiesService) {}

  // CREATE 메서드
  @Post()
  async createActivity(@Body() activitiesData: Activities) {
    // HTTP POST 요청을 처리하는 메서드
    // 요청 본문의 데이터를 받아 createActivity() 메서드를 호출
    return this.activitiesService.createActivity(activitiesData);
  }

  // READ 메서드 - 모든 활동 가져오기
  @Get()
  // HTTP GET 요청을 처리하여 모든 활동을 가져오는 메서드
  async findAllActivities() {
    // ActivitiesService의 findAllActivities() 메서드를 호출하여 모든 활동을 가져오고, 반환
    return this.activitiesService.findAllActivities();
  }

  // READ 메서드 - 페이지네이션을 위한 활동 가져오기
  @Get('page')
  async findActivitiesWithPagination(
    // 쿼리 매개변수에서 페이지 번호와 페이지당 항목 수를 받아 findActivitiesWithPagination() 메서드를 호출
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<Activities[]> {
    // 메서드의 반환 타입을 지정, promise 객체를 반환하며 객체의 배열이 포함
    // ActivitiesService의 findActivitiesWithPagination() 메서드를 호출하여 페이지네이션을 적용하여 활동을 가져오고, 반환
    return this.activitiesService.findActivitiesWithPagination(page, limit);
  }

  // READ 메서드 - ID로 특정 활동 가져오기
  @Get(':id')
  // URL의 매개변수에서 ID를 받아 findActivityById() 메서드를 호출
  async findActivityById(@Param('id') id: string) {
    // ActivitiesService의 findActivityById() 메서드를 호출하여 특정 활동을 가져오고, 반환
    return this.activitiesService.findActivityById(+id);
  }

  // READ 메서드 - 이메일이나 제목으로 활동 검색 (개발 예정)

  // UPDATE 메서드
  @Patch(':id')
  async updateActivity(
    // URL의 매개변수에서 ID를 받아 updateActivity() 메서드를 호출
    @Param('id') id: string,
    @Body() activitiesData: Activities,
  ) {
    // ActivitiesService의 updateActivity() 메서드를 호출하여 활동을 업데이트하고, 반환
    return this.activitiesService.updateActivity(+id, activitiesData);
  }

  // DELETE 메서드
  @Delete(':id')
  // URL의 매개변수에서 ID를 받아 removeActivity() 메서드를 호출
  async removeActivity(@Param('id') id: string) {
    // ActivitiesService의 removeActivity() 메서드를 호출하여 활동을 삭제하고, 반환
    return this.activitiesService.removeActivity(+id);
  }
}
