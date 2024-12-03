import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BoardService } from './board.service';
import { AwsService } from '../aws/aws.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Express } from 'express';

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly awsService: AwsService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (!file) {
      throw new BadRequestException('파일이 업로드되지 않았습니다.');
    }

    // 이미지를 AWS S3에 업로드
    const imgUrl = await this.awsService.uploadImage(file);

    // DTO 또는 데이터베이스 항목에 이미지 URL 추가
    const boardData = {
      ...createBoardDto,
      imgurl : imgUrl,
    };

    // 이미지 URL과 함께 새로운 게시글 생성
    return await this.boardService.create(boardData);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return await this.boardService.findAll(page, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.boardService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
  @Param('id') id: string,
  @Body() updateBoardDto: UpdateBoardDto,
  @UploadedFile() file: Express.Multer.File
) {
  if (file) {
    // 이미지를 AWS S3에 업로드
    const imageUrl = await this.awsService.uploadImage(file);
    // DTO에 이미지 URL 추가
    updateBoardDto.imgurl = imageUrl;
  }

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