import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async uploadFile(file: Express.Multer.File) {
    const fileExtension = file.originalname.split('.').pop();
    const key = `${uuid()}.${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const result = await this.s3.upload(params).promise();
      return result.Location;
    } catch (error) {
      throw new HttpException(
        'Error uploading file to S3',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}