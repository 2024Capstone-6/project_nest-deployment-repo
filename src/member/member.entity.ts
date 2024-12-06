import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Member 엔티티는 데이터베이스의 'Member' 테이블을 표현하며,
// 각각의 Column은 테이블의 필드로 매핑된다.
@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number; // 자동 증가되는 Primary Key

  @Column()
  name: string; // 이름 필드 (필수)

  @Column({ nullable: true })
  role: string; // 역할 필드 (선택적)

  @Column({ nullable: true })
  profileImage: string; // 프로필 이미지 URL 필드 (선택적)

  @Column({ nullable: true })
  comment: string; // 코멘트 필드 (선택적)

  @Column({ nullable: true })
  email: string; // 이메일 필드 (선택적)

  @Column('simple-array', { nullable: true })
  techStack: string[]; // 기술 스택 배열 필드 (선택적)
}