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

@Controller('members') // 멤버 관련 요청을 처리하는 컨트롤러
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // 새로운 멤버 생성
  @Post()
  @UseInterceptors(FileInterceptor('profileImage', {
    fileFilter: (_req, file, callback) => {
      // 허용된 파일 유형 확인
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(
          new HttpException(
            'Invalid file type. Only JPG, JPEG, and PNG are allowed.',
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
      callback(null, true); // 파일 유형이 유효한 경우
    },
  }))
  async createMember(
    @UploadedFile() file: Express.Multer.File, // 업로드된 파일
    @Body() body: any, // 요청 본문 데이터
  ) {
    return this.memberService.createMember(body, file); // 멤버 생성 서비스 호출
  }

  // 모든 멤버 조회
  @Get()
  getMembers() {
    return this.memberService.getMembers(); // 모든 멤버 조회 서비스 호출
  }

  // 멤버 정보 업데이트
  @Patch(':id')
  @UseInterceptors(FileInterceptor('profileImage', {
    fileFilter: (_req, file, callback) => {
      // 허용된 파일 유형 확인
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(
          new HttpException(
            'Invalid file type. Only JPG, JPEG, and PNG are allowed.',
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
      callback(null, true); // 파일 유형이 유효한 경우
    },
  }))
  async updateMember(
    @Param('id') id: string, // URL에서 ID 파라미터 추출
    @UploadedFile() file: Express.Multer.File, // 업로드된 파일
    @Body() body: any, // 요청 본문 데이터
  ) {
    return this.memberService.updateMember(parseInt(id, 10), body, file); // 멤버 업데이트 서비스 호출
  }

  // 멤버 삭제
  @Delete(':id')
  deleteMember(@Param('id') id: string) {
    return this.memberService.deleteMember(parseInt(id, 10)); // 멤버 삭제 서비스 호출
  }
}