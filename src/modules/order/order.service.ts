import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { CommonFilterOptionInput } from 'src/common/dto/common-filter.input';
import { OrderDetailEntity } from 'src/modules/order-detail/order-detail.entity';
import { Price } from 'src/utils/price';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ItemService } from '../item/item.service';
import { GetNewRunningNumberQuery } from '../running-number/cqrs/running-number.query';
import { FilterOrderInput, PlaceOrderInput } from './dto/order.input';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private itemService: ItemService,
    private queryBus: QueryBus,
  ) {}

  async placeOrder(input: PlaceOrderInput): Promise<OrderEntity> {
    const { orders, createdAt } = input;

    const totalAmount = this.calculateTotalAmount(input);
    const items = await Promise.all(
      orders.map(async (item) => {
        const foundItem = await this.itemService.getItemByCode(item.itemCode);

        const detail = new OrderDetailEntity();
        detail.item = foundItem;
        detail.quantity = item.quantity;
        detail.unitPrice = item.unitPrice;

        return detail;
      }),
    );

    return await this.createOrder(items, createdAt, totalAmount);
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

  private async createOrder(
    items: OrderDetailEntity[],
    orderDate: Date,
    totalPrice: number,
  ): Promise<OrderEntity> {
    const refNum = await this.prepareReferenceNumber();
    const placedDate = orderDate ?? moment().toDate();

    const newOrder = this.orderRepository.create({
      referenceNumber: refNum,
      orderDetails: items,
      totalPrice,
      createdAt: placedDate,
    });

    return await this.orderRepository.save(newOrder);
  }

  calculateTotalAmount(input: PlaceOrderInput): number {
    const total =
      input.orders.reduce((a, b) => a + b.unitPrice * b.quantity, 0) || 0;
    return Price.formatPrice(total);
  }

  private async prepareReferenceNumber(): Promise<string> {
    const purpose = 'ORDER';
    const refNumber = await this.queryBus.execute(
      new GetNewRunningNumberQuery(purpose),
    );
    return `#${refNumber.toString().padStart(8, 0)}`;
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
