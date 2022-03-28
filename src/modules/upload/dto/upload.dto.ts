import { ObjectType } from '@nestjs/graphql';

@ObjectType('SignedUrl')
export class SignedUrlDto {
  signedUrl?: string;
}
