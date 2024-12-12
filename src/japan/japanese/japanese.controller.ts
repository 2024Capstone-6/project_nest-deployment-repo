import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { JapaneseService } from './japanese.service';
import { Japanese } from '../entities/japanese.entity';

import { CreateJapaneseDto } from './dto/create-japanese.dto';
import { UpdateJapaneseDto } from './dto/update-japanese.dto';

@Controller('japanese')
export class JapaneseController {
  constructor(private readonly japaneseService: JapaneseService) {}

  // CREATE - 일본어 게시물 생성
  @Post()
  async createJapanese(@Body() createJapaneseDto: CreateJapaneseDto) {
    return this.japaneseService.createJapanese(createJapaneseDto);
  }

  // READ - 모든 일본어 게시물 가져오기
  @Get()
  async findAllJapanese() {
    return this.japaneseService.findAllJapanese();
  }

  // READ - 페이지네이션 일본어 게시물 가져오기
  @Get('page')
  async findJapaneseWithPagination(
    @Query('page') page: number,
  ): Promise<{ items: Japanese[]; total: number }> {
    const limit = 1; // 한 페이지당 하나의 게시물
    return this.japaneseService.findJapaneseWithPagination(page, limit);
  }

  // READ - 특정 ID의 게시물 가져오기
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.japaneseService.findOne(+id);
  }

  // UPDATE - 일본어 게시물 업데이트
  @Patch(':id')
  async updateJapanese(
    @Param('id') id: number,
    @Body() updateJapaneseDto: UpdateJapaneseDto,
  ) {
    return this.japaneseService.updateJapanese(+id, updateJapaneseDto);
  }

  // DELETE - 일본어 게시물 삭제
  @Delete(':id')
  async removeJapanese(@Param('id') id: number) {
    return this.japaneseService.removeJapanese(+id);
  }
}
