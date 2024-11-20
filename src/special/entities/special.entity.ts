import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Special {
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  Question:string

  @Column()
  answer:string
}