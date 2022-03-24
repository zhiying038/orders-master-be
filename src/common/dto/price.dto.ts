import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType('Price')
export class PriceDto {
  @Field({ defaultValue: 'MYR' })
  currency: string;

  @Field(() => Float)
  price: number;
}
