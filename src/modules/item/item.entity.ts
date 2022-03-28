import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemImageEntity } from './item-image/item-image.entity';

@Entity({ name: 'ITEMS' })
@ObjectType('Item')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  @Field()
  id: string;

  @Column({ name: 'Code' })
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

  @OneToMany(() => ItemImageEntity, (image) => image.item, { cascade: true })
  @Field(() => [ItemImageEntity], { nullable: true })
  images?: ItemImageEntity[];
}
