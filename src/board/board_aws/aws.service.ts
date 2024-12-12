import { Injectable, BadRequestException } from '@nestjs/common';
import * as AWS from 'aws-sdk'
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AwsService {
  private s3Client: AWS.S3;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3Client = new AWS.S3({
      region: this.configService.get<string>('BOARD_AWS_REGION'),
      accessKeyId: this.configService.get<string>('BOARD_AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('BOARD_AWS_SECRET_ACCESS_KEY'),

    });
    this.bucketName = this.configService.get<string>('BOARD_AWS_S3_BUCKET');
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const fileExtension = file.originalname.split('.').pop();
    const key = `${uuidv4()}.${fileExtension}`;
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }
   
    await this.s3Client.upload(params).promise()
    
    return `https://${this.bucketName}.s3.amazonaws.com/${key}`;
   
  }
}