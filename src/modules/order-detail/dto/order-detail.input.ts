import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('CreateOrderDetailInput')
export class CreateOrderDetailInput {
  @Field(() => Int)
  quantity: number;

  @Field()
  itemCode: string;

  @Field({ nullable: true })
  orderId?: number;
}
