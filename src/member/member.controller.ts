import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MemberService } from './member.service';

// HTTP 요청을 처리
// MemberService를 사용해 데이터를 처리하고 로직 실행
// /members 경로로 시작하는 요청을 처리
@Controller('members') // 멤버 관련 요청을 처리하는 컨트롤러
export class MemberController {
  // 의존성 주입 (DI : Dependency Injection)
  // constructor를 통해 MemberService를 클래스 내부로 주입
  // 자동으로 MemberService 객체를 생성하고 주입
  // private readonly: 컨트롤러 외부에서 이를 변경하거나 접근하지 못하도록 보장
  constructor(private readonly memberService: MemberService) {}

  // 새로운 멤버 생성
  @Post()
  // @UseInterceptors(): Interceptor(가로채기 기능)를 사용하도록 설정
  // FileInterceptor: 파일 업로드를 쉽게 처리할 수 있도록 도와주는 NestJS의 유틸리티
  // profileImage: 프로필 이미지 필드명
  @UseInterceptors(FileInterceptor('profileImage', {
    // fileFilter: 업로드 가능한 파일 형식을 제한
    // _req: 요청 객체, HTTP 요청의 모든 정보를 담고 있음. 사용하지 않는 매개변수
    // file: 업로드한 파일의 정보
    // callback: 파일을 허용할지 말지 결정하는 함수. (null, true): 파일 허용, (error, false): 파일 거부
    fileFilter: (_req, file, callback) => {
      // 허용된 파일 유형 확인
      // file.mimetype: 파일의 MIME 타입을 나타냄
      // match(): 문자열이 정규식과 매치되는 부분을 검색
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        // 파일 필터링 로직의 마지막 단계
        // 파일이 허용되지 않는 경우
        return callback(
          // HttpException: HTTP 오류 응답 객체
          // 예외 발생 시 상태 코드와 에러 메시지 반환
          // new HttpException(에러 메시지, HTTP 상태 코드)
          new HttpException(
            'Invalid file type. Only JPG, JPEG, and PNG are allowed.',
            // HttpStatus.BAD_REQUEST: NestJS에서 미리 정의한 HTTP 상태 코드
            // BAD_REQUEST: 상태 코드 400. 요청이 잘못되었음을 의미
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
      // 파일이 허용되는 경우
      // (에러가 없음, 파일이 허용됨)
      callback(null, true);
    },
  }))
  // 비동기 실행
  // 멤버 생성 메서드
  async createMember(
    // @UploadedFile(): 업로드된 파일 데이터를 처리. 파일 정보를 파라미터로 받음.
    // Express.Multer.File: Multer 라이브러리에서 제공하는 파일 객체 타입
    // 파일 정보
    // originalname: 파일의 원래 이름, filename: 서버에서 저장된 이름, mimetype: 파일 형식, size: 파일 크기
    // encoding: 파일의 인코딩 방식, buffer: 메모리에 저장된 파일의 바이너리 데이터
    // Multer: 파일 업로드를 처리하기 위한 라이브러리
    @UploadedFile() file: Express.Multer.File,
    // @Body(): HTTP 요청 본문에서 데이터를 가져오기 위한 데코레이터
    // 본문 내용을 body에 할당
    // any: DTO를 사용해 타입 정의
    @Body() body: any,
  ) {
    // this: MemberController 클래스의 인스턴스
    // MemberService 클래스의 createMember 메서드 호출
    // 요청 데이터와 업로드된 파일을 MemberService에 전달
    // MemberService에서 반환한 값을 사용자에게 전달
    return this.memberService.createMember(body, file); // 멤버 생성 서비스 호출
  }

  // 모든 멤버 조회
  @Get()
  // getMembers(): 멤버 조회를 위한 메서드
  // 데이터베이스에 저장된 모든 멤버 데이터를 반환
  getMembers() {
    // MemberService 클래스의 getMembers 메서드를 호출
    // 멤버 데이터 반환
    return this.memberService.getMembers();
  }

  // 멤버 정보 업데이트
  // :id: URL에서 동적으로 추출될 ID
  // /members/1 요청에서 ID는 1
  @Patch(':id')
  // 파일 업로드 처리
  @UseInterceptors(FileInterceptor('profileImage', {
    fileFilter: (_req, file, callback) => {
      // 허용된 파일 유형 확인
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(
          new HttpException(
            'Invalid file type. Only JPG, JPEG, and PNG are allowed.',
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
      callback(null, true); // 파일 유형이 유효한 경우
    },
  }))
  // 비동기 실행
  async updateMember(
    // @Param: HTTP 요청 URL에서 동적으로 전달된 매개변수를 추출
    // URL에서 동적으로 전달된 id를 추출
    // id라는 이름으로 추출된 값 저장, string 타입
    @Param('id') id: string,
    // 업로드된 파일을 처리
    @UploadedFile() file: Express.Multer.File,
    // HTTP 요청 본문 데이터 처리
    @Body() body: any,
  ) {
    // MemberService에서 updateMember 메서드 호출
    // 요청 데이터와 업로드된 파일을 MemberService에 전달
    // MemberService에서 반환한 값을 사용자에게 전달
    // parseInt: 문자열을 숫자로 변환
    // parseInt(변환할 값, 진수)
    return this.memberService.updateMember(parseInt(id, 10), body, file);
  }

  // 멤버 삭제
  // // URL에서 동적으로 전달된 id를 추출
  @Delete(':id')
  deleteMember(@Param('id') id: string) {
    // MemberService에서 deleteMember 메서드 호출
    // 요청 데이터와 업로드된 파일을 MemberService에 전달
    // MemberService에서 반환한 값을 사용자에게 전달
    return this.memberService.deleteMember(parseInt(id, 10)); // 멤버 삭제 서비스 호출
  }
}