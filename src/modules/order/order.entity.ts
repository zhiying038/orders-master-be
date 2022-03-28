import { Field, Float, ObjectType } from '@nestjs/graphql';
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
  @Field()
  id: string;

  @Column({ name: 'ReferenceNumber' })
  @Field()
  referenceNumber: string;

  @Column({ type: 'float', name: 'TotalPrice' })
  @Field(() => Float)
  totalPrice: number;

  @Column({ default: 'MYR', name: 'Currency' })
  @Field()
  currency: string;

  @CreateDateColumn({ type: 'datetimeoffset', name: 'CreatedAt' })
  @Field()
  createdAt: Date;

  @OneToMany(() => OrderDetailEntity, (detail) => detail.order, {
    cascade: true,
  })
  @Field(() => [OrderDetailEntity], { nullable: true })
  orderDetails?: OrderDetailEntity[];
}

@ObjectType('Orders')
export class OrdersDto extends PaginatedResponseDto(() => [OrderEntity]) {}
