import { Field, InputType, Int } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { CreateOrderDetailInput } from 'src/modules/order-detail/dto/order-detail.input';

@InputType('PlaceOrderInput')
export class PlaceOrderInput {
  @Allow()
  @Field({ nullable: true })
  createdAt?: Date;

  @Allow()
  @Field(() => [CreateOrderDetailInput])
  orders: CreateOrderDetailInput[];
}

@InputType('CreateOrderInput')
export class CreateOrderInput {
  @Allow()
  @Field()
  referenceNumber: string;

  @Allow()
  @Field(() => [CreateOrderDetailInput])
  orderItems: CreateOrderDetailInput[];
}

@InputType('FilterOrderInput')
export class FilterOrderInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  createdAt?: Date;
}
