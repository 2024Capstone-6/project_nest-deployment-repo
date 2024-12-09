import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 데이터베이스 테이블 정의
export class Member {
  @PrimaryGeneratedColumn() // 자동 생성되는 기본 키
  id: number;

  @Column() // 기본적인 문자열 컬럼
  name: string;

  @Column({ nullable: true }) // nullable: 필드가 비어 있을 수 있음
  role: string;

  @Column({ nullable: true })
  profileImage: string; // 프로필 이미지 URL

  @Column({ nullable: true })
  comment: string; // 멤버의 코멘트

  @Column({ nullable: true })
  email: string; // 멤버의 이메일

  @Column('simple-array', { nullable: true }) // 문자열 배열 (쉼표로 구분)
  techStack: string[]; // 기술 스택 리스트
}