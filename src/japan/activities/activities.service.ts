import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Activities } from '../entities/activities/activities.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activities)
    private activitiesRepository: Repository<Activities>,
  ) {}

  // CREATE: 새로운 활동 게시물을 생성하는 메서드
  async createActivity(activitiesData: Activities): Promise<Activities> {
    // 주어진 데이터를 사용하여 새로운 Activities 엔티티를 생성
    const newActivity = this.activitiesRepository.create(activitiesData);
    // 생성된 엔티티를 데이터베이스에 저장하고 저장된 엔티티를 반환
    return this.activitiesRepository.save(newActivity);
  }

  // READ: 모든 활동 게시물을 찾는 메서드
  async findAllActivities(): Promise<Activities[]> {
    // 데이터베이스에서 모든 Activities 엔티티를 찾아 반환
    return this.activitiesRepository.find();
  }

  /* // READ: 페이지네이션을 적용하여 모든 활동 게시물을 찾는 메서드
async findAllActivities(page: number, limit: number): Promise<Activities[]> {
  const skip = (page - 1) * limit;
  return this.activitiesRepository.find({
    skip: skip,
    take: limit,
  });
} */

  // READ: 특정 활동 게시물을 찾는 메서드
  async findActivityById(id: number): Promise<Activities> {
    // 주어진 ID를 사용하여 데이터베이스에서 특정 Activities 엔티티를 찾아 반환
    return this.activitiesRepository.findOneBy({ id });
  }

  // READ: 작성자의 이메일이나 게시글의 제목으로 활동 게시물을 검색하는 메서드
  async findActivitiesByEmailOrTitle(
    email: string,
    title: string,
  ): Promise<Activities[]> {
    return this.activitiesRepository.find({
      where: [{ email: Like(`%${email}%`) }, { title: Like(`%${title}%`) }],
    });
  }

  // UPDATE: 활동 게시물을 업데이트하는 메서드
  async updateActivity(
    id: number,
    activitiesData: Activities,
  ): Promise<Activities> {
    // 주어진 ID를 사용하여 데이터베이스에서 특정 Activities 엔티티를 찾아 업데이트
    await this.activitiesRepository.update(id, activitiesData);
    return this.findActivityById(id);
  }

  // DELETE: 활동 게시물을 삭제하는 메서드
  async removeActivity(id: number): Promise<void> {
    await this.activitiesRepository.delete(id);
  }
}
