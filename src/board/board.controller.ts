/* import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardService.create(createBoardDto);
  }

  @Get()
  async findAll() {
    return await this.boardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.boardService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    await this.boardService.update(+id, updateBoardDto);
    return {
      message:'수정성공'
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.boardService.remove(+id);
  }
} */

import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardService.create(createBoardDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1, // 기본값 설정
    @Query('pageSize') pageSize: number = 10,
  ) {
    return await this.boardService.findAll(page, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.boardService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    await this.boardService.update(+id, updateBoardDto);
    return {
      message: '수정 성공',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.boardService.remove(+id);
  }
}
