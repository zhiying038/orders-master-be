import { InputType } from '@nestjs/graphql';
import { Allow } from 'class-validator';

@InputType('AddItemImageInput')
export class AddItemImageInput {
  @Allow()
  link: string;

  @Allow()
  alt?: string;
}
