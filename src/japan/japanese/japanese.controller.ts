import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { JapaneseService } from './japanese.service';

import { CreateJapaneseDto } from './dto/create-activity.dto';
import { UpdateJapaneseDto } from './dto/update-activity.dto';

@Controller('japanese')
export class JapaneseController {
  constructor(private readonly japaneseService: JapaneseService) {}

  // CREATE
  @Post()
  async createJapanese(@Body() createJapaneseDto: CreateJapaneseDto) {
    return this.japaneseService.createJapanese(createJapaneseDto);
  }

  // READ - 모든 일본어 게시물 가져오기
  @Get()
  async findAllJapanese() {
    return this.japaneseService.findAllJapanese();
  }

  // READ - ID로 특정 일본어 게시물 가져오기
  @Get(':id')
  async findJapaneseById(@Param('id') id: number) {
    return this.japaneseService.findJapaneseById(+id);
  }

  // READ - 이메일이나 제목으로 일본어 게시물 검색 (개발 예정)

  // UPDATE
  @Patch(':id')
  async updateJapanese(
    @Param('id') id: number,
    @Body() updateJapaneseDto: UpdateJapaneseDto,
  ) {
    return this.japaneseService.updateJapanese(+id, updateJapaneseDto);
  }

  // DELETE
  @Delete(':id')
  async removeJapanese(@Param('id') id: number) {
    return this.japaneseService.removeJapanese(+id);
  }
}
