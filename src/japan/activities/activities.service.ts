import { Injectable } from '@nestjs/common';
import { Activities } from '../entities/activities.entity';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { DataSource } from 'typeorm';

// 의존성 주입이 가능하도록 선언되는 클래스
// 다른 클래스에서 ActivitiesService를 주입받아 사용할 수 있음
@Injectable()
export class ActivitiesService {
  // typeorm 데이터베이스 연결 및 작업을 처리하는 주요 객체
  // dataSource.createQueryRunner()를 사용하여 트랜잭션을 실행하고 데이터베이스 작업을 처리
  constructor(private dataSource: DataSource) {}

  // CREATE: 활동 게시물 생성
  async createActivity(
    createActivityDto: CreateActivityDto,
  ): Promise<Activities> {
    // QueryRunner 생성: 트랜잭션 실행을 위한 독립적인 데이터베이스 연결 인스턴스
    const queryRunner = this.dataSource.createQueryRunner();
    // 트랜잭션 시작: 데이터 생성 작업을 하나의 단위로 처리
    await queryRunner.startTransaction();

    try {
      // DTO 데이터를 기반으로 새로운 Activities 엔티티 인스턴스 생성
      const activity = queryRunner.manager.create(Activities, {
        ...createActivityDto,
      });
      // 생성된 엔티티를 데이터베이스에 저장
      await queryRunner.manager.save(activity);
      // 모든 작업이 성공적으로 완료되면 트랜잭션 커밋
      await queryRunner.commitTransaction();
      return activity;
    } catch (err) {
      // 에러 발생 시 모든 변경사항을 롤백하여 데이터 일관성 유지
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // 트랜잭션 종료 후 QueryRunner 인스턴스 해제
      await queryRunner.release();
    }
  }

  // READ: 모든 활동 게시물을 찾는 메서드
  async findAllActivities(): Promise<Activities[]> {
    return await this.dataSource.manager.find(Activities);
  }

  // READ: 페이지네이션을 위한 활동 게시물을 찾는 메서드
  async findActivitiesWithPagination(
    page: number,
    limit: number,
  ): Promise<{ items: Activities[]; total: number }> {
    const offset = (page - 1) * limit;
    const [items, total] = await this.dataSource.manager.findAndCount(
      Activities,
      {
        skip: offset,
        take: limit,
      },
    );
    return { items, total };
  }

  // READ: 특정 활동 게시물을 찾는 메서드
  async findActivityById(id: number): Promise<Activities> {
    return await this.dataSource.manager.findOneBy(Activities, { id });
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
      // 게시물 데이터 업데이트
      await queryRunner.manager.update(Activities, id, updateActivityDto);
      // 업데이트된 게시물 조회하여 변경사항 확인
      const updated = await queryRunner.manager.findOneBy(Activities, { id });
      // 모든 작업이 성공적으로 완료되면 트랜잭션 커밋
      await queryRunner.commitTransaction();
      return updated;
    } catch (err) {
      // 에러 발생 시 모든 변경사항 롤백
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // 트랜잭션 완료 후 리소스 정리
      await queryRunner.release();
    }
  }

  // DELETE: 특정 활정 활동 게시물을 삭제하는 메서드
  async removeActivity(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // ID를 기반으로 게시물 삭제
      await queryRunner.manager.delete(Activities, id);
      // 삭제 작업이 성공적으로 완료되면 트랜잭션 커밋
      await queryRunner.commitTransaction();
    } catch (err) {
      // 삭제 중 에러 발생 시 트랜잭션 롤백
      // 이를 통해 부분적인 삭제나 데이터 불일치 방지
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // 트랜잭션 완료 후 QueryRunner 해제
      await queryRunner.release();
    }
  }
}
