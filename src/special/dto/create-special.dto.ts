import { IsNotEmpty, IsString, Length } from "class-validator"


export class CreateSpecialDto {

  @IsString()
  @IsNotEmpty()
  @Length(2,100)
  Question : string

  @IsString()
  @IsNotEmpty()
  @Length(2,100)
  answer : string

  @IsString()
  @IsNotEmpty()
  author:string
}
