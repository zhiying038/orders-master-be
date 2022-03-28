import { ObjectType } from '@nestjs/graphql';
import { PaginatedResponseDto } from 'src/common/dto/paginated.dto';
import { OrderDetailEntity } from 'src/modules/order-detail/order-detail.entity';
import {
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

  @OneToMany(() => OrderDetailEntity, (detail) => detail.order, {
    cascade: true,
  })
  orderDetails?: OrderDetailEntity[];
}

@ObjectType('Orders')
export class OrdersDto extends PaginatedResponseDto(() => [OrderEntity]) {}
