import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/shared.module';
import { UploadResolver } from './upload.resolver';
import { UploadService } from './upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([]), SharedModule],
  providers: [UploadService, UploadResolver],
  exports: [UploadService],
})
export class UploadModule {}
