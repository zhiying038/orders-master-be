import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'ORDERS' })
@ObjectType('Order')
export class OrderEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  @Field(() => Int)
  id: number;

  @Column({ type: 'float', name: 'TotalPrice' })
  @Field(() => Float)
  totalPrice: number;

  @CreateDateColumn({ type: 'datetimeoffset', name: 'CreatedAt' })
  @Field()
  createdAt: Date;
}
