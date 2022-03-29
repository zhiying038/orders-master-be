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

  @Mutation(() => Boolean)
  async deleteItems(
    @Args({ name: 'codes', type: () => [String] }) codes: string[],
  ) {
    return this.itemService.deleteItems(codes);
  }

  @Query(() => [ItemEntity])
  async getItems(
    @Args({ name: 'searchText', type: () => String, nullable: true })
    searchText: string,
  ): Promise<ItemEntity[]> {
    return this.itemService.getItems(searchText);
  }
}
