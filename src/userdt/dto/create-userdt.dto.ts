import {IsEmail, IsNotEmpty, Length, Matches} from 'class-validator'

export class CreateUserdtDto {
  // 1. dto 생성 - 사용자가 입력할 데이터를 정의
  @IsNotEmpty()
  @Length(3, 10, { message: 'Nickname must be between 1 and 5 characters.' })
  @Matches(/^[a-zA-Z가-힣0-9]+$/, { message: 'Nickname can only contain letters, numbers, and Korean characters.' })
  nickname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsNotEmpty()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters.' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/, { message: 'Password must include both letters and numbers.' })
  password: string;
}
