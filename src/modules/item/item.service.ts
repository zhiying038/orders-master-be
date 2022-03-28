import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { CreateItemInput, UpdateItemInput } from './dto/item.input';
import { ItemEntity } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async createItem(input: CreateItemInput): Promise<ItemEntity> {
    const { images, ...restInputs } = input;

    const newItem = this.itemRepository.create({
      ...restInputs,
      images,
    });
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

  async deleteItems(ids: string[]): Promise<boolean> {
    try {
      const result = await this.itemRepository
        .createQueryBuilder('item')
        .delete()
        .whereInIds(ids)
        .execute();

      if (result.affected > 0) {
        return true;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getItems(): Promise<ItemEntity[]> {
    return this.itemRepository.find({ relations: ['images'] });
  }

  async findOne(
    condition: FindConditions<ItemEntity>,
    nullable = true,
  ): Promise<ItemEntity> {
    const item = await this.itemRepository.findOne(condition, {
      relations: ['images'],
    });
    if (!item && !nullable) {
      throw new NotFoundException(`Failed to find item`);
    }
    return item;
  }
}
