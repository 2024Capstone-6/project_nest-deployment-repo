import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Japanese {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  title: string;

  @Column()
  content: string;
}
