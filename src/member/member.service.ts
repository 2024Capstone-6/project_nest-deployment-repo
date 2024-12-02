import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    private readonly s3Service: S3Service,
  ) {}

  // 멤버 생성
  async createMember(body: any, file: Express.Multer.File) {
    const profileImageUrl = file
      ? await this.s3Service.uploadFile(file)
      : null;

    const newMember = this.memberRepository.create({
      ...body,
      profileImage: profileImageUrl,
    });

    return this.memberRepository.save(newMember);
  }

  // 모든 멤버 조회
  async getMembers() {
    return this.memberRepository.find();
  }

  // 멤버 업데이트
  async updateMember(id: number, body: any, file: Express.Multer.File) {
    const existingMember = await this.memberRepository.findOne({ where: { id } });

    if (!existingMember) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    const profileImageUrl = file
      ? await this.s3Service.uploadFile(file)
      : existingMember.profileImage;

    const updatedMember = {
      ...existingMember,
      ...body,
      profileImage: profileImageUrl,
    };

    return this.memberRepository.save(updatedMember);
  }

  // 멤버 삭제
  async deleteMember(id: number) {
    const result = await this.memberRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }
    return { message: 'Member deleted successfully' };
  }
}