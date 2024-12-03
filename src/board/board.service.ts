import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// const date = new Date();

// const formattedDate = date.toLocaleString('ko-KR', {
//   year: 'numeric',
//   month: '2-digit',
//   day: '2-digit',
//   hour: '2-digit',
//   minute: '2-digit',
//   second: '2-digit'
// });

// const isoDate = date.toISOString();

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private repository: Repository<Board>,
  ) {}

  // async create(createBoardDto: CreateBoardDto): Promise<Board> {
  //   const newBoard = this.repository.create(createBoardDto);
  //   return await this.repository.save(newBoard);
  // }

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

  async update(id: number, updateBoardDto: UpdateBoardDto): Promise<void> {
    const result = await this.repository.update(id, updateBoardDto);
    if (result.affected === 0) {
      throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
    }
  }
}