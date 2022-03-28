import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ItemEntity } from '../item.entity';
import { ItemService } from '../item.service';
import { GetItemQuery } from './item.query';

@QueryHandler(GetItemQuery)
export class GetItemQueryHandler implements IQueryHandler<GetItemQuery> {
  constructor(private readonly service: ItemService) {}

  execute(query: GetItemQuery): Promise<ItemEntity> {
    return this.service.findOne({ ...query.filter });
  }
}
