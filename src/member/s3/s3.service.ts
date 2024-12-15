import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as AWS from 'aws-sdk';

// @Injectable: S3Service가 모듈 내 다른 컴포넌트(컨트롤러나 다른 서비스)에 주입될 수 있도록 설정
@Injectable() // S3와 관련된 작업을 처리하는 서비스
export class S3Service {
  // AWS.S3: AWS SDK에서 제공하는 S3 클라이언트 클래스
  // S3와 상호작용을 처리
  private readonly s3: AWS.S3;

  constructor() {
    // 환경변수 사용
    this.s3 = new AWS.S3({
      region: process.env.MEMBER_AWS_REGION, // AWS 리전
      accessKeyId: process.env.MEMBER_AWS_ACCESS_KEY_ID, // AWS 액세스 키
      secretAccessKey: process.env.MEMBER_AWS_SECRET_ACCESS_KEY, // AWS 시크릿 키
    });
  }

  // S3에 파일 업로드
  // 파일 업로드 작동 순서
  // 파일 이름 생성 -> 업로드 파라미터 설정 -> S3에 업로드 -> 업로드된 파일 URL 반환
  // file: Express에서 제공하는 Multer 파일 객체
  async uploadFile(file: Express.Multer.File) {
    // file.originalname: 업로드된 파일의 원래 이름
    // .split('.').pop(): 파일 이름의 확장자 추출
    const fileExtension = file.originalname.split('.').pop();
    // Date.now(): 고유한 파일 이름을 생성하기 위해 현재 시간을 밀리초로 사용
    // 예) 1699999999999.png
    const key = `${Date.now()}.${fileExtension}`;

    // 업로드 파라미터 설정
    // 업로드 파라미터: AWS S3에 파일을 업로드 할 때 필요한 설정 정보
    // 업로드할 파일의 속성, 위치 등을 지정
    const params = {
      Bucket: process.env.MEMBER_AWS_S3_BUCKET, // 업로드할 S3 버킷 이름(파일을 저장할 위치)
      Key: key, // S3에 저장될 파일 이름
      // file.buffer: 업로드할 파일 데이터
      // buffer: Multer에서 제공하는 Express.Multer.File 객체의 속성
      // Multer가 파일 업로드를 처리할 때, 메모리 스토리지(multer.memoryStorage())를 사용하는 경우
      // 파일 데이터를 메모리에 저장, 이를 buffer 속성에 담음
      // buffer는 파일의 바이너리 데이터를 의미, 파일 내용을 직접적으로 다룰 수 있는 형태
      // S3에 업로드할 때 파일 데이터를 직접 전송해야 함
      // buffer는 Multer가 메모리에 저장한 파일 내용을 바이너리 형태로 제공
      // 이를 Body로 사용해 S3에 업로드
      Body: file.buffer, // 파일 데이터
      ContentType: file.mimetype, // 파일 MIME(확장자) 타입
    };

    try {
      // S3에 파일을 업로드하고 결과를 Promise로 반환
      // result: 업로드된 파일과 관련된 정보
      // 구조
      // Location: 업로드된 파일의 URL, ETag: 파일의 고유 식별자, Bucket: 파일이 저장된 버킷 이름, Key: 파일이 S3에 저장된 경로
      const result = await this.s3.upload(params).promise();
      // 성공 시 업로드된 파일의 URL 반환
      return result.Location;
    } catch (error) { // 업로드 실패 시 예외 발생
      throw new HttpException(
        'Error uploading file to S3',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}