import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/order.input';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  async createOrder(input: CreateOrderInput): Promise<OrderEntity> {
    const order = this.orderRepository.create(input);
    return this.orderRepository.save(order);
  }
}
