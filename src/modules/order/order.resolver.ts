import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { CommonFilterOptionInput } from 'src/common/dto/common-filter.input';
import { PriceDto } from 'src/common/dto/price.dto';
import { CreateOrderDetailInput } from 'src/modules/order-detail/dto/order-detail.input';
import { ItemService } from '../item/item.service';
import { FilterOrderInput } from './dto/order.input';
import { OrderEntity, OrdersDto } from './order.entity';
import { OrderService } from './order.service';

@Resolver(() => OrderEntity)
export class OrderResolver {
  constructor(
    private orderService: OrderService,
    private itemService: ItemService,
  ) {}

  @Mutation(() => OrderEntity)
  async createOrder(
    @Args({ name: 'input', type: () => [CreateOrderDetailInput] })
    input: CreateOrderDetailInput[],
  ): Promise<OrderEntity> {
    return this.orderService.createOrder(input);
  }

  @Query(() => [OrderEntity])
  async getOrders(
    @Args({ name: 'filter', type: () => FilterOrderInput, nullable: true })
    filter: FilterOrderInput,
  ): Promise<OrderEntity[]> {
    return this.orderService.getOrders(filter);
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
    const { items, meta } = await this.orderService.getPaginatedOrders(
      options,
      filter,
    );
    return new OrdersDto(
      items,
      meta.totalItems,
      meta.currentPage,
      options.limit,
    );
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
