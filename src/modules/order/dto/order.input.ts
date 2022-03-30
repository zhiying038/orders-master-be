import { InputType, PickType } from '@nestjs/graphql';
import { Allow } from 'class-validator';
import { CreateOrderDetailInput } from 'src/modules/order-detail/dto/order-detail.input';

@InputType('PlaceOrderInput')
export class PlaceOrderInput {
  @Allow()
  placedAt?: Date;

  @Allow()
  orders: CreateOrderDetailInput[];
}

@InputType('UpdateOrderInput')
export class UpdateOrderInput extends PickType(PlaceOrderInput, [
  'placedAt',
] as const) {
  @Allow()
  id: string;

  @Allow()
  status?: string;
}

@InputType('FilterOrderInput')
export class FilterOrderInput {
  referenceNumber?: string;

  placedAt?: Date;
}
