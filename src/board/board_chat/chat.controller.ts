import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { AwsService } from '../board_aws/aws.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('board/:boardId/chats')
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly awsService: AwsService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // 파일 인터셉터 추가
  async create(
    @Param('boardId') boardId: string,
    @Body() createChatDto: CreateChatDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    let imgUrl = null;

    if (file) {
      // 이미지를 AWS S3에 업로드
      imgUrl = await this.awsService.uploadImage(file);
    }

    // 이미지 URL 포함하여 새로운 댓글 생성
    return this.chatService.create({ ...createChatDto, boardId: Number(boardId), imgurl: imgUrl });
  }

  @Get()
  async findAll(@Param('boardId') boardId: string) {
    return this.chatService.findAll(Number(boardId));
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file')) // 파일 인터셉터 추가
  async update(
    @Param('id') id: string,
    @Body() updateChatDto: UpdateChatDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    if (file) {
      // 이미지를 AWS S3에 업로드
      const imgUrl = await this.awsService.uploadImage(file);
      // DTO에 이미지 URL 추가
      updateChatDto.imgurl = imgUrl;
    }

    return this.chatService.update(Number(id), updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(Number(id));
  }
}