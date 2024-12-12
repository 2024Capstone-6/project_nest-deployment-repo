import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { S3Service } from './s3/s3.service';

// member.service.ts: 데이터베이스와의 상호작용, 비즈니스 로직, 파일 업로드 처리 등을 담당
// @Injectable(): 서비스 클래스로 사용됨을 나타냄
// 다른 클래스에 주입(Injection)되어 사용
@Injectable()
export class MemberService {
  constructor(
    // @InjectRepository(Member): TypeORM의 Repository를 현재 클래스에 주입
    // Member 엔티티와 매핑된 데이터베이스 테이블을 제어
    @InjectRepository(Member)
    // memberRepository: 데이터베이스에서 Member 데이터를 조회, 저장, 삭제 등 수행
    private readonly memberRepository: Repository<Member>, // 멤버 관련 데이터베이스 접근
    // s3Service: S3에 파일 업로드 및 URL 관리를 담당하는 서비스
    private readonly s3Service: S3Service, // S3 파일 관리 서비스
  ) {}

  // 새로운 멤버 생성
  // body: 멤버의 기본 정보(이름, 역할, 기술 스택 등)
  // file: 업로드된 파일 객체. S3에 업로드할 이미지
  async createMember(body: any, file: Express.Multer.File) {
    const profileImageUrl = file
      // file이 있다면
      // s3Service에서 uploadFile 메서드를 호출해 S3에 file을 업로드
      // S3에서 반환된 URL을 profileImageUrl로 저장
      ? await this.s3Service.uploadFile(file) // S3에 파일 업로드
      // 파일이 없다면 profileImageUrl을 null로 설정
      : null;
    // memberRepository.create()로 새 멤버 엔티티 생성
    const newMember = this.memberRepository.create({
      ...body, // 전달받은 본문 데이터
      // S3에서 반환된 URL을 추가
      profileImage: profileImageUrl, // 업로드된 이미지 URL
    });
    // 새 엔티티를 데이터베이스에 저장
    // 저장된 멤버 데이터 반환
    return this.memberRepository.save(newMember);
  }

  // 모든 멤버 조회
  async getMembers() {
    // TypeORM의 find() 메서드를 호출해 Member 테이블의 모든 데이터 조회
    // 모든 멤버의 데이터 리스트 반환
    return this.memberRepository.find();
  }

  // 멤버 정보 업데이트
  // id: 업데이트할 멤버의 ID, body: 전달받은 수정 데이터, file: 새로 업로드된 이미지 파일
  // Express.Multer.File: Multer 라이브러리에서 제공하는 파일 객체 타입
  // originalname: 파일의 원래 이름, filename: 서버에서 저장된 이름, mimetype: 파일 형식, size: 파일 크기
  async updateMember(id: number, body: any, file: Express.Multer.File) {
    // fineOne() 메서드로 ID에 해당하는 멤버를 데이터베이스에서 조회
    const existingMember = await this.memberRepository.findOne({ where: { id } });
    // 멤버가 없는 경우 예외 발생
    if (!existingMember) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }

    const profileImageUrl = file
      // 새 파일이 있다면
      // S3에 업로드 후 URL 반환
      ? await this.s3Service.uploadFile(file)
      // 새 파일이 없다면
      // 기존 이미지 유지
      : existingMember.profileImage;

    const updatedMember = {
      ...existingMember, // 기존 데이터
      // 기존 데이터에 수정 데이터를 병합
      // 수정 데이터로 전달된 속성만 덮어씌움
      // body: 프론트엔드로부터 전달된 HTTP 요청의 본문 데이터
      ...body,
      // 새로운 이미지 URL로 업데이트
      profileImage: profileImageUrl,
    };
    // 수정된 데이터를 데이터베이스에 저장
    // 업데이트된 멤버 데이터 반환
    return this.memberRepository.save(updatedMember);
  }

  // 멤버 삭제
  // id: 삭제할 멤버의 ID
  async deleteMember(id: number) {
    // delete() 메서드로 ID에 해당하는 멤버 데이터 삭제
    const result = await this.memberRepository.delete({ id });
    // 삭제할 멤버가 없으면 예외 발생
    // affected: delete()의 반환값
    if (result.affected === 0) {
      throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    }
    // 삭제가 되었을 시 삭제 성공 메시지 반환
    return { message: 'Member deleted successfully' };
  }
}