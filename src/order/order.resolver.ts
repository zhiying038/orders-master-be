import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { PriceDto } from 'src/common/dto/price.dto';
import { ItemService } from 'src/item/item.service';
import { CreateOrderDetailInput } from 'src/order-detail/dto/order-detail.input';
import { CreateOrderInput } from './dto/order.input';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(
    private orderService: OrderService,
    private itemService: ItemService,
  ) {}

  @Mutation(() => OrderEntity)
  async createOrder(
    @Args('input') input: CreateOrderInput,
  ): Promise<OrderEntity> {
    return this.orderService.createOrder(input);
  }

  @Query(() => [OrderEntity])
  async getOrders(): Promise<OrderEntity[]> {
    return this.orderService.getOrders();
  }

  @Query(() => OrderEntity)
  async getOrderById(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<OrderEntity> {
    return this.orderService.getOrderById(id);
  }

  @Query(() => PriceDto)
  async calculateTotalPrice(
    @Args({ name: 'input', type: () => [CreateOrderDetailInput] })
    input: CreateOrderDetailInput[],
  ): Promise<PriceDto> {
    const total = await this.itemService.calculateTotalPrice(input);
    return { currency: 'MYR', price: total };
  }
}
