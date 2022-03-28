import { Field, Float, InputType, PartialType } from '@nestjs/graphql';

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
}

@InputType('UpdateItemInput')
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field()
  code: string;
}
