import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateItemInput, UpdateItemInput } from './dto/item.input';
import { ItemEntity } from './item.entity';
import { ItemService } from './item.service';

@Resolver(() => ItemEntity)
export class ItemResolver {
  constructor(private itemService: ItemService) {}

  @Mutation(() => ItemEntity)
  async createItem(@Args('input') input: CreateItemInput): Promise<ItemEntity> {
    return this.itemService.createItem(input);
  }

  @Mutation(() => ItemEntity)
  async updateItem(@Args('input') input: UpdateItemInput): Promise<ItemEntity> {
    return this.itemService.updateItem(input);
  }

  @Query(() => ItemEntity)
  async getItemByCode(@Args('code') code: string): Promise<ItemEntity> {
    return this.itemService.getItemByCode(code);
  }

  @Query(() => [ItemEntity])
  async getItems(): Promise<ItemEntity[]> {
    return this.itemService.getItems();
  }
}
