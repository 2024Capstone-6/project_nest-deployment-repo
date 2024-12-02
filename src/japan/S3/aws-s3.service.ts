import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as path from 'path';

// AWS S3 서비스를 위한 Injectable 클래스
@Injectable()
export class AwsS3Service {
  // AWS S3 클라이언트 인스턴스
  private readonly s3: AWS.S3;
  private readonly bucketName: string;

  constructor() {
    // AWS S3 클라이언트 초기화
    this.s3 = new AWS.S3({
      region: process.env.JAPAN_AWS_REGION,
      credentials: {
        accessKeyId: process.env.JAPAN_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.JAPAN_AWS_SECRET_ACCESS_KEY,
      },
    });

    this.bucketName = process.env.JAPAN_AWS_BUCKET_NAME;
  }

  // 이미지 파일을 S3에 업로드하는 메서드
  async uploadImage(file: Express.Multer.File): Promise<string> {
    // 버킷 이름이 설정되어 있는지 확인
    if (!this.bucketName) {
      throw new Error('AWS_BUCKET_NAME is not defined');
    }

    // 파일 확장자 추출
    const fileExt = path.extname(file.originalname).toLowerCase();
    // 유니크한 파일 이름 생성 (타임스탬프와 랜덤 문자열 조합)
    const fileName = `activities/${Date.now()}-${Math.random().toString(36).substring(2, 7)}${fileExt}`;

    // S3 업로드 파라미터 설정
    const params = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      // S3에 파일 업로드 실행
      const result = await this.s3.upload(params).promise();
      return result.Location; // 업로드된 파일의 URL 반환
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw error;
    }
  }
}
