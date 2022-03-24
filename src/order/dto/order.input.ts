import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { CreateOrderDetailInput } from 'src/order-detail/dto/order-detail.input';

@InputType('CreateOrderInput')
export class CreateOrderInput {
  @Field(() => Float, { nullable: true })
  totalPrice?: number;

  @Field(() => [CreateOrderDetailInput])
  orderDetails: CreateOrderDetailInput[];
}

@InputType('FilterOrderInput')
export class FilterOrderInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  createdAt?: Date;
}
