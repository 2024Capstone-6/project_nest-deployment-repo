import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Japanese } from '../entities/japanese.entity';

import { CreateJapaneseDto } from './dto/create-activity.dto';
import { UpdateJapaneseDto } from './dto/update-activity.dto';

@Injectable()
export class JapaneseService {
  constructor(
    @InjectRepository(Japanese)
    private japaneseRepository: Repository<Japanese>,
  ) {}

  // CREATE
  async createJapanese(
    createJapaneseDto: CreateJapaneseDto,
  ): Promise<Japanese> {
    const japanese = this.japaneseRepository.create({
      ...createJapaneseDto,
      date: new Date().toISOString().split('T')[0],
    });
    return this.japaneseRepository.save(japanese);
  }

  // READ
  async findAllJapanese(): Promise<Japanese[]> {
    return this.japaneseRepository.find();
  }

  // READ - 페이지네이션 일본어 게시물 가져오기
  async findJapaneseWithPagination(
    page: number,
    limit: number,
  ): Promise<{ items: Japanese[]; total: number }> {
    const skip = (page - 1) * limit;

    const [items, total] = await this.japaneseRepository.findAndCount({
      skip,
      take: limit,
    });

    return { items, total };
  }

  // READ - 이메일이나 제목으로 일본어 게시물 검색 (개발 예정)

  // READ - 특정 ID의 게시물 찾기
  async findOne(id: number): Promise<Japanese> {
    const japanese = await this.japaneseRepository.findOneBy({ id });
    if (!japanese) {
      throw new NotFoundException(`Japanese post with ID ${id} not found`);
    }
    return japanese;
  }

  // UPDATE
  async updateJapanese(
    id: number,
    updateJapaneseDto: UpdateJapaneseDto,
  ): Promise<Japanese> {
    await this.japaneseRepository.update(id, updateJapaneseDto);
    return this.japaneseRepository.findOneBy({ id });
  }

  // DELETE
  async removeJapanese(id: number): Promise<void> {
    await this.japaneseRepository.delete(id);
  }
}
