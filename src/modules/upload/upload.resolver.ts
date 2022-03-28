import { Mutation, Resolver } from '@nestjs/graphql';
import { Args } from '@nestjs/graphql';
import { SignedUrlDto } from './dto/upload.dto';
import { CreateUploadInput } from './dto/upload.input';
import { UploadService } from './upload.service';

@Resolver(() => SignedUrlDto)
export class UploadResolver {
  constructor(private uploadService: UploadService) {}

  @Mutation(() => SignedUrlDto)
  async generateSignedUrl(
    @Args('input') input: CreateUploadInput,
  ): Promise<SignedUrlDto> {
    return await this.uploadService.generateSignedUrl(input);
  }
}
