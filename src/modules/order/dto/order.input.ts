import { Field, InputType } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { CreateOrderDetailInput } from 'src/modules/order-detail/dto/order-detail.input';

@InputType('PlaceOrderInput')
export class PlaceOrderInput {
  @Allow()
  @Field({ nullable: true })
  placedAt?: Date;

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
  @Field()
  placedAt: Date;

  @Allow()
  @Field(() => [CreateOrderDetailInput])
  orderItems: CreateOrderDetailInput[];
}

@InputType('FilterOrderInput')
export class FilterOrderInput {
  @Field({ nullable: true })
  orderId?: number;

  @Field({ nullable: true })
  placedAt?: Date;
}
