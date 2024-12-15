import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsUrl()
  imgurl?: string;
}
