// 클래스 기반 데이터 검증을 제공하는 라이브러리
import { IsString, IsOptional, IsUrl, IsEmail } from 'class-validator';

// Activity 생성 요청에 필요한 데이터를 정의
export class CreateActivityDto {
  @IsEmail() // 이메일 형식인지 확인
  email: string;

  @IsString() // 문자열 타입인지 확인
  date: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional() // 선택적 속성 검증, 값이 undefined인 경우 검증 대상에서 제외
  @IsUrl() // 유효한 URL 검증
  mediaUrl?: string;
}
