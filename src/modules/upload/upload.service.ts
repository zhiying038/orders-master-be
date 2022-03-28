import { BadRequestException, Injectable } from '@nestjs/common';
import { has } from 'lodash';
import mime from 'mime-types';
import { UploadPurpose } from 'src/common/constants/upload-purpose';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { GeneratorService } from 'src/shared/services/generator.service';
import { ValidatorService } from 'src/shared/services/validator.service';
import { CreateUploadInput } from './dto/upload.input';
import { SignedUrlDto } from './dto/upload.dto';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class UploadService {
  constructor(
    public configService: ApiConfigService,
    public validatorService: ValidatorService,
    public generatorService: GeneratorService,
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  async generateSignedUrl(input: CreateUploadInput): Promise<SignedUrlDto> {
    const whitelistPurpose = {
      [UploadPurpose.IMAGE]: 'i',
    };

    const { mimeType, purpose } = input;
    if (!has(whitelistPurpose, purpose)) {
      throw new BadRequestException('Invalid upload purpose');
    }

    if (has({ [UploadPurpose.IMAGE]: 'i' }, purpose)) {
      if (!this.validatorService.isImage(mimeType)) {
        throw new BadRequestException('Invalid upload file mime type');
      }
    }

    const folderName = whitelistPurpose[purpose];
    // const fileExtension = mime.contentType(mimeType);
    const fileName = this.generatorService.fileName('jpeg');

    const [url] = await this.firebase.storage
      .bucket('gs://ft-orders.appspot.com')
      .file(`${folderName}/${fileName}`)
      .getSignedUrl({
        action: 'write',
        expires: Date.now() + 1000 * 60 * 10,
        version: 'v4',
        contentType: mimeType,
      });

    const results = new SignedUrlDto();
    results.signedUrl = url;
    return results;
  }
}
