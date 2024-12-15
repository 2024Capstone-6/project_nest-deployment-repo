import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// 해당 클래스는 members라는 이름의 테이블로 매핑
@Entity() // 데이터베이스 테이블 정의
export class Member {
  // 기본 키로 설정, 숫자 값이 자동으로 증가
  @PrimaryGeneratedColumn()
  id: number; // 각 멤버를 고유하게 식별하는 키

  // @Column(): 속성의 데이터 타입과 제약 조건을 정의
  @Column() // 기본적인 문자열 컬럼
  name: string; // 멤버의 이름

  // nullable: 필드가 비어 있을 수 있음
  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  profileImage: string; // 프로필 이미지 URL

  @Column({ nullable: true })
  comment: string; // 멤버의 코멘트

  @Column({ nullable: true })
  email: string; // 멤버의 이메일

  // simple-array: 문자열을 쉼표로 구분된 하나의 문자열로 저장, 데이터베이스에서 가져올 때 다시 배열로 변환
  // string[]: 문자열 배열
  @Column('simple-array', { nullable: true })
  techStack: string[]; // 기술 스택 리스트
}