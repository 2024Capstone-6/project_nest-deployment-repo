import { IsString, IsEmail } from 'class-validator';

export class CreateJapaneseDto {
  @IsEmail()
  email: string;

  @IsString()
  date: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
