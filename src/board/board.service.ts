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

  async findAll() {
    return  await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOneBy({id:id});
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    return await this.repository.update({id:id},updateBoardDto);
  }

  async remove(id: number) {
    return await this.repository.delete({id:id});
  }
}
