import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetItemQueryHandler } from './cqrs/item.handler';
import { ItemEntity } from './item.entity';
import { ItemResolver } from './item.resolver';
import { ItemService } from './item.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  providers: [ItemService, ItemResolver, GetItemQueryHandler],
  exports: [ItemService],
})
export class ItemModule {}
