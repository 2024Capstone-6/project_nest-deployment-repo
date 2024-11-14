import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JapanesePost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  content: string;
}
