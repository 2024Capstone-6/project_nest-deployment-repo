import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { S3Service } from './s3/s3.service';

@Injectable() // 서비스로 정의
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>, // 멤버 관련 데이터베이스 접근
    private readonly s3Service: S3Service, // S3 파일 관리 서비스
  ) {}

  // 새로운 멤버 생성
  async createMember(body: any, file: Express.Multer.File) {
    const profileImageUrl = file
      ? await this.s3Service.uploadFile(file) // S3에 파일 업로드
      : null;

    const newMember = this.memberRepository.create({
      ...body, // 전달받은 본문 데이터
      profileImage: profileImageUrl, // 업로드된 이미지 URL
    });

    return this.memberRepository.save(newMember); // 데이터베이스에 저장
  }

  // 모든 멤버 조회
  async getMembers() {
    return this.memberRepository.find(); // 모든 멤버 데이터 반환
  }

  // 멤버 정보 업데이트
  async updateMember(id: number, body: any, file: Express.Multer.File) {
    const existingMember = await this.memberRepository.findOne({ where: { id } });

    if (!existingMember) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND); // 멤버가 없는 경우 예외 발생
    }

    const profileImageUrl = file
      ? await this.s3Service.uploadFile(file) // S3에 새 이미지 업로드
      : existingMember.profileImage; // 기존 이미지 사용

    const updatedMember = {
      ...existingMember, // 기존 데이터
      ...body, // 업데이트할 데이터
      profileImage: profileImageUrl, // 새로운 이미지 URL
    };

    return this.memberRepository.save(updatedMember); // 데이터베이스에 업데이트
  }

  // 멤버 삭제
  async deleteMember(id: number) {
    const result = await this.memberRepository.delete({ id });
    if (result.affected === 0) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND); // 삭제할 멤버가 없는 경우 예외 발생
    }
    return { message: 'Member deleted successfully' }; // 성공 메시지 반환
  }
}