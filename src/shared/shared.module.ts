import { Global, Module } from '@nestjs/common';
import { GeneratorService } from './services/generator.service';
import { ValidatorService } from './services/validator.service';

const providers = [ValidatorService, GeneratorService];

@Global()
@Module({
  providers,
  imports: [],
  exports: [...providers],
})
export class SharedModule {}
