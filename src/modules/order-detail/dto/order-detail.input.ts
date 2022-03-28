import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType('CreateOrderDetailInput')
export class CreateOrderDetailInput {
  @Field(() => Int)
  quantity: number;

  @Field(() => Float)
  unitPrice: number;

  @Field()
  itemCode: string;

  @Field({ nullable: true })
  orderId?: number;
}
