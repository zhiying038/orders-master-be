import { registerEnumType } from '@nestjs/graphql';

export enum UploadPurpose {
  IMAGE = 'image',
}
registerEnumType(UploadPurpose, { name: 'UploadPurpose' });
