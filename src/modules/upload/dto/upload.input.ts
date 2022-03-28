import { InputType } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { UploadPurpose } from 'src/common/constants/upload-purpose';

@InputType('CreateUploadInput')
export class CreateUploadInput {
  @Allow()
  purpose: UploadPurpose;

  @Allow()
  mimeType: string;
}
