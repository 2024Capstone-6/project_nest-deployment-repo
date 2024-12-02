import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 데이터베이스 테이블을 나타내는 엔티티 클래스
@Entity()
export class Member {
  @PrimaryGeneratedColumn() // 기본 키로 사용될 자동 생성 ID
  id: number;

  @Column() // 이름 컬럼 (필수)
  name: string;

  @Column({ nullable: true }) // 역할 컬럼 (선택)
  role: string;

  @Column({ nullable: true }) // 프로필 이미지 URL 컬럼 (선택)
  profileImage: string;

  @Column({ nullable: true }) // 코멘트 컬럼 (선택)
  comment: string;

  @Column({ nullable: true }) // 이메일 컬럼 (선택)
  email: string;

  @Column('simple-array', { nullable: true }) // 기술 스택 컬럼 (선택)
  techStack: string[];
}