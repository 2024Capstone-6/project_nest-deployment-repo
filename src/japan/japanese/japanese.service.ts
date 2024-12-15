import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Japanese } from '../entities/japanese.entity';

import { CreateJapaneseDto } from './dto/create-japanese.dto';
import { UpdateJapaneseDto } from './dto/update-japanese.dto';

// JapaneseService: 일본어 관련 데이터베이스 작업을 처리하는 서비스 클래스
@Injectable()
export class JapaneseService {
  // DataSource: TypeORM의 데이터베이스 연결 객체를 주입받음
  constructor(private dataSource: DataSource) {}

  // CREATE: 새로운 일본어 게시물 생성
  async createJapanese(
    createJapaneseDto: CreateJapaneseDto,
  ): Promise<Japanese> {
    // QueryRunner 생성: 데이터베이스 연결 및 트랜잭션을 관리하는 인스턴스
    const queryRunner = this.dataSource.createQueryRunner();
    // 데이터베이스에 연결
    await queryRunner.connect();
    // 트랜잭션 시작: 이후의 모든 데이터베이스 작업은 하나의 작업 단위로 처리됨
    await queryRunner.startTransaction();

    try {
      // 엔티티 생성: DTO의 데이터를 기반으로 새로운 Japanese 엔티티 인스턴스 생성
      const japanese = queryRunner.manager.create(Japanese, {
        ...createJapaneseDto,
      });
      // 데이터베이스에 저장
      await queryRunner.manager.save(japanese);
      // 모든 작업이 성공적으로 완료되면 트랜잭션 커밋
      await queryRunner.commitTransaction();
      return japanese;
    } catch (err) {
      // 에러 발생 시 트랜잭션의 모든 변경사항을 취소(롤백)
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // 트랜잭션 완료 후 항상 QueryRunner를 해제하여 리소스 정리
      await queryRunner.release();
    }
  }

  // READ: 모든 일본어 게시물 조회
  async findAllJapanese(): Promise<Japanese[]> {
    return await this.dataSource.manager.find(Japanese);
  }

  // READ: 페이지네이션
  async findJapaneseWithPagination(
    page: number,
    limit: number,
  ): Promise<{ items: Japanese[]; total: number }> {
    // 건너뛸 항목 수 계산 (예: 2페이지면 첫 페이지의 항목들을 건너뜀)
    const skip = (page - 1) * limit;
    // findAndCount: 조건에 맞는 항목들과 전체 개수를 반환
    const [items, total] = await this.dataSource.manager.findAndCount(
      Japanese,
      {
        skip,
        take: limit,
      },
    );
    return { items, total };
  }

  // READ: 특정 ID의 게시물 찾기
  async findOne(id: number): Promise<Japanese> {
    const japanese = await this.dataSource.manager.findOneBy(Japanese, { id });
    if (!japanese) {
      throw new NotFoundException(`Japanese post with ID ${id} not found`);
    }
    return japanese;
  }

  // UPDATE: 게시물 업데이트
  async updateJapanese(
    id: number,
    updateJapaneseDto: UpdateJapaneseDto,
  ): Promise<Japanese> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 게시물 업데이트 실행
      await queryRunner.manager.update(Japanese, id, updateJapaneseDto);
      // 업데이트된 게시물 조회: 변경된 데이터 확인
      const updated = await queryRunner.manager.findOneBy(Japanese, { id });
      // 모든 작업이 성공적으로 완료되면 트랜잭션 커밋
      await queryRunner.commitTransaction();
      return updated;
    } catch (err) {
      // 에러 발생 시 모든 변경사항 롤백
      // 이를 통해 데이터 일관성 유지
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // 리소스 정리: 데이터베이스 연결 해제
      await queryRunner.release();
    }
  }

  // DELETE: 게시물 삭제
  async removeJapanese(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 게시물 삭제 실행
      await queryRunner.manager.delete(Japanese, id);
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
