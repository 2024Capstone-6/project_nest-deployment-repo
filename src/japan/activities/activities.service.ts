import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activities } from '../entities/activities.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activities)
    private activitiesRepository: Repository<Activities>,
  ) {}

  // CREATE: 새로운 활동 게시물을 생성하는 메서드
  async createActivity(
    createActivityDto: CreateActivityDto,
  ): Promise<Activities> {
    const activity = this.activitiesRepository.create({
      ...createActivityDto,
      date: new Date().toISOString().split('T')[0], // 현재 날짜 자동 설정
    });
    return this.activitiesRepository.save(activity);
  }

  // READ: 모든 활동 게시물을 찾는 메서드 (테스트용)
  async findAllActivities(): Promise<Activities[]> {
    return this.activitiesRepository.find();
  }

  // READ: 페이지네이션을 위한 활동 게시물을 찾는 메서드
  async findActivitiesWithPagination(
    page: number,
    limit: number,
  ): Promise<{ items: Activities[]; total: number }> {
    const offset = (page - 1) * limit;
    const [items, total] = await this.activitiesRepository.findAndCount({
      skip: offset,
      take: limit,
    });

    return { items, total };
  }

  // READ: 특정 활동 게시물을 찾는 메서드
  async findActivityById(id: number): Promise<Activities> {
    return this.activitiesRepository.findOneBy({ id });
  }

  // UPDATE: 활동 게시물을 업데이트하는 메서드
  async updateActivity(
    id: number,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activities> {
    await this.activitiesRepository.update(id, updateActivityDto);
    return this.findActivityById(id);
  }

  // DELETE: 활동 게시물을 삭제하는 메서드
  async removeActivity(id: number): Promise<void> {
    await this.activitiesRepository.delete(id);
  }
}
