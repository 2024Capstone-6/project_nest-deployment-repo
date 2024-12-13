import { IsString, IsOptional, IsUrl, IsEmail } from 'class-validator';

export class CreateActivityDto {
  @IsEmail()
  email: string;

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
