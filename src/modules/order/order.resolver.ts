import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { CommonFilterOptionInput } from 'src/common/dto/common-filter.input';
import { PriceDto } from 'src/common/dto/price.dto';
import { FilterOrderInput, PlaceOrderInput } from './dto/order.input';
import { OrderEntity, OrdersDto } from './order.entity';
import { OrderService } from './order.service';

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Mutation(() => OrderEntity)
  async createOrder(
    @Args('input') input: PlaceOrderInput,
  ): Promise<OrderEntity> {
    return this.orderService.placeOrder(input);
  }

  @Query(() => OrdersDto)
  async getPaginatedOrders(
    @Args({
      name: 'options',
      type: () => CommonFilterOptionInput,
    })
    options: CommonFilterOptionInput,
    @Args({ name: 'filter', type: () => FilterOrderInput, nullable: true })
    filter: FilterOrderInput,
  ): Promise<OrdersDto> {
    return this.orderService.getPaginatedOrders(options, filter);
  }

  @Query(() => OrderEntity)
  async getOrderById(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<OrderEntity> {
    return this.orderService.getOrderById(id);
  }

  @Query(() => PriceDto)
  async calculateTotalPrice(
    @Args('input') input: PlaceOrderInput,
  ): Promise<PriceDto> {
    const total = this.orderService.calculateTotalAmount(input);
    return { currency: 'MYR', price: total };
  }
}
