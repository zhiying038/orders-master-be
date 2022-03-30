import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { AddItemImageInput } from '../item-image/dto/item-image.input';

@InputType('CreateItemInput')
export class CreateItemInput {
  @Allow()
  code: string;

  @Allow()
  name: string;

  @Allow()
  price: number;

  @Allow()
  currency?: string;

  @Allow()
  description?: string;

  @Allow()
  images?: AddItemImageInput[];
}

@InputType('UpdateItemInput')
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Allow()
  code: string;
}

@InputType('FilterItemInput')
export class FilterItemInput extends PickType(UpdateItemInput, [
  'code',
  'name',
] as const) {}
