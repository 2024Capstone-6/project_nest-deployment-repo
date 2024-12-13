import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from '../entities/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private repository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const newBoard = this.repository.create({
      ...createBoardDto,
      date: new Date().toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
    });
    return await this.repository.save(newBoard);
  }

  async findAll(page: number, pageSize: number) {
    const [data, total] = await this.repository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
      order: { id: 'DESC' },
    });

    const lastPage = Math.ceil(total / pageSize);

    return {
      data,
      meta: {
        totalItems: total,
        currentPage: page,
        pageSize,
        lastPage,
      },
    };
  }

  async findOne(id: number): Promise<Board> {
    const board = await this.repository.findOneBy({ id });
    if (!board) {
      throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
    }
    return board;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const existingBoard = await this.repository.findOneBy({ id });
    console.log(existingBoard);
    if (!existingBoard) {
      throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
    }
  
    // 이미지가 없는 경우 기존 이미지를 유지
    const updatedData = { ...existingBoard, ...updateBoardDto };
    console.log(updatedData);
    await this.repository.save(updatedData);
    return this.findOne(id); // 업데이트 후 변경된 엔티티 반환
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
    }
  }
}