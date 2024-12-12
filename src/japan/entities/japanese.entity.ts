import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // TypeORM이 이 클래스를 데이터베이스 테이블로 인식하도록 지정
export class Japanese {
  @PrimaryGeneratedColumn() // 자동 증가하는 기본 키(Primary Key) 설정
  id: number;

  @Column() // 일반 컬럼 정의
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  // 타임스탬프 타입의 컬럼으로, 기본값으로 현재 시간 설정
  date: Date;

  @Column()
  title: string;

  @Column()
  content: string;
}
