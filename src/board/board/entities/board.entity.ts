import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  title:string;
  @Column()
  content:string;
  @Column({ nullable: true })
  imgurl:string;
  @Column()
  date:string;
}
