import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private repository:Repository<Board>
  ){

  }
  async create(createBoardDto: CreateBoardDto) {
    const date = new Date()
    
    const newBoard = new Board();
    newBoard.content = createBoardDto.content
    newBoard.title = createBoardDto.title

    return await this.repository.save(newBoard);
  }

  findAll() {
    return `이걸 이제야 성공하네`;
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
