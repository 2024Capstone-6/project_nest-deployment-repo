import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn()
  id:number;
  @Column()
  content:string;
  @Column({ nullable: true })
  imgurl:string;
  @Column()
  boardId: number; // 게시물 ID를 저장하는 컬럼 
}
