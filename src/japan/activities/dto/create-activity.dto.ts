import { IsString, IsEmail, IsOptional, IsUrl } from 'class-validator';

export class CreateActivityDto {
  @IsEmail()
  email: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsUrl()
  mediaUrl?: string;

  date: string;
}
