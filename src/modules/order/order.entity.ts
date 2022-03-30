import { ObjectType } from '@nestjs/graphql';
import * as moment from 'moment';
import { OrderStatus } from 'src/common/constants/order-status';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { OrderDetailEntity } from 'src/modules/order-detail/order-detail.entity';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ORDERS' })
@ObjectType('Order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @CreateDateColumn({ type: 'datetimeoffset', name: 'CreatedAt' })
  createdAt: Date;

  @Column({ name: 'PlacedAt', type: 'date' })
  placedAt: Date;

  @Column({ name: 'ReferenceNumber' })
  referenceNumber: string;

  @Column({ type: 'float', name: 'TotalPrice' })
  totalPrice: number;

  @Column({ default: 'MYR', name: 'Currency' })
  currency: string;

  @Column({
    name: 'Status',
    type: 'simple-enum',
    enum: Object.values(OrderStatus),
    default: OrderStatus.CONFIRMED,
  })
  status: string;

  @OneToMany(() => OrderDetailEntity, (detail) => detail.order, {
    cascade: true,
  })
  orderDetails?: OrderDetailEntity[];

  @AfterLoad()
  convertDate() {
    this.placedAt = moment(this.placedAt).toDate();
  }
}

@ObjectType('Orders')
export class OrdersDto extends PaginatedResponseDto(() => [OrderEntity]) {}
