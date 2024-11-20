import { IsString, Length } from "class-validator"


export class CreateSpecialDto {

  @Length(5,100)
  @IsString()
  Question : string

  answer : string
}
