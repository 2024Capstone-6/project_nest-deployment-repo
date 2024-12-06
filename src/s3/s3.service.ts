import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

// S3Service는 AWS S3와의 상호작용을 처리한다.
@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION, // S3 리전
      accessKeyId: process.env.AWS_ACCESS_KEY_ID, // AWS 액세스 키
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // AWS 시크릿 키
    });
  }

  // S3에 파일 업로드
  async uploadFile(file: Express.Multer.File) {
    const fileExtension = file.originalname.split('.').pop(); // 파일 확장자 추출
    const key = `${Date.now()}.${fileExtension}`; // 고유 파일 이름 생성 (Date.now 사용)

    const params = {
      Bucket: process.env.AWS_S3_BUCKET, // 업로드할 S3 버킷 이름
      Key: key, // S3에 저장할 파일 이름
      Body: file.buffer, // 파일 데이터
      ContentType: file.mimetype, // 파일 MIME 타입
    };

    try {
      const result = await this.s3.upload(params).promise(); // S3 업로드
      return result.Location; // 업로드된 파일 URL 반환
    } catch (error) {
      throw new HttpException(
        'Error uploading file to S3',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ); // 업로드 실패 시 에러 반환
    }
  }
}