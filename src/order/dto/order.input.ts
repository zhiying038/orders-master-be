import { Field, Float, InputType } from '@nestjs/graphql';

@InputType('CreateOrderInput')
export class CreateOrderInput {
  @Field(() => Float)
  totalPrice: number;
}
