import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Japanese } from '../entities/japanese.entity';

import { CreateJapaneseDto } from './dto/create-activity.dto';
import { UpdateJapaneseDto } from './dto/update-activity.dto';

@Injectable()
export class JapaneseService {
  constructor(private dataSource: DataSource) {}

  // CREATE: 새로운 일본어 게시물 생성
  async createJapanese(
    createJapaneseDto: CreateJapaneseDto,
  ): Promise<Japanese> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const japanese = queryRunner.manager.create(Japanese, {
        ...createJapaneseDto,
        date: new Date().toISOString().split('T')[0],
      });
      await queryRunner.manager.save(japanese);
      await queryRunner.commitTransaction();
      return japanese;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // READ: 모든 일본어 게시물 조회
  async findAllJapanese(): Promise<Japanese[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const japanese = await queryRunner.manager.find(Japanese);
      await queryRunner.commitTransaction();
      return japanese;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // READ: 페이지네이션
  async findJapaneseWithPagination(
    page: number,
    limit: number,
  ): Promise<{ items: Japanese[]; total: number }> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const skip = (page - 1) * limit;
      const [items, total] = await queryRunner.manager.findAndCount(Japanese, {
        skip,
        take: limit,
      });
      await queryRunner.commitTransaction();
      return { items, total };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // READ: 특정 ID의 게시물 찾기
  async findOne(id: number): Promise<Japanese> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const japanese = await queryRunner.manager.findOneBy(Japanese, { id });
      if (!japanese) {
        throw new NotFoundException(`Japanese post with ID ${id} not found`);
      }
      await queryRunner.commitTransaction();
      return japanese;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
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
      await queryRunner.manager.update(Japanese, id, updateJapaneseDto);
      const updated = await queryRunner.manager.findOneBy(Japanese, { id });
      await queryRunner.commitTransaction();
      return updated;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  // DELETE: 게시물 삭제
  async removeJapanese(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(Japanese, id);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
