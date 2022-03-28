import { InputType, PartialType } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { AddItemImageInput } from '../item-image/dto/item-image.input';

@InputType('CreateItemInput')
export class CreateItemInput {
  code: string;

  name: string;

  price: number;

  currency?: string;

  @Allow()
  images?: AddItemImageInput[];
}

@InputType('UpdateItemInput')
export class UpdateItemInput extends PartialType(CreateItemInput) {
  code: string;
}
