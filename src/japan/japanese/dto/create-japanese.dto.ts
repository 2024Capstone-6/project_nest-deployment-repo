import { IsString } from 'class-validator';

export class CreateJapaneseDto {
  @IsString()
  date: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
