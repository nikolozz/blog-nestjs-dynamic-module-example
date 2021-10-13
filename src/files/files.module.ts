import { Module } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { AwsModule } from 'src/aws/aws.module';
import { FilesService } from './files.service';

@Module({
  imports: [AwsModule.forFeature(S3)],
  providers: [FilesService],
})
export class FilesModule {}
