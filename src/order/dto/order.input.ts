import { Field, Float, InputType } from '@nestjs/graphql';
import { CreateOrderDetailInput } from 'src/order-detail/dto/order-detail.input';

@InputType('CreateOrderInput')
export class CreateOrderInput {
  @Field(() => Float, { nullable: true })
  totalPrice?: number;

  @Field(() => [CreateOrderDetailInput])
  orderDetails: CreateOrderDetailInput[];
}
