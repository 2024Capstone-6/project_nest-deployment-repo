import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  email: string;

  @Column('simple-array', { nullable: true })
  techStack: string[];
}