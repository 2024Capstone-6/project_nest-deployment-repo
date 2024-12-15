import { IsString, IsEmail } from 'class-validator';

// CreateJapaneseDto: 일본어 게시물 생성 시 필요한 데이터 구조를 정의
export class CreateJapaneseDto {
  @IsEmail()
  email: string; // 유효한 이메일 주소인지 검증

  @IsString()
  date: string; // 문자열 형식의 날짜

  @IsString()
  title: string; // 게시물 제목

  @IsString()
  content: string; // 게시물 내용
}
