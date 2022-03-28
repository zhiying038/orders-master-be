import { InputType } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { CreateOrderDetailInput } from 'src/modules/order-detail/dto/order-detail.input';

@InputType('PlaceOrderInput')
export class PlaceOrderInput {
  @Allow()
  placedAt?: Date;

  @Allow()
  orders: CreateOrderDetailInput[];
}

@InputType('FilterOrderInput')
export class FilterOrderInput {
  orderId?: number;

  placedAt?: Date;
}
