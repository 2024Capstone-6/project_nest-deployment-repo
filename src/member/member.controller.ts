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

// MemberController는 HTTP 요청을 처리하며,
// /members 경로와 관련된 작업을 담당한다.
@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // 새로운 멤버를 생성하는 API
  @Post()
  @UseInterceptors(FileInterceptor('profileImage', {
    fileFilter: (_req, file, callback) => {
      // 업로드된 파일의 형식 검사 (JPG, JPEG, PNG만 허용)
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(
          new HttpException(
            'Invalid file type. Only JPG, JPEG, and PNG are allowed.',
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
      callback(null, true); // 파일 형식이 유효한 경우 처리
    },
  }))
  async createMember(
    @UploadedFile() file: Express.Multer.File, // 업로드된 파일
    @Body() body: any, // 요청 본문 데이터
  ) {
    return this.memberService.createMember(body, file); // 서비스 호출
  }

  // 모든 멤버 데이터를 가져오는 API
  @Get()
  getMembers() {
    return this.memberService.getMembers(); // 서비스 호출
  }

  // 특정 멤버 데이터를 업데이트하는 API
  @Patch(':id')
  @UseInterceptors(FileInterceptor('profileImage', {
    fileFilter: (_req, file, callback) => {
      // 업로드된 파일의 형식 검사
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(
          new HttpException(
            'Invalid file type. Only JPG, JPEG, and PNG are allowed.',
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
      callback(null, true); // 파일 형식이 유효한 경우 처리
    },
  }))
  async updateMember(
    @Param('id') id: string, // URL에서 id 파라미터 추출
    @UploadedFile() file: Express.Multer.File, // 업로드된 파일
    @Body() body: any, // 요청 본문 데이터
  ) {
    return this.memberService.updateMember(parseInt(id, 10), body, file); // 서비스 호출
  }

  // 특정 멤버 데이터를 삭제하는 API
  @Delete(':id')
  deleteMember(@Param('id') id: string) {
    return this.memberService.deleteMember(parseInt(id, 10)); // 서비스 호출
  }
}