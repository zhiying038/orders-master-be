import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'ITEMS' })
@ObjectType('Item')
export class ItemEntity {
  @PrimaryColumn({ name: 'Code' })
  @Field()
  code: string;

  @Column({ name: 'Name' })
  @Field()
  name: string;

  @Column({ name: 'Price', type: 'float' })
  @Field(() => Float)
  price: number;

  @Column({ name: 'Currency', default: 'MYR' })
  @Field()
  currency: string;
}
