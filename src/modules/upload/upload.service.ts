import { BadRequestException, Injectable } from '@nestjs/common';
import { S3, config } from 'aws-sdk';
import { has } from 'lodash';
import * as mime from 'mime-types';
import { UploadPurpose } from 'src/common/constants/upload-purpose';
import { GeneratorService } from 'src/shared/services/generator.service';
import { ValidatorService } from 'src/shared/services/validator.service';
import { CreateUploadInput } from './dto/upload.input';
import { SignedUrlDto } from './dto/upload.dto';

@Injectable()
export class UploadService {
  constructor(
    public validatorService: ValidatorService,
    public generatorService: GeneratorService,
  ) {}

  async generateSignedUrl(input: CreateUploadInput): Promise<SignedUrlDto> {
    const s3 = new S3();
    config.update({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_KEY,
      region: process.env.AWS_S3_REGION,
    });

    const whitelistPurpose = {
      [UploadPurpose.IMAGE]: 'images',
    };

    const { mimeType, purpose } = input;
    if (!has(whitelistPurpose, purpose)) {
      throw new BadRequestException('Invalid upload purpose');
    }

    if (has({ [UploadPurpose.IMAGE]: 'images' }, purpose)) {
      if (!this.validatorService.isImage(mimeType)) {
        throw new BadRequestException('Invalid upload file mime type');
      }
    }

    const folderName = whitelistPurpose[purpose];
    const fileExtension = mime.extension(mimeType) as string;
    const fileName = this.generatorService.fileName(fileExtension);
    const filePath = `${folderName}/${fileName}`;
    const bucketName = process.env.AWS_S3_BUCKET;

    try {
      const signedUrl = s3.getSignedUrl('putObject', {
        Bucket: bucketName,
        Key: filePath,
        Expires: 3600,
        ContentType: mimeType,
      });

      const results = new SignedUrlDto();
      results.signedUrl = signedUrl;
      return results;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
