import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { paginate } from 'nestjs-typeorm-paginate';
import { CommonFilterOptionInput } from 'src/common/dto/common-filter.input';
import { OrderDetailEntity } from 'src/modules/order-detail/order-detail.entity';
import { Price } from 'src/utils/price';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { GetItemQuery } from '../item/cqrs/item.query';
import { GetNewRunningNumberQuery } from '../running-number/cqrs/running-number.query';
import { FilterOrderInput, PlaceOrderInput } from './dto/order.input';
import { OrderEntity, OrdersDto } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private queryBus: QueryBus,
  ) {}

  async placeOrder(input: PlaceOrderInput): Promise<OrderEntity> {
    const { orders, placedAt } = input;

    const totalAmount = this.calculateTotalAmount(input);
    const items = await Promise.all(
      orders.map(async (item) => {
        const foundItem = await this.queryBus.execute(
          new GetItemQuery({ code: item.itemCode }),
        );

        const detail = new OrderDetailEntity();
        detail.item = foundItem;
        detail.quantity = item.quantity;
        detail.unitPrice = item.unitPrice;

        return detail;
      }),
    );

    return await this.createOrder(items, placedAt, totalAmount);
  }

  async getPaginatedOrders(
    options: CommonFilterOptionInput,
    filter: FilterOrderInput,
  ): Promise<OrdersDto> {
    const query = await this.filterOrders('order', filter);
    const { items, meta } = await paginate<OrderEntity>(query, options);
    return new OrdersDto(
      items,
      meta.totalItems,
      meta.currentPage,
      options.limit,
    );
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
    const placedDate = orderDate ?? moment().format('YYYY-MM-DD');

    const newOrder = this.orderRepository.create({
      referenceNumber: refNum,
      orderDetails: items,
      totalPrice,
      placedAt: placedDate,
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
      const { orderId, placedAt } = filter;
      if (orderId)
        query.andWhere(`${tableName}.referenceNumber ILIKE :referenceNumber`, {
          referenceNumber: `%${orderId}%`,
        });

      if (placedAt) {
        query.andWhere(
          `${tableName}.placedAt >= :placedAt AND ${tableName}.placedAt < DATEADD(day, 1, :placedAt)`,
          { date: placedAt },
        );
      }
    }

    return query;
  }
}
