import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity(): 이 클래스가 데이터베이스 테이블의 엔티티임을 나타냄
@Entity()
export class Activities {
  // @PrimaryGeneratedColumn(): 자동으로 생성되는 기본 키
  @PrimaryGeneratedColumn()
  id: number;

  // @Column(): 컬럼을 나타냄
  @Column()
  email: string;

  // 기본값을 추가, 데이터 생성 시 자동으로 설정
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  title: string;

  @Column()
  content: string;

  // @Column({ nullable: true }): 해당 컬럼이 null이 될 수 있음을 나타냄
  @Column({ nullable: true })
  mediaUrl: string; // 이미지나 영상의 URL을 저장
}
