import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemService } from 'src/item/item.service';
import { OrderDetailEntity } from 'src/order-detail/order-detail.entity';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/order.input';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    private itemService: ItemService,
  ) {}

  async createOrder(input: CreateOrderInput): Promise<OrderEntity> {
    const { orderDetails } = input;

    const totalPrice = await this.itemService.calculateTotalPrice(orderDetails);
    const items = await Promise.all(
      orderDetails.map(async (item) => {
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

  async getOrders(): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      relations: ['orderDetails', 'orderDetails.item'],
    });
  }

  async getOrderById(id: number): Promise<OrderEntity> {
    return this.orderRepository.findOne(id, {
      relations: ['orderDetails', 'orderDetails.item'],
    });
  }
}
