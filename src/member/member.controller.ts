import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MemberService } from './member.service';

// '/members' 경로를 처리하는 컨트롤러
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // 멤버 생성 엔드포인트
  @Post()
  @UseInterceptors(FileInterceptor('profileImage')) // 이미지 업로드를 처리
  async createMember(
    @UploadedFile() file: Express.Multer.File, // 업로드된 파일
    @Body() body: any, // 요청 본문 데이터
  ) {
    return this.memberService.createMember(body, file);
  }

  // 모든 멤버 조회 엔드포인트
  @Get()
  getMembers() {
    return this.memberService.getMembers();
  }

  // 멤버 업데이트 엔드포인트
  @Patch(':id')
  @UseInterceptors(FileInterceptor('profileImage')) // 이미지 업데이트 처리
  async updateMember(
    @Param('id') id: string, // URL에서 가져온 멤버 ID
    @UploadedFile() file: Express.Multer.File, // 업로드된 파일
    @Body() body: any, // 요청 본문 데이터
  ) {
    return this.memberService.updateMember(parseInt(id, 10), body, file);
  }

  // 멤버 삭제 엔드포인트
  @Delete(':id')
  deleteMember(@Param('id') id: string) {
    return this.memberService.deleteMember(parseInt(id, 10));
  }
}