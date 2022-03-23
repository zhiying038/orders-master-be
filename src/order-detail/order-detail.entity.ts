import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ItemEntity } from 'src/item/item.entity';
import { OrderEntity } from 'src/order/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ORDER_DETAILS' })
@ObjectType('OrderDetail')
export class OrderDetailEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field()
  id: string;

  @Column({ name: 'Quantity', type: 'int' })
  @Field(() => Int)
  quantity: number;

  @ManyToOne(() => ItemEntity)
  @JoinColumn({ name: 'ItemCode' })
  @Field(() => ItemEntity)
  item: ItemEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'OrderId' })
  @Field(() => OrderEntity)
  order: OrderEntity;
}
