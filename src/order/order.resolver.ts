import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateOrderInput } from './dto/order.input';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Mutation(() => OrderEntity)
  async createOrder(
    @Args('input') input: CreateOrderInput,
  ): Promise<OrderEntity> {
    return this.orderService.createOrder(input);
  }
}
