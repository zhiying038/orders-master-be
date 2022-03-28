import { FilterItemInput } from '../dto/item.input';

export class GetItemQuery {
  constructor(public readonly filter: FilterItemInput) {}
}
