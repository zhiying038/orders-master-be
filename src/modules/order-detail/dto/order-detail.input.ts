import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('CreateOrderDetailInput')
export class CreateOrderDetailInput {
  @Field(() => Int)
  quantity: number;

  unitPrice: number;

  itemCode: string;

  orderId?: number;
}
