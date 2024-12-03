import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialDto } from './create-special.dto';
import { IsNotEmpty, IsString, Length } from "class-validator"

export class UpdateSpecialDto extends PartialType(CreateSpecialDto) {
  
  @IsNotEmpty()
  Question: string
  @IsNotEmpty()
  answer: string
}
