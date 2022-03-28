import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ItemImageEntity } from './item-image/item-image.entity';

@Entity({ name: 'ITEMS' })
@ObjectType('Item')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ name: 'Code' })
  code: string;

  @Column({ name: 'Name' })
  name: string;

  @Column({ name: 'Price', type: 'float' })
  price: number;

  @Column({ name: 'Currency', default: 'MYR' })
  currency: string;

  @OneToMany(() => ItemImageEntity, (image) => image.item, { cascade: true })
  images?: ItemImageEntity[];
}
