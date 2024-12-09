import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  date: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsUrl()
  mediaUrl?: string;
}
