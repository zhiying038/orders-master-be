import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CommonFilterOptionInput } from 'src/common/dto/common-filter.input';
import { CreateOrderDetailInput } from 'src/modules/order-detail/dto/order-detail.input';
import { OrderDetailEntity } from 'src/modules/order-detail/order-detail.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ItemService } from '../item/item.service';
import { FilterOrderInput } from './dto/order.input';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private itemService: ItemService,
  ) {}

  async createOrder(input: CreateOrderDetailInput[]): Promise<OrderEntity> {
    const totalPrice = await this.itemService.calculateTotalPrice(input);
    const items = await Promise.all(
      input.map(async (item) => {
        const foundItem = await this.itemService.getItemByCode(item.itemCode);

        const detail = new OrderDetailEntity();
        detail.item = foundItem;
        detail.quantity = item.quantity;

        return detail;
      }),
    );

    const order = new OrderEntity();
    order.orderDetails = items;
    order.totalPrice = totalPrice;

    return this.orderRepository.save(order);
  }

  async getOrders(filter: FilterOrderInput): Promise<OrderEntity[]> {
    const query = await this.filterOrders('order', filter);
    return query.getMany();
  }

  async getPaginatedOrders(
    options: CommonFilterOptionInput,
    filter: FilterOrderInput,
  ): Promise<Pagination<OrderEntity>> {
    const query = await this.filterOrders('order', filter);
    return paginate<OrderEntity>(query, options);
  }

  async getOrderById(id: number): Promise<OrderEntity> {
    return this.orderRepository.findOne(id, {
      relations: ['orderDetails', 'orderDetails.item'],
    });
  }

  private async filterOrders(
    tableName: string,
    filter: FilterOrderInput,
  ): Promise<SelectQueryBuilder<OrderEntity>> {
    const query = this.orderRepository
      .createQueryBuilder(tableName)
      .leftJoinAndSelect(`${tableName}.orderDetails`, 'orderDetails')
      .leftJoinAndSelect('orderDetails.item', 'item');

    if (filter) {
      const { id, createdAt } = filter;
      if (id) query.andWhere(`${tableName}.id = :id`, { id });
      if (createdAt) {
        query.andWhere(
          `${tableName}.createdAt >= :date AND ${tableName}.createdAt < DATEADD(day, 1, :date)`,
          { date: createdAt },
        );
      }
    }

    return query;
  }
}
