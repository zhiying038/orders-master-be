import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDetailInput } from 'src/modules/order-detail/dto/order-detail.input';
import { Repository } from 'typeorm';
import { CreateItemInput, UpdateItemInput } from './dto/item.input';
import { ItemEntity } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async createItem(input: CreateItemInput): Promise<ItemEntity> {
    const newItem = this.itemRepository.create(input);
    return this.itemRepository.save(newItem);
  }

  async updateItem(input: UpdateItemInput): Promise<ItemEntity> {
    const { code, ...restInputs } = input;

    const item = await this.itemRepository.findOne({ code });
    if (!item) {
      throw new NotFoundException('Failed to find item');
    }

    const updated = { ...item, ...restInputs };
    const result = await this.itemRepository.save(updated);

    return result;
  }

  async deleteItems(codes: string[]): Promise<boolean> {
    try {
      const result = await this.itemRepository
        .createQueryBuilder('item')
        .delete()
        .from(ItemEntity)
        .whereInIds(codes)
        .execute();

      if (result.affected > 0) {
        return true;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getItemByCode(code: string): Promise<ItemEntity> {
    const item = await this.itemRepository.findOne({ code });
    if (!item) {
      throw new NotFoundException('Failed to find item');
    }

    return item;
  }

  async getItems(): Promise<ItemEntity[]> {
    return this.itemRepository.find();
  }

  async calculateTotalPrice(input: CreateOrderDetailInput[]): Promise<number> {
    let total = 0;

    await Promise.all(
      input.map(async (item) => {
        const found = await this.getItemByCode(item.itemCode);
        total += found.price * item.quantity;

        return total;
      }),
    );

    return total;
  }
}
