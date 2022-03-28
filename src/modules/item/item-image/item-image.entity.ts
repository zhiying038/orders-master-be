import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemEntity } from '../item.entity';

@Entity({ name: 'ITEM_IMAGES' })
@ObjectType('ItemImage')
export class ItemImageEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  id: string;

  @Column({ length: 'max', name: 'Link' })
  link: string;

  @Column({ nullable: true, name: 'Alt' })
  alt?: string;

  @ManyToOne(() => ItemEntity, (item) => item.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ItemId' })
  item: ItemEntity;
}
