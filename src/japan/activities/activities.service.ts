// 이 클래스가 NestJS의 의존성 주입 시스템에 의해 관리 될 수 있음을 나타냄
import { Injectable } from '@nestjs/common';
// TypeORM 리포지토리를 주입하는 데 사용됨
import { InjectRepository } from '@nestjs/typeorm';
// 데이터베이스 작업을 수행하는 데 사용됨
import { Repository } from 'typeorm';
// 데이터베이스 테이블과 매핑
import { Activities } from '../entities/activities.entity';
// DTO 클래스를 주입하는 데 사용됨
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
// 클래스를 정의, 활동과 관련된 비즈니스 로직을 처리
export class ActivitiesService {
  constructor(
    // TypeORM 리포지토리를 주입하는 데 사용됨
    @InjectRepository(Activities)
    private activitiesRepository: Repository<Activities>,
    // 생성자에서 Activities 엔티티에 대한 리포지토리를 주입
  ) {}

  // CREATE: 새로운 활동 게시물을 생성하는 메서드
  async createActivity(
    // 생성할 활동 게시물의 데이터를 받아옴
    createActivityDto: CreateActivityDto,
  ): Promise<Activities> {
    // 생성할 활동 게시물의 데이터를 사용하여 새로운 엔티티 생성
    const activity = this.activitiesRepository.create({
      ...createActivityDto,
      date: new Date().toISOString().split('T')[0], // 현재 날짜 자동 설정
    });
    // 생성한 엔티티를 데이터베이스에 저장
    return this.activitiesRepository.save(activity);
  }

  // READ: 모든 활동 게시물을 찾는 메서드 (테스트용)
  async findAllActivities(): Promise<Activities[]> {
    // 모든 활동 엔티티를 찾아 반환
    return this.activitiesRepository.find();
  }

  // READ: 페이지네이션을 위한 활동 게시물을 찾는 메서드
  async findActivitiesWithPagination(
    page: number,
    limit: number,
  ): Promise<Activities[]> {
    // page와 limit을 사용하여 offset을 계산
    const offset = (page - 1) * limit;
    // 페이지네이션을 적용하여 엔티티를 찾아 반환
    return this.activitiesRepository.find({
      skip: offset, // 오프셋을 설정하여 특정 위치부터 데이터를 가져옴
      take: limit, // 한번에 가져올 데이터의 수를 설정
    });
  }

  // READ: 특정 활동 게시물을 찾는 메서드 (클릭 시 게시물 전체를 보여줌)
  async findActivityById(id: number): Promise<Activities> {
    return this.activitiesRepository.findOneBy({ id });
  }

  // READ: 이메일이나 제목으로 활동 게시물을 찾는 검색 메소드 개발 예정

  // UPDATE: 활동 게시물을 업데이트하는 메서드
  async updateActivity(
    id: number,
    // 업데이트할 활동 게시물의 데이터를 받아옴
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activities> {
    await this.activitiesRepository.update(id, updateActivityDto);
    return this.findActivityById(id);
  }

  // DELETE: 활동 게시물을 삭제하는 메서드
  async removeActivity(id: number): Promise<void> {
    // 주어진 ID를 사용하여 엔티티를 삭제
    await this.activitiesRepository.delete(id);
  }
}
