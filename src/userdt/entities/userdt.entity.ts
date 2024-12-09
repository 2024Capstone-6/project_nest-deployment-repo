import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Userdt {
  // 2. Entity정의 DB 테이블과 매핑될 엔티티 설정 및 생성
  @PrimaryGeneratedColumn()
  id: number; // 기본 키

  @Column({unique:true}) // 고유 값 설정
  nickname: string

  @Column({unique:true})
  email: string

  @Column()
  password: string // 비밀번호는 해싱 필요
}
