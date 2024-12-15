import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // TypeORM이 이 클래스를 데이터베이스 테이블로 인식하도록 지정
export class Japanese {
  @PrimaryGeneratedColumn() // 자동 증가하는 기본 키(Primary Key) 설정
  id: number;

  @Column() // 일반 컬럼 정의
  email: string;

  @Column() // 타입을 string으로 변경
  date: string;

  @Column()
  title: string;

  @Column()
  content: string;
}
