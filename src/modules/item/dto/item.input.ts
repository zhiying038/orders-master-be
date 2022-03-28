import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { AddItemImageInput } from '../item-image/dto/item-image.input';

@InputType('CreateItemInput')
export class CreateItemInput {
  @Field()
  code: string;

  @Field()
  name: string;

  @Field(() => Float)
  price: number;

  @Field({ nullable: true })
  currency?: string;

  @Allow()
  @Field(() => [AddItemImageInput], { nullable: true })
  images?: AddItemImageInput[];
}

@InputType('UpdateItemInput')
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field()
  code: string;
}
