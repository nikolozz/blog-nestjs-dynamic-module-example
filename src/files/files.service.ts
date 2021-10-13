import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { InjectAwsService } from 'src/aws/decorators/inject-aws-service.decorator';

@Injectable()
export class FilesService {
  constructor(
    @InjectAwsService(S3) private s3Service: S3,
    private readonly configService: ConfigService,
  ) {}

  getBuckets() {
    return this.s3Service
      .listObjects({ Bucket: this.configService.get('AWS_BUCKET') })
      .promise();
  }
}
