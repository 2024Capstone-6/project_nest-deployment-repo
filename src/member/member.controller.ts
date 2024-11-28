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

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profileImage', {
    fileFilter: (_req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(
          new HttpException(
            'Invalid file type. Only JPG, JPEG, and PNG are allowed.',
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
      callback(null, true);
    },
  }))
  async createMember(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.memberService.createMember(body, file);
  }

  @Get()
  getMembers() {
    return this.memberService.getMembers();
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('profileImage', {
    fileFilter: (_req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(
          new HttpException(
            'Invalid file type. Only JPG, JPEG, and PNG are allowed.',
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
      callback(null, true);
    },
  }))
  async updateMember(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    return this.memberService.updateMember(parseInt(id, 10), body, file);
  }

  @Delete(':id')
  deleteMember(@Param('id') id: string) {
    return this.memberService.deleteMember(parseInt(id, 10));
  }
}