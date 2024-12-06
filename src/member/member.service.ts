import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { S3Service } from '../s3/s3.service';

// MemberService는 비즈니스 로직을 처리하며,
// MemberController와 데이터베이스 간의 중간 다리 역할을 한다.
@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>, // TypeORM 레포지토리
    private readonly s3Service: S3Service, // S3 서비스
  ) {}

  // 멤버 생성 로직
  async createMember(body: any, file: Express.Multer.File) {
    const profileImageUrl = file
      ? await this.s3Service.uploadFile(file) // S3에 파일 업로드
      : null;

    const newMember = this.memberRepository.create({
      ...body,
      profileImage: profileImageUrl, // S3 URL 저장
    });

    return this.memberRepository.save(newMember); // 데이터 저장
  }

  // 모든 멤버 데이터 가져오기
  async getMembers() {
    return this.memberRepository.find(); // 모든 레코드 반환
  }

  // 멤버 업데이트 로직
  async updateMember(id: number, body: any, file: Express.Multer.File) {
    const existingMember = await this.memberRepository.findOne({ where: { id } });

    if (!existingMember) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND); // 멤버가 없을 경우 에러 반환
    }

    const profileImageUrl = file
      ? await this.s3Service.uploadFile(file) // S3에 파일 업로드
      : existingMember.profileImage; // 기존 이미지 유지

    const updatedMember = {
      ...existingMember,
      ...body,
      profileImage: profileImageUrl, // 업데이트된 데이터 병합
    };

    return this.memberRepository.save(updatedMember); // 업데이트된 데이터 저장
  }

  // 멤버 삭제 로직
  async deleteMember(id: number) {
    const result = await this.memberRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND); // 삭제 대상이 없을 경우 에러 반환
    }
    return { message: 'Member deleted successfully' }; // 삭제 성공 메시지
  }
}