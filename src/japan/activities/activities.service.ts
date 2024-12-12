import { Injectable } from '@nestjs/common';
import { Activities } from '../entities/activities.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class ActivitiesService {
  constructor(private dataSource: DataSource) {}

  // CREATE: 활동 게시물 생성
  async createActivity(
    createActivityDto: CreateActivityDto,
  ): Promise<Activities> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const activity = queryRunner.manager.create(Activities, {
        ...createActivityDto,
        date: new Date().toISOString().split('T')[0],
      });
      await queryRunner.manager.save(activity);
      await queryRunner.commitTransaction();
      return activity;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // READ: 모든 활동 게시물을 찾는 메서드
  async findAllActivities(): Promise<Activities[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const activities = await queryRunner.manager.find(Activities);
      await queryRunner.commitTransaction();
      return activities;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // READ: 페이지네이션을 위한 활동 게시물을 찾는 메서드
  async findActivitiesWithPagination(
    page: number,
    limit: number,
  ): Promise<{ items: Activities[]; total: number }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const offset = (page - 1) * limit;
      const [items, total] = await queryRunner.manager.findAndCount(
        Activities,
        {
          skip: offset,
          take: limit,
        },
      );
      await queryRunner.commitTransaction();
      return { items, total };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // READ: 특정 활동 게시물을 찾는 메서드
  async findActivityById(id: number): Promise<Activities> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const activity = await queryRunner.manager.findOneBy(Activities, { id });
      await queryRunner.commitTransaction();
      return activity;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // UPDATE: 특정 활동 게시물을 업데이트하는 메서드
  async updateActivity(
    id: number,
    updateActivityDto: UpdateActivityDto,
  ): Promise<Activities> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.update(Activities, id, updateActivityDto);
      const updated = await queryRunner.manager.findOneBy(Activities, { id });
      await queryRunner.commitTransaction();
      return updated;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // DELETE: 특정 활정 활동 게시물을 삭제하는 메서드
  async removeActivity(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(Activities, id);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
