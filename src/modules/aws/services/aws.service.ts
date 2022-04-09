import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  private logger = new Logger(AwsService.name);
  private s3: S3;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      region: this.configService.get<string>('AWS_REGION'),
      accessKeyId: this.configService.get<string>('AWS_KEY'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET'),
    });
  }

  async uploadS3(
    file: Buffer,
    originalname: string,
    _id: string,
  ): Promise<{ avatar: string }> {
    try {
      const bucketName = this.configService.get<string>('AWS_BUCKET_NAME');
      const region = this.configService.get<string>('AWS_REGION');

      const urlKey = `${_id}-${Date.now()}.${originalname}`;

      const jsonFile = JSON.stringify(file);

      await this.s3
        .putObject({
          Bucket: bucketName,
          Body: jsonFile,
          Key: urlKey,
          ACL: 'public-read-write',
        })
        .promise();

      return {
        avatar: `https://${bucketName}.s3-${region}.amazonaws.com/${urlKey}`,
      };
    } catch (error) {
      this.logger.error(
        `Error processing the image: ${JSON.stringify(error.message)}`,
      );
      throw new BadRequestException(error.message);
    }
  }
}
